Module.register('MMM-PandorasMirror',{
    voice: {
        mode: 'PANDORA',
        sentences: [
            'PLAY PANDORA',
            'PAUSE PANDORA'
        ]
    },

    start: function() {
        this.currentSong = "N/A";
        var self = this;
        self.getCurrentSong();
        setInterval(function() {
            self.getCurrentSong();
        },10000);
    },

    cmdPandora: function(message) {
        this.sendSocketNotification("CMD_PANDORA",{msg: message});
    },

    getCurrentSong: function() {
        this.sendSocketNotification("GET_CUR_SONG",{});
    },

    notificationReceived(notification, payload, sender) {
        if (notification === 'ALL_MODULES_STARTED') {
            this.sendNotification('REGISTER_VOICE_MODULE', this.voice);
        } else if (notification === 'VOICE_PANDORA' && sender.name === 'MMM-voice'){
            this.checkCommands(payload);
        }
    },

    checkCommands(data) {
        if(/(PANDORA)/g.test(data)) {
            if((/(PLAY)/g.test(data)) || (/(PAUSE)/g.test(data))) {
                this.cmdPandora('p');
            }
        }
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
        wrapper.appendChild(song);
        return wrapper;
    }
});
