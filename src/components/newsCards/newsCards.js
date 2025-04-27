export default async function newsCards() {
    const main = document.querySelector('main')
    let newsCardsEl = document.createElement("div");
    newsCardsEl.className = "newsCards";

    let newYorkCategories;

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]
    //read from localstorage
    newYorkCategories = JSON.parse(localStorage.getItem("newYorkArray"));

    async function fetchArticles(customQuery) {
        try {
            const apiKey = `rx7RIG7KHCa4ZSId1HyatuJOoTT9t9kr`
            const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${customQuery}&api-key=${apiKey}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            })
            const data = await response.json()
            const articles = data.response.docs


            let dataObject = articles.map((article) => {
                // console.log(article);
                return {
                    category: article.news_desk,
                    headline: article.headline,
                    article: article.abstract,
                    author: article.byline,
                    resume: article.snippet,
                    published: article.pub_date,
                    subsection: article.subsection_name,
                    id: article._id,
                    url: article.web_url,
                    defaultimage: article.multimedia.default.url,
                    thumbnail: article.multimedia.thumbnail.url
                }
            })
            return dataObject
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    async function loadCategories() {
        const newCategories = await Promise.all(
            categories.map(async (category) => {
                const articles = await fetchArticles(category)
                return {
                    category: category,
                    articles: articles
                }
            })
        )
        return newCategories;
    }

    const storedData = localStorage.getItem("newYorkArray")
    const storedTime = localStorage.getItem("newYorkArrayTime")
    const oneHour = 60 * 60 * 1000; //1hr in ms


    if (storedData && storedTime && (Date.now() - Number(storedTime)) < oneHour) {
        newYorkCategories = JSON.parse(storedData)
    } else {
        newYorkCategories = await loadCategories();
        localStorage.setItem("newYorkArray", JSON.stringify(newYorkCategories))
        localStorage.setItem("newYorkArrayTime", Date.now().toString())
    }
    // else {
    //     console.log(newYorkCategories);
    // }
    console.log(newYorkCategories);

    newsCardsEl.innerHTML = newYorkCategories.map((category) => {
        const articles = category.articles
        console.log(articles);
        // console.log(articles);
        return `
                <section class="newsCards__item">
                    <section class="newsCards__category">

                        <details class="newsCards__details">
                            <summary class="newsCards__summary">
                                <div class="newsCards__summary--logo">
                                    <img src="/src/imgs/newsify_logo 1.png" alt="logo" aria-label="logo">
                                </div>
                                <h2 class="newsCards__summary--headline">${category.category}</h2>
                                <span class="material-symbols-outlined newsCards__summary--arrow">
                                keyboard_arrow_down
                                </span>
                            </summary>

                            <section class="newsCards__articles">
                                <!-- ${category} -->
                                 ${articles.map((article) => {
            // console.log(article);
            return `
                                        <article class="newsCards__article">
                                            <div class="newsCards__article--logo">
                                            <img src="${article.thumbnail}" alt="">
                                            </div>

                                            <section class="newsCards__article--text">
                                                <h3 class="newsCards__article--headline">${article.headline.main}</h3>
                                                <p class="newsCards__article--resume">${article.resume}</p>
                                            </section>


                                        </article>
                                        `
        }).join("")}
                                
                            </section>
                        </details>

                    </section>

                </section>
                `
    }).join("")

    main.appendChild(newsCardsEl)
    return main
}