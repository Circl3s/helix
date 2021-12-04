class Spinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        const text = wrapper.appendChild(document.createElement('p'));
        const string = "Helix";

        for (let i = 0; i < string.length; i++) {
            const char = document.createElement('span');
            char.textContent = string[i];
            text.appendChild(char);
        }

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/spinner.css");

        this.shadowRoot.append(css, wrapper);
    }
}

customElements.define("hx-spinner", Spinner);