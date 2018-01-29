var NodeHelper = require("node_helper");
var fs = require('fs');

module.exports = NodeHelper.create({
    start: function(){
        console.log("Starting node helper: " + this.name);
    },
    socketNotificationReceived: function(notification, payload) {
        var self = this;
        console.log("Notification: " + notification + " Payload: " + payload);
        if(notification === "CMD_PANDORA") {
            fs.appendFile('/home/pi/.config/pianobar/ctl', payload.msg, function(err){
                if(err){
                    console.log("Error seen: " + err);
                }
            });
        }
        else if(notification === "GET_CUR_SONG") {
            var song = fs.readFileSync("/home/pi/.config/pianobar/currentSong").toString();
            if (song) {
                var songArray = song.split(',,,');
                var songToSend = "Title: " + songArray[1] + " album: " + songArray[2] + " artist: " + songArray[0];
                self.sendSocketNotification("SONG", {currentSong: songToSend});
            }
        }
    },
});