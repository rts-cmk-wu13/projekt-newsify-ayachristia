import swipeFunctionality from "../swipe/swipeEl";

export default function popularCards(articles) {
    const main = document.querySelector('main')
    let popularCardsEl = document.createElement("div");
    popularCardsEl.className = "newsCards"

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]

    let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];
    console.log(savedArray);
    console.log(articles);

    popularCardsEl.innerHTML = categories.map((category) => {
        const articlesObject = articles.find(item => item.category === category);
        const articlesArray = articlesObject?.articles ?? [];

        return `
                        <details class="newsCards__item">
                            <summary class="newsCards__summary">
                                <div class="newsCards__summary--logo">
                                    <img src="/src/imgs/newsify_logo4.png" alt="logo" aria-label="logo" >
                                </div>
                                <h2 class="newsCards__summary--headline">${category}</h2>
                                <span class="material-symbols-outlined newsCards__summary--arrow">
                                keyboard_arrow_down
                                </span>
                            </summary>

                            <section class="newsCards__articleList">
                                ${articlesArray.map((article) => {
            // console.log(article);
            return `
                                        <article class="newsCards__article">
                                            <span class="material-symbols-outlined iconSave" data-id="${article.id}">Save</span>
                                            <!-- <span class="material-symbols-outlined iconDelete">Delete</span> -->

                                            <div class="newsCards__content" data-id="${article.id}" data-category="${article.category}">
                                            <div class="newsCards__article--logo">
                                            <img src="${article.thumbnail}" alt="articleImage" data-img="${article.thumbnail}">
                                            </div>

                                            <section class="newsCards__article--text">
                                                <h3 class="newsCards__article--headline" data-headline="${article.headline.main ?? article.headline}">${article.headline.main ?? article.headline}</h3>
                                                <p class="newsCards__article--resume" data-resume="${article.resume}">${article.resume}</p>
                                            </section>
                                            </div>

                                        </article>
                                        `
        }).join("")
            }
                            </section>
                        </details>
                `
    }).join("")

    swipeFunctionality(popularCardsEl, articles)

    main.appendChild(popularCardsEl)
    return main
}