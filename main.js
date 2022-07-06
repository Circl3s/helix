async function populate(index, filter) {
    document.querySelector("#sections").innerHTML = "";
    document.querySelector("nav").innerHTML = "";
    let tags = new Set();

    let roots = Object.keys(index).sort();
    let new_index = new Object();
    roots.forEach(root => {
        if (index[root].title.toLowerCase().includes(filter.toLowerCase())) {
            new_index[root] = index[root];
        }
    });

    index = Object.entries(new_index);

    index.forEach(series => {
        series[1].tags.forEach(tag => {
            tags.add(tag);
        });
    });

    tags = [...tags].sort();

    tags.forEach(tag => {
        let section = document.createElement("hx-section");
        section.setAttribute("id", tag);
        section.setAttribute("hx-title", tag);
        document.querySelector("#sections").appendChild(section);

        let link = document.createElement("a");
        link.setAttribute("href", `#${tag}`);
        link.innerText = tag;
        document.querySelector("nav").appendChild(link);
    });

    index.forEach(series => {
        series[1].tags.forEach(tag => {
            let element = document.createElement("hx-cover",);
            element.setAttribute("img", series[1].cover);
            element.setAttribute("href", `details.html?series=${series[0]}`);
            let title = element.appendChild(document.createElement("h3"));
            title.innerText = series[1].title;
            document.querySelector(`#${tag}`).appendChild(element);
        })
    })
}

let selected = new URLSearchParams(window.location.search).get("select");
document.querySelector("#details").setAttribute("src", selected == undefined ? "./placeholder.html" : `details.html?series=${selected}`);

let requestURL = "./index.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = async () => {
    window.index = request.response;
    await populate(window.index, "");
    setTimeout(() => {
        document.querySelector("#spinner-div").style.opacity = "0";
        if (selected) {
            let m = document.querySelector("#modal");
            m.show();
        }
    }, 500);
    setTimeout(() => {
        document.querySelector("#spinner-div").remove()
    }, 1000);
}

window.addEventListener("search", (e) => {
    populate(window.index, e.detail);
});