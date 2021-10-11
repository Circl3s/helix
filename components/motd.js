class MOTD extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const block = document.createElement("div");
        block.innerText = "Watch now"

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/motd.css");

        let requestURL = "./.git/ORIG_HEAD";
        let request = new XMLHttpRequest();
        request.open("GET", requestURL);

        request.send();

        request.onload = () => {
            let checkURL = "https://api.github.com/repos/Circl3s/helix/commits";
            let check = new XMLHttpRequest();
            check.open("GET", checkURL);
            check.responseType = "json"

            check.send();

            check.onload = () => {
                console.log(request.response);
                console.log(check.response[0].sha);
                if (request.response.trim() != check.response[0].sha.trim()) {
                    block.classList.add("notify");
                    block.innerText = "New version available!"
                }
            };
        };

        this.shadowRoot.append(css, block);
    }
}

customElements.define("hx-motd", MOTD);