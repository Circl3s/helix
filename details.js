const root = (new URLSearchParams(window.location.search)).get("series");

const series = parent.index[root];

document.getElementById("tags").innerText = series.tags.join(", ");
document.getElementById("title").innerText = series.title;
document.getElementById("header").style.backgroundImage = `url(${series.cover})`;

const episodes_div = document.getElementById("episodes");

try {
    series.episodes.forEach(episode => {
        episodes_div.innerHTML += `<hx-episode href="${episode.source}"><p>${episode.title}</p><span>⯈</span></hx-episode>\n`;
    });
} catch {
    episodes_div.innerHTML += `<p>No episodes found</p>\n`;
} finally {
    document.getElementById("spinner-div").remove();
}

document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(parent.location.origin + parent.location.pathname + `?select=${root}`);
}