class Player extends HTMLElement {
    static get observedAttributes() { return ["src"] }

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");

        const video = wrapper.appendChild(document.createElement("video"));
        video.setAttribute("src", this.getAttribute("src") || "");

        const controls = wrapper.appendChild(document.createElement("div"));
        controls.setAttribute("class", "controls");

        const play = controls.appendChild(document.createElement("button"));
        play.setAttribute("id", "play");
        play.textContent = "Play";

        const progress_text = controls.appendChild(document.createElement("span"));
        progress_text.setAttribute("id", "progress-text");
        progress_text.textContent = "0:00";

        const volume = controls.appendChild(document.createElement("input"));
        volume.setAttribute("id", "volume");
        volume.setAttribute("type", "range");
        volume.setAttribute("min", "0");
        volume.setAttribute("max", "1");
        volume.setAttribute("step", "0.01");
        volume.setAttribute("value", "0.5");

        const mute = controls.appendChild(document.createElement("button"));
        mute.setAttribute("id", "mute");
        mute.textContent = "Mute";

        const fullscreen = controls.appendChild(document.createElement("button"));
        fullscreen.setAttribute("id", "fullscreen");
        fullscreen.textContent = "Fullscreen";

        const progress = controls.appendChild(document.createElement("div"));
        progress.setAttribute("class", "progress");

        const progressBar = progress.appendChild(document.createElement("div"));
        progressBar.setAttribute("class", "progress-bar");

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/player.css");

        this.shadowRoot.append(wrapper, css);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        this.shadowRoot.querySelector("video").setAttribute("src", newValue);
    }
}

customElements.define("hx-player", Player);