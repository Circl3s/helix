class VLC extends HTMLElement {
    static get observedAttributes() { return ['href']; }

    constructor() {
        super();

        // <hx-vlc href="link-to-video"></hx-vlc>
        let link = this.getAttribute("href");

        this.attachShadow({mode: "open"});

        const button = document.createElement("button");
        const text = button.appendChild(document.createElement("p"));
        text.innerText = "Open in VLC"

        const hiddenA = button.appendChild(document.createElement("a"));
        hiddenA.style.visibility = "none";
        hiddenA.download = "play.vlc";

        button.onclick = () => {
            hiddenA.click();
        }

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/vlc.css");

        this.shadowRoot.append(css, button);
        this.updateM3U(link);
    }

    updateM3U(link) {
        let dataURL = "data:application/x-mpegURL," + encodeURIComponent(`#EXTM3U\n${link}`);
        let path = new URL(link).pathname.split("/");
        let name = path.length > 1 ? path.slice(path.length - 2).join("-") : path[path.length - 1];
        name = name.substring(0, name.lastIndexOf('.')) || name
        this.shadowRoot.querySelector("a").setAttribute("href", dataURL);
        this.shadowRoot.querySelector("a").setAttribute("download", `${name}.vlc`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let link = this.getAttribute("href");

        this.updateM3U(link);
    }
}

customElements.define("hx-vlc", VLC);