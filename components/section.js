class Section extends HTMLElement {
    static get observedAttributes() { return ['title']; }

    constructor() {
        super();

        // <hx-section title="Genre"><item 1 /> <item 2 />...</hx-section>
        let title_text = this.getAttribute("title");

        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("section");

        const title = wrapper.appendChild(document.createElement("h2"));
        title.innerText = title_text;

        const flex = wrapper.appendChild(document.createElement("slot"));
        flex.setAttribute("class", "flex");

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/section.css");

        this.shadowRoot.append(css, wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let title_text = this.getAttribute("title");

        this.shadowRoot.querySelector("h2").innerText = title_text;
    }
}

customElements.define("hx-section", Section);