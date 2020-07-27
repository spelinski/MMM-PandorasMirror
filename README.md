# WIP (Work In Progress)

## Pandora Module for Magic Mirror

Module for controlling the Pandora music service

![alt text](https://github.com/spelinski/MMM-PandorasMirror/blob/master/images/example.png)


### Requirements:
* [Magic Mirror](https://github.com/MichMich/MagicMirror)
* [MMM-Voice](https://github.com/fewieden/MMM-voice)
* Pianobar
* [Pandora account](https://www.pandora.com/)

### Pianobar specifics
This project currently assumes pianobar is setup for FIFO control and to run the eventcmd.sh script provided under the pianobar folder
*example for creating a fifo "mkfifo /home/pi/.config/pianobar/ctl"

An example config has also been provied under the pianobar folder and assumes pianobar's config is under ~/.config/pianobar

This project assumes pianobar can be started without any input (For testing if you can start pianobar from the command line without user input and music starts)

### Voice control
* mode for voice module is Pandora
* Supported Commands:
    * Play Pandora
    * Pause Pandora
    * Next Song
    * Show Stations
    * Hide Stations
    * Change Stations

### Change Stations Limitations

Currently this changes sequentially by one from station 0 through the max and loops back around if changing from the max station.  
This is workable with a small station count but is unwieldy at larger number of stations.

### This project

clone this repo into MagicMirror/modules.  
Example config
- module: 'MMM-PandorasMirror",
- position: "lower_third"

### Last Tested
MagicMirror : v2.12.0  
node.js : 8.11.1  
Platform : Pi 3 Model B
