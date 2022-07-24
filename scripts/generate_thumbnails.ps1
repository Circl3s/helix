if ((Get-Location).Path.EndsWith("helix\scripts")) {
    $Path = "../content"
} elseif ((Get-Location).Path.EndsWith("helix")) {
    $Path = "./content"
}

if ($Path) {
    $Episodes = Get-ChildItem -Path $Path -Recurse -Filter "*.mp4"

    ForEach($Episode in $Episodes) {
        ffmpeg.exe -n -ss 00:01:00 -i $Episode.FullName -plays 0 -vf "select=not(mod(n\, 2880)), scale=-1:240, setpts=(1/120)*PTS" $($Episode.FullName + ".apng")
    }
} else {
    Write-Error "You must be in the main or script directory of Helix to run this script."
}