class NSFW extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("div");
        wrapper.id = "floater";
        const left = wrapper.appendChild(document.createElement("div"));
        left.id = "left";
        const text = left.appendChild(document.createElement("p"));
        const desc = left.appendChild(document.createElement("p"));
        desc.id = "desc";
        const input = left.appendChild(document.createElement("input"));
        input.placeholder = "URL";
        input.value = localStorage.getItem("helix-panic");
        const icon = wrapper.appendChild(document.createElement("p"));
        icon.id = "icon";
        text.innerHTML = `Press <kbd>Pause</kbd> to panic`;
        desc.innerHTML = `Panicking will pause playback, minimize the player, hide Helix's content, and open the specified URL. Press <kbd>Pause</kbd> again to undo.`;
        icon.innerText = "👻";

        const camo = document.createElement("div");
        camo.id = "camo";
        camo.style.display = "none";

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/nsfw.css");

        this.shadowRoot.append(css, wrapper, camo);

        input.onblur = () => {
            if (input.value.length > 0) {
                localStorage.setItem("helix-panic", input.value);
            }
        };

        window.addEventListener("keydown", (e) => {
            if (e.code == "Pause") {
                if (camo.style.display == "none") {
                    camo.style.display = "unset";
                    try {
                        document.querySelector("video").pause();
                        document.exitFullscreen();
                    } catch {
                        // do nothing
                    }
                    if (input.value) {
                        window.open(input.value, "_blank");
                    }
                } else {
                    camo.style.display = "none";
                }
            }
        });
    }
}

customElements.define("hx-nsfw", NSFW)