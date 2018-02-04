#WIP (Work In Progress)
##Pandora Module for Magic Mirror
<Insert Screen Shot here>


###Requirements:
* [Magic Mirror](https://github.com/MichMich/MagicMirror)
* [MMM-Voice](https://github.com/fewieden/MMM-voice)
* Pianobar

###Pianobar specifics
This project currently assumes pianobar is setup for FIFO control and to run the eventcmd.sh script provided under the pianobar folder
*example for creating a fifo "mkfifo /home/pi/.config/pianobar/ctl"

An example config has also been provied under the pianobar folder and assumes pianobar's config is under ~/.config/pianobar

This project also currently assumes pianobar is already running

###This project
clone this repo into MagicMirror/modules.

Example config

module: 'MMM-PandorasMirror",

position: "lower_third"
