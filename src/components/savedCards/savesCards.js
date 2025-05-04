import swipeFunctionality from "../swipe/swipeEl";

export default function savedCards() {
    let savedCardsEl = document.createElement("div");
    const main = document.querySelector('main')
    savedCardsEl.className = "newsCardsEl"

    let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];
    console.log(savedArray);

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]


    savedCardsEl.innerHTML = categories.map((category) => {
        const articleObject = savedArray.filter(item => item.category === category)
        const articlesArray = articleObject ?? [];
        return `
                            <details class="newsCards__item">
                            <summary class="newsCards__summary">
                                <div class="newsCards__summary--logo">
                                    <img src="/src/imgs/newsify_logo4.png" alt="logo" aria-label="logo">
                                </div>
                                <h2 class="newsCards__summary--headline">${category}</h2>
                                <span class="material-symbols-outlined newsCards__summary--arrow">
                                keyboard_arrow_down
                                </span>
                            </summary>

                            <section class="newsCards__articleList">
                                ${articlesArray.map((article) => {
            return `
                                        <article class="newsCards__article">
                                            <!-- <span class="material-symbols-outlined iconSave" data-id="${article.id}">Save</span> -->
                                            <span class="material-symbols-outlined iconDelete">Delete</span>

                                            <div class="newsCards__content" data-id="${article.id}" data-category="${article.category}">
                                            <div class="newsCards__article--logo">
                                            <img src="${article.thumbnail}" alt="articleImage" data-img="${article.thumbnail}">
                                            </div>

                                            <section class="newsCards__article--text">
                                                <h3 class="newsCards__article--headline" data-headline="${article.headline.main ?? article.headline}">${article.headline.main ?? article.headline}</h3>
                                                <p class="newsCards__article--resume">${article.resume}</p>
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
    swipeFunctionality(savedCardsEl)
    main.appendChild(savedCardsEl)
    return main
}


// til saved siden:
// else {
//     newsCards__article.style.innerHTML += remove
//     localstorage.remove(key, dataattribut)
// }

// vise et element
// gemmelogik eller slettelogik