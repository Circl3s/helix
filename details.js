const root = (new URLSearchParams(window.location.search)).get("series");

const series = parent.index[root];

document.getElementById("tags").innerText = series.tags.join(", ");
document.getElementById("title").innerText = series.title;
document.getElementById("header").style.backgroundImage = `url(${series.cover})`;

const episodes_div = document.getElementById("episodes");

series.episodes.forEach(episode => {
    episodes_div.innerHTML += `<hx-episode href="${episode.source}"><p>${episode.title}</p><span>⯈</span></hx-episode>\n`;
});