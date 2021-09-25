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

        let slot = rect.appendChild(document.createElement("slot"));

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/episode.css");

        this.shadowRoot.append(css, wrapper);
    }
}

customElements.define("hx-episode", Episode);