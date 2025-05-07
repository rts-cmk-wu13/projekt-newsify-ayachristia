// const smallLogo = '/public/imgs/newsify_logo4.png'
// console.log(smallLogo);

import smallLogo from '/imgs/newsify_logo4.png'

export default function layout() {
    let layoutEl = document.createElement("div");
    layoutEl.className = "mainLayoutEl"

    layoutEl.innerHTML = `
            <header class="mainLayoutEl__header">
                <section class="mainLayoutEl__top">
                    <img class="mainLayoutEl__logo" src="${smallLogo}" alt="logo" aria-label="logo">
                    <h1 class="mainLayoutEl__logo--text">Newsify</h1>
                </section>
            </header>
            <main class="mainLayoutEl__main"></main>
            <footer class="mainLayoutEl__footer"></footer>
        `

    document.body.appendChild(layoutEl)
    return layoutEl
}