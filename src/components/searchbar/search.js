import swipeFunctionality from "../swipe/swipeEl";

export default function searchBar() {
    const header = document.querySelector('header')
    const main = document.querySelector('main')
    let form = document.createElement("form");
    form.className = 'mainLayoutEl__form'

    form.innerHTML = `
    <input type="text" class="mainLayoutEl__searchBar" placeholder="Search all news..">
    `

    let inputEl = form.querySelector('.mainLayoutEl__searchBar')


    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        let searchValue = inputEl.value;
        let articlesArray = await fetchArticles(searchValue)

        main.innerHTML = articlesArray.map((article) => {
            return `
            <article class="newsCards__article">
                                            <span class="material-symbols-outlined iconSave" data-id="${article.id}">Save</span>
                                            <!-- <span class="material-symbols-outlined iconDelete">Delete</span> -->

                                            <div class="newsCards__content" data-id="${article.id}" data-category="Searches">
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
        swipeFunctionality(main)
        return main
    })





    async function fetchArticles(customQuery) {
        const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
        const API_KEY = import.meta.env.VITE_NYT_API_KEY

        const url = new URL(BASE_URL)
        url.searchParams.append('q', customQuery)
        url.searchParams.append('api-key', API_KEY)
        try {
            const response = await fetch(url);
            const data = await response.json()
            const articles = data.response.docs;
            let validArticles = articles.filter(article => article.abstract && article.abstract.trim() !== '').slice(0, 10)

            while (validArticles.length < 10) {
                const moreArticlesResponse = await fetch(url)
                const moreArticlesData = await moreArticlesResponse.json()
                const moreArticles = moreArticlesData.response.docs

                const newValidArticles = moreArticles.filter(article => article.abstract && article.abstract.trim() !== '')
                validArticles = [...validArticles, ...newValidArticles]
            }

            const slicedArticles = validArticles.slice(0, 10)

            let dataObject = slicedArticles.map((article) => {
                return {
                    category: `${customQuery}`,
                    headline: article.headline,
                    author: article.byline,
                    article: article.abstract,
                    resume: article.snippet,
                    published: article.pub_date,
                    subsection: article.subsection_name,
                    id: article._id,
                    url: article.web_url,
                    defaultimage: article.multimedia?.default?.url,
                    thumbnail: article.multimedia?.thumbnail?.url
                }
            })
            return dataObject
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    header.appendChild(form)
    return header
}