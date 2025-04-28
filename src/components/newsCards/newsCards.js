export default async function newsCards(articles) {
    const main = document.querySelector('main')
    let newsCardsEl = document.createElement("div");
    newsCardsEl.className = "newsCards";

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]



    newsCardsEl.innerHTML = categories.map((category) => {
        const articlesObject = articles.find(item => item.category === category);
        const articlesArray = articlesObject?.articles ?? [];

        return `
                <section class="newsCards__item">
                    <section class="newsCards__category">

                        <details class="newsCards__details">
                            <summary class="newsCards__summary">
                                <div class="newsCards__summary--logo">
                                    <img src="/src/imgs/newsify_logo 1.png" alt="logo" aria-label="logo">
                                </div>
                                <h2 class="newsCards__summary--headline">${category}</h2>
                                <span class="material-symbols-outlined newsCards__summary--arrow">
                                keyboard_arrow_down
                                </span>
                            </summary>

                            <section class="newsCards__articles">
                                ${articlesArray.map((article) => {
            console.log(article);
            return `
                                        <article class="newsCards__article">
                                            <div class="newsCards__article--logo">
                                            <img src="${article.thumbnail}" alt="">
                                            </div>

                                            <section class="newsCards__article--text">
                                                <h3 class="newsCards__article--headline">${article.headline.main ?? article.headline}</h3>
                                                <p class="newsCards__article--resume">${article.resume}</p>
                                            </section>


                                        </article>
                                        `
        }).join("")
            }
                            </section>
                        </details>

                    </section>

                </section>
                `
    }).join("")

    main.appendChild(newsCardsEl)
    return main
}