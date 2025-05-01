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

                <!-- <section class="newsCards__item"> -->
                    <!-- <section class="newsCards__category"> -->


                        <!-- details parent tag-->
                        <details class="newsCards__item">
                            <!-- summery 1st child tag  -->
                            <summary class="newsCards__summary">
                                <div class="newsCards__summary--logo">
                                    <img src="/src/imgs/newsify_logo4.png" alt="logo" aria-label="logo">
                                </div>
                                <h2 class="newsCards__summary--headline">${category}</h2>
                                <span class="material-symbols-outlined newsCards__summary--arrow">
                                keyboard_arrow_down
                                </span>
                            </summary>


                            <!-- section 2nd child tag width articles  -->
                            <section class="newsCards__articleList">
                                ${articlesArray.map((article) => {
            return `
                                        <article class="newsCards__article">
                                            <div class="newsCards__article--logo">
                                            <img src="${article.thumbnail}" alt="articleImage">
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
                    <!-- </section> -->
                <!-- </section> -->
                `
    }).join("")

    swipeFunctionality(newsCardsEl)


    main.appendChild(newsCardsEl)
    return main
}


function swipeFunctionality(newsCardsEl) {
    const swipeLists = newsCardsEl.querySelectorAll('.newsCards__articleList')
    swipeLists.forEach((list) => {

        let initialX;
        let currentX;
        let movedX;

        list.addEventListener("pointerdown", startTouch)
        list.addEventListener("pointermove", moveTouch)
        list.addEventListener("pointerup", endTouch)


        function startTouch(event) {
            // event.preventDefault();
            // event.stopPropagation()
            initialX = event.clientX
            console.log(initialX);

            // e.target.closest('.swipelist__item').classList.remove('animate')
        }

        function moveTouch(event) {
            // event.preventDefault();
            // event.stopPropagation()
            currentX = event.clientX
            movedX = currentX - initialX
            console.log(movedX);

            // console.log(event.target.closest('.newsCards__article'));

            // if (movedX < 0) {
            event.target.closest('.newsCards__article').style.left = `${movedX}px`;
            // }
        }
        function endTouch(event) {
            initialX = undefined;
        }



    })

}