Module.register('MMM-PandorasMirror',{
    voice: {
        mode: 'PANDORA',
        sentences: [
            'PLAY PANDORA',
            'PAUSE PANDORA',
            'NEXT SONG',
            'SHOW STATIONS',
            'HIDE STATIONS',
            'CHANGE STATIONS'
        ]
    },

    start: function() {
        this.currentSong = "N/A";
        this.showStations = false;
        this.stations = "N/A";
        this.currentStationName = "N/A";
        this.currentStation = 0;
        this.maxStation = 0;
        var self = this;
        self.getMaxStation();
        self.getCurrentSong();
        setInterval(function() {
            self.getCurrentSong();
        },10000);
        self.getCurrentStationName();
        setInterval(function() {
            self.getCurrentStationName();
        },10000);
    },

    cmdPandora: function(message) {
        this.sendSocketNotification("CMD_PANDORA",{msg: message});
    },

    getCurrentSong: function() {
        this.sendSocketNotification("GET_CUR_SONG",{});
    },

    getCurrentStationName: function() {
        this.sendSocketNotification("GET_CUR_STATION_NAME",{});
    },

    getMaxStation: function() {
        this.sendSocketNotification("GET_MAX_STATION",{});
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
        } else if(/(NEXT)/g.test(data)) {
            this.cmdPandora('n');
        } else if(/(STATIONS)/g.test(data)) {
            if(/(SHOW)/g.test(data)) {
                this.showStations = true;
                this.sendSocketNotification("GET_STATION_LIST",{});
            } else if(/(HIDE)/g.test(data)) {
                this.showStations = false;
                this.updateDom(1000);
            } else if (/(CHANGE)/g.test(data)) {
                this.currentStation++;
                if(this.currentStation > this.maxStation) {
                    this.currentStation = 0;
                }
                this.cmdPandora('s');
                this.cmdPandora(this.currentStation.toString());
                this.cmdPandora('\r\n');
            }
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification == "SONG") {
            this.currentSong = payload.currentSong;
            this.updateDom(1000);
        } else if (notification == "STATIONS") {
            this.stations = payload.allStations;
            this.updateDom(1000);
        } else if (notification == "STATION_NAME") {
            this.currentStationName = payload.currentStationName;
            this.updateDom(1000);
        } else if (notification == "MAX_STATION") {
            this.maxStation = parseInt(payload.maxStation, 10);
            this.updateDom(1000);
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var song = document.createElement("div");
        var stationName = document.createElement("div");
        var station = document.createElement("div");
        song.className = "thin small bright";
        song.innerHTML = this.currentSong;
        stationName.className = "thin small bright";
        stationName.innerHTML = this.currentStationName;
        song.appendChild(stationName);
        if(this.showStations) {
            station.className = "thin small bright";
            station.innerHTML = this.stations;
            song.appendChild(station);
        }
        wrapper.appendChild(song);
        return wrapper;
    }
});
