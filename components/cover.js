class Cover extends HTMLElement {
    static get observedAttributes() { return ['href', 'img']; }

    constructor() {
        super();

        // <hx-cover href="link/to/subpage" img="link/to/cover.png">Title</hx-cover>
        let link = this.getAttribute("href"),
            img = this.getAttribute("img");

        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("a");

        const flex = wrapper.appendChild(document.createElement("div"));
        flex.setAttribute("class", "flex");

        const image = flex.appendChild(document.createElement("img"));

        const title = flex.appendChild(document.createElement("slot"));

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/cover.css");

        wrapper.setAttribute("href", link);
        image.setAttribute("src", img);

        wrapper.onclick = (e) => {
            e.preventDefault();

            document.querySelector("#details").setAttribute("src", this.getAttribute("href"));
        }

        this.shadowRoot.append(css, wrapper);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let link = this.getAttribute("href"),
            img = this.getAttribute("img");

        this.shadowRoot.querySelector("a").setAttribute("href", link);
        this.shadowRoot.querySelector("img").setAttribute("src", img);
    }
}

customElements.define("hx-cover", Cover);
