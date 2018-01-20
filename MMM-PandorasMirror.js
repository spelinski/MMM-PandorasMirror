Module.register('MMM-PandorasMirror',{
    start: function() {
        //const { spawn } = require('child_process');
        //const pandora = spawn('pianobar');
        //pandora.stdin.write("0\n");
        var self = this;
        setInterval(function() {
            self.updateDom(4000);
        },30000);
        //self.updateDom();
    },

    getDom: function() {
        var complimentText = "ahhh";
        var compliment = document.createTextNode(complimentText);
        var wrapper = document.createElement("div");
        wrapper.className = "thin xlarge bright";
        wrapper.appendChild(compliment);
        return wrapper;
    }
});
