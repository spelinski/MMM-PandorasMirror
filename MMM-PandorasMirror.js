Module.register('MMM-PandorasMirror',{
    start: function() {
        this.currentSong = "N/A";
        var self = this;
        self.getCurrentSong();
        setInterval(function() {
            self.cmdPandora();
        },30000);
        setInterval(function() {
            self.getCurrentSong();
        },10000);
    },

    cmdPandora: function() {
        this.sendSocketNotification("CMD_PANDORA",{msg: 'p'});
    },

    getCurrentSong: function() {
        this.sendSocketNotification("GET_CUR_SONG",{});
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification == "SONG") {
            this.currentSong = payload.currentSong;
            this.updateDom(1000);
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var song = document.createElement("div");
        song.className = "thin xlarge bright";
        song.innerHTML = this.currentSong;
        //wrapper.className = "thin xlarge bright";
        wrapper.appendChild(song);
        return wrapper;
    }
});
