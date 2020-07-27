#!/bin/bash
stationList="${HOME}/.config/pianobar/stationList"
currentSong="${HOME}/.config/pianobar/currentSong"
currentStation="${HOME}/.config/pianobar/currentStation"
maxStation="${HOME}/.config/pianobar/maxStation"

while read L; do
	k="`echo "$L" | cut -d '=' -f 1`"
	v="`echo "$L" | cut -d '=' -f 2`"
	export "$k=$v"

done < <(grep -e '^\(title\|artist\|album\|stationName\|songStationName\|pRet\|pRetStr\|wRet\|wRetStr\|songDuration\|songPlayed\|rating\|coverArt\|stationCount\|station[0-9]*\)=' /dev/stdin) # don't overwrite $1...




post () {
	url=${baseurl}${1}
	curl -s -XPOST $url >/dev/null 2>&1
}

clean () {
	query=$1
	clean=$(echo $query | sed 's/ /%20/g')
	post $clean
}

stationList () {
	if [ -f "$stationList" ]; then
		rm "$stationList"
	fi

	end=`expr $stationCount - 1`

	for i in $(eval echo "{0..$end}"); do
		sn=station${i}
		eval sn=\$$sn
		echo "${i}:${sn}" >> "$stationList"
	done

        echo "$end" > "$maxStation"
}

currentStation () {
        if [ -f "$currentStation" ]; then
                rm "$currentStation"
        fi
        echo "$stationName" > "$currentStation"
}


case "$1" in
	songstart)
		query="/start/?title=${title}&artist=${artist}&coverArt=${coverArt}&album=${album}&rating=${rating}"
		clean "$query"

		echo -n "${artist},,,${title},,,${album},,,${coverArt},,,${rating}" > "$currentSong"

		stationList

                currentStation
		;;

#	songfinish)
#		;;

	songlove)
		query="/lovehate/?rating=${rating}"
		clean $query
		;;

#	songshelf)
#		;;

	songban)
		query="/lovehate/?rating=${rating}"
		clean $query
		;;

#	songbookmark)
#		;;

#	artistbookmark)
#		;;

esac
