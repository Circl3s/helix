class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");

        const slot = wrapper.appendChild(document.createElement("slot"));

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/modal.css");

        wrapper.onclick = () => {
            this.hide();
        };

        this.shadowRoot.append(wrapper, css);
    }

    show() {
        this.shadowRoot.querySelector(".wrapper").classList.add("show");
        this.dispatchEvent(new CustomEvent("modal-show", {
            bubbles: true,
            composed: true
        }));
    }

    hide() {
        this.shadowRoot.querySelector(".wrapper").classList.remove("show");
        this.dispatchEvent(new CustomEvent("modal-hide", {
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define("hx-modal", Modal);