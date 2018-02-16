const mock = require('mock-fs');
var chai = require('chai');
var expect = chai.expect;
var node_helper = require('../node_helper.js');
var fs = require('fs');

describe('SocketNotificationReceived', function() {
    beforeEach(function() {
        mock({
            '/home/pi/.config/pianobar': {
                'ctl': ''
            }
        });
    });
    afterEach(function() {
        mock.restore;
    });
    it('should write payload to file if notification is CMD_PANDORA', function() {
        var my_helper = new node_helper();
        var payload = {msg:"play"};
        my_helper.socketNotificationReceived("CMD_PANDORA", payload);
        var control_info = fs.readFileSync('/home/pi/.config/pianobar/ctl');
        expect(control_info.toString()).to.equal("play");
    });
});
