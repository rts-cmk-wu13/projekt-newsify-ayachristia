export default function layout() {
    let layoutEl = document.createElement("div");
    layoutEl.className = "mainLayoutEl"

    layoutEl.innerHTML = `
            <header class="mainLayoutEl__header">
                <section class="mainLayoutEl__top">
                    <img class="mainLayoutEl__logo" src="/src/imgs/newsify_logo 1.png" alt="logo" aria-label="logo">
                    <h1 class="mainLayoutEl__logo--text">Newsify</h1>
                </section>
            </header>
            <main></main>
            <footer class="mainLayoutEl__footer"></footer>
        `

    document.body.appendChild(layoutEl)

    return layoutEl
}