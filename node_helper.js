var NodeHelper = require("node_helper");
var fs = require('fs');
const { spawn } = require("child_process");
var piano;

module.exports = NodeHelper.create({
    start: function(){
        console.log("Starting node helper: " + this.name);
        piano = spawn("pianobar", {detached: true});
    },
    stop: function(){
        process.kill(-piano.pid);
    },
    socketNotificationReceived: function(notification, payload) {
        var self = this;
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
                var songToSend = "Title: " + songArray[1] + "<br>Album: " + songArray[2] + "<br>Artist: " + songArray[0];
                self.sendSocketNotification("SONG", {currentSong: songToSend});
            }
        } else if(notification === "GET_STATION_LIST") {
            var stationList = fs.readFileSync("/home/pi/.config/pianobar/stationList").toString();
            self.sendSocketNotification("STATIONS", {allStations: stationList});
        }
    },
});
