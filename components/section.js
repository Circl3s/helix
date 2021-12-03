class Section extends HTMLElement {
    static get observedAttributes() { return ['hx-title']; }

    constructor() {
        super();

        function handleResize() {
            if (flex.scrollWidth < wrapper.clientWidth) {
                btnl.style.display = "none";
                btnr.style.display = "none";
            } else {
                btnl.style.display = "flex";
                btnr.style.display = "flex";
            }
        }

        function handleClick(e) {
            if (e.target.classList.contains("left")) {
                flex.scrollLeft -= wrapper.clientWidth;
            } else if (e.target.classList.contains("right")) {
                flex.scrollLeft += wrapper.clientWidth;
            }
        }

        // <hx-section title="Genre"><item 1 /> <item 2 />...</hx-section>
        let title_text = this.getAttribute("hx-title");

        this.attachShadow({mode: "open"});

        const wrapper = document.createElement("section");

        const title = wrapper.appendChild(document.createElement("h2"));
        title.innerText = title_text;

        const flex = wrapper.appendChild(document.createElement("slot"));
        flex.setAttribute("class", "flex");

        const btnl = wrapper.appendChild(document.createElement("button"));
        btnl.setAttribute("class", "scrollbtn left");
        btnl.innerText = "←";

        const btnr = wrapper.appendChild(document.createElement("button"));
        btnr.setAttribute("class", "scrollbtn right");
        btnr.innerText = "→";

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/section.css");

        this.shadowRoot.append(css, wrapper);

        btnr.onclick = handleClick;
        btnl.onclick = handleClick;

        window.addEventListener("load", handleResize);

        window.addEventListener("resize", handleResize);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let title_text = this.getAttribute("hx-title");

        this.shadowRoot.querySelector("h2").innerText = title_text;
    }
}

customElements.define("hx-section", Section);