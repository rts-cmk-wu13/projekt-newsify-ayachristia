import logo from '/imgs/newsify_logo4.png'
// const settingsImg = '/public/imgs/newsify_logo4.png'

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
                            <img src="${logo}" alt="logo" aria-label="logo">
                        </div>
                        <h2 class="settingsEl__category">${category}</h2>
                        <label class="switch">
                        <input type="checkbox" name="switch" id="switch-${categories}">
                        <span class="slider round"></span>
                        </label>
                    </section>
                    `
    }).join("")}
            </section>
            <button class="settingsEl__colorscheme">Toggle dark mode</button>
        `
    let toggleState = JSON.parse(localStorage.getItem("settingsCategories")) || {
        Europe: true,
        Health: true,
        Sport: true,
        Business: true,
        Travel: true
    }
    console.log(toggleState);

    settingsEl.querySelectorAll('.settingsEl__item').forEach(btn => {
        const category = btn.querySelector(".settingsEl__category").innerText.trim();
        const checkbox = btn.querySelector("input[type='checkbox']");

        checkbox.checked = toggleState[category] ?? true;

        checkbox.addEventListener("change", () => {
            toggleState[category] = checkbox.checked;
            localStorage.setItem("settingsCategories", JSON.stringify(toggleState))
            location.reload()
        })
    })


    main.appendChild(settingsEl)
    return main
}