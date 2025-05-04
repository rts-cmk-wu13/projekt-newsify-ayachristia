export default function settingsMenu(data) {
    const main = document.querySelector('main')
    let settingsEl = document.createElement("div");
    settingsEl.className = "settingsEl"

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]

    settingsEl.innerHTML = `
            <h1 class="settingsEl__headline">Settings</h1>
            <p class="settingsEl__subheadline">Categories</p>
            <section class="settingsEl__categories">
                ${categories.map((category) => {
        return `
                    <section class="settingsEl__item" data-category="${category}">
                        <div class="settingsEl__logo">
                            <img src="/src/imgs/newsify_logo4.png" alt="logo" aria-label="logo">
                        </div>
                        <h2 class="settingsEl__category">${category}</h2>
                        
                    </section>
                    `
    }).join("")}
            </section>
            <button class="settingsEl__colorscheme">Toggle dark mode</button>
        `
    main.appendChild(settingsEl)
    return main
}