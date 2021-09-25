function populate(index) {
    let tags = new Set();

    index = Object.entries(index);

    index.forEach(series => {
        series[1].tags.forEach(tag => {
            tags.add(tag);
        });
    });

    tags = [...tags].sort();

    tags.forEach(tag => {
        let element = document.createElement("hx-section");
        element.setAttribute("id", tag);
        element.setAttribute("title", tag);
        document.querySelector("main").appendChild(element);
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

let requestURL = "/index.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = () => {
    window.index = request.response;
    populate(window.index);
}