class MOTD extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const block = document.createElement("div");
        block.innerText = "Watch now"

        const css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", "./components/motd.css");

        let activeBranch = "master";

        fetch("./.git/HEAD").then(response => response.text()).then(text => {
            activeBranch = text.split("/")[text.split("/").length - 1];

            let requestURL = `./.git/refs/heads/${activeBranch}`;
            let request = new XMLHttpRequest();
            request.open("GET", requestURL);

            request.send();

            request.onload = () => {
                let checkURL = "https://api.github.com/repos/Circl3s/helix/branches";
                let check = new XMLHttpRequest();
                check.open("GET", checkURL);
                check.responseType = "json"

                check.send();

                check.onload = () => {
                    console.log(activeBranch)
                    console.table(check.response)
                    let branch = check.response.find(b => b.name.trim() == activeBranch.trim())
                    console.log(request.response);
                    console.log(branch.commit.sha);
                    if (request.response.trim() != branch.commit.sha.trim()) {
                        block.classList.add("notify");
                        block.title = `Run "git pull" in the Helix's directory`;
                        block.innerText = "New version available!";
                    }
                };
            };
        });

        this.shadowRoot.append(css, block);
    }
}

customElements.define("hx-motd", MOTD);