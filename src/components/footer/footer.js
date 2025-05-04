export default function footer() {
    const footerEl = document.querySelector('.mainLayoutEl__footer')
    footerEl.className = "footerEl";

    footerEl.innerHTML = `
                <section class="footerEl__item">
                    <a href="index.html">
                      <span class="material-symbols-outlined">
                    home
                    </span>
                    <p class="footerEl__item--text">Home</p>  
                    </a>
                </section>
                <section class="footerEl__item">
                    <a href="/pages/saved.html">
                        <span class="material-symbols-outlined">
                            bookmark
                        </span>
                        <p class="footerEl__item--text">Saved</p>
                    </a>
                </section>
                <section class="footerEl__item">
                    <a href="/pages/popular.html">
                        <span class="material-symbols-outlined">
                            star
                        </span>
                        <p class="footerEl__item--text">Popular</p>
                    </a>
                </section>
                <section class="footerEl__item">
                    <a href="/pages/settings.html">
                        <span class="material-symbols-outlined">
                            settings
                        </span>
                        <p class="footerEl__item--text">Settings</p>
                    </a>
                </section>
        `

    return footerEl
}