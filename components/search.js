class Search extends HTMLInputElement {
    constructor() {
        super();

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/search.css");

        this.append(css);
        this.placeholder = "Search";

        this.onkeyup = () => {
            let event = new CustomEvent("search", {bubbles: true, detail: this.value});
            this.dispatchEvent(event);
        }
    }
}

customElements.define("hx-search", Search, {extends: "input"});