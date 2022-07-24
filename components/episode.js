class Episode extends HTMLElement {
    static get observedAttributes() { return ['href']; }

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        // <hx-episode src="link/to/source" title="Episode Title"></hx-episode>
        let link = `viewer.html?src=${this.getAttribute("src")}`;
        let thumb = this.getAttribute("src") + ".jpg";
        let preview = this.getAttribute("src") + ".webp";

        let wrapper = document.createElement("a");
        wrapper.setAttribute("href", link);
        wrapper.setAttribute("target", "_blank");

        let rect = wrapper.appendChild(document.createElement("div"));
        rect.setAttribute("class", "rect");
        rect.style.backgroundImage = `url(${thumb})`;

        let gradient = rect.appendChild(document.createElement("div"));
        gradient.classList.add("gradient");

        let title = gradient.appendChild(document.createElement("p"));
        title.innerText = this.getAttribute("title");

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/episode.css");

        gradient.onmouseenter = () => rect.style.backgroundImage = `url(${preview})`;
        gradient.onmouseleave = () => rect.style.backgroundImage = `url(${thumb})`;

        this.shadowRoot.append(css, wrapper);
    }
}

customElements.define("hx-episode", Episode);