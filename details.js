const root = (new URLSearchParams(window.location.search)).get("series");

if (parent.index == undefined) {
    window.location.replace(`./?select=${root}`);
}

const series = parent.index[root];

if (series.bg == "") {
    series.bg = series.cover;
    fetch(`/content/${root}/bg.jpg`, {method: "HEAD"}).then(response => {
        series.bg = response.ok ? `/content/${root}/bg.jpg` : series.bg
        document.getElementById("header").style.backgroundImage = `url(${series.bg})`;
    })
}

document.getElementById("tags").innerText = series.tags.join(", ");
document.getElementById("title").innerText = series.title;
document.getElementById("header").style.backgroundImage = `url(${series.bg})`;

const episodes_div = document.getElementById("episodes");

let m3uString = "";

try {
    series.episodes.forEach(episode => {
        m3uString += (window.location.protocol + "//" + window.location.host + episode.source.replace(/^\.+/g, "") + "\n");
        episodes_div.innerHTML += `<hx-episode src="${episode.source}" hx-title="${episode.title}"></hx-episode>\n`;
    });
} catch {
    episodes_div.innerHTML += `<p>No episodes found</p>\n`;
    document.getElementById("vlc").style.display = "none";
} finally {
    document.getElementById("spinner-div").remove();
    document.getElementById("vlc").setAttribute("href", m3uString);
    document.getElementById("vlc").setAttribute("name", series.title);
}

document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(parent.location.origin + parent.location.pathname + `?select=${root}`);
}