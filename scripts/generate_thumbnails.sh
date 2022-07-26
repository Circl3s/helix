#!/bin/bash

if [[ "$PWD" = *"helix/scripts" ]]; then
    path="../content/"
elif [[ "$PWD" = *"helix" ]]; then
    path="./content/"
fi

if [ -z ${path+x} ]; then
    echo "$(basename $0): You must be in the main or script directory of Helix to run this script."
    exit 1
else
    for f in $(find $path -name "*.mp4" -type f)
    do
        ffmpeg -n -ss 00:01:00 -i $f -frames:v 1 -vf "scale=-1:240" $f.jpg
        ffmpeg -n -ss 00:01:00 -i $f -loop 0 -vf "select=not(mod(n\, 2880)), scale=-1:240, setpts=(1/120)*PTS" $f.webp
    done
fi