class NSFW extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.id = "floater";
        const text = wrapper.appendChild(document.createElement("p"));
        const icon = wrapper.appendChild(document.createElement("p"));
        icon.id = "icon";
        text.innerHTML = `Press <kbd>/</kbd> to toggle camo`;
        icon.innerText = "👻";

        const camo = document.createElement("div");
        camo.id = "camo";
        camo.style.display = "none";
        const image = camo.appendChild(document.createElement("img"));

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/nsfw.css");

        this.shadowRoot.append(css, wrapper, camo);

        window.addEventListener("keydown", (e) => {
            if (e.code == "Slash") {
                if (camo.style.display == "none") {
                    camo.style.display = "unset";
                    document.querySelector("video").pause();
                    document.exitFullscreen();
                } else {
                    camo.style.display = "none";
                }
            }
        });
    }
}

customElements.define("hx-nsfw", NSFW)