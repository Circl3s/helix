class Episode extends HTMLElement {
    static get observedAttributes() { return ['href']; }

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        // <hx-episode href="link/to/source">Episode Title</hx-episode>
        let link = this.getAttribute("href");

        let wrapper = document.createElement("a");
        wrapper.setAttribute("href", link);
        wrapper.setAttribute("target", "_blank");

        let rect = wrapper.appendChild(document.createElement("div"));
        rect.setAttribute("class", "rect");
        rect.style.backgroundImage = `url(${this.getAttribute("thumb")})`;

        let gradient = rect.appendChild(document.createElement("div"));
        gradient.classList.add("gradient");

        let title = gradient.appendChild(document.createElement("p"));
        title.innerText = this.getAttribute("title");

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/episode.css");

        this.shadowRoot.append(css, wrapper);
    }
}

customElements.define("hx-episode", Episode);