const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
const API_KEY = import.meta.env.VITE_NYT_API_KEY

export default async function getArticleSearch() {
    let nytCategories;
    nytCategories = JSON.parse(localStorage.getItem("articleSearchArray"));

    let categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]

    async function fetchArticles(customQuery) {
        const url = new URL(BASE_URL);
        url.searchParams.append('q', customQuery);
        url.searchParams.append('api-key', API_KEY);

        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         accept: 'application/json'
        //     }
        // })
        try {
            const response = await fetch(url)
            const data = await response.json()
            const articles = data.response.docs


            let dataObject = articles.map((article) => {
                // console.log(article);
                return {
                    category: article.news_desk,
                    headline: article.headline,
                    author: article.byline,
                    article: article.abstract,
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


    async function updateCategories() {
        const updatedCategories = await Promise.all(
            categories.map(async (category) => {
                const articles = await fetchArticles(category)
                return {
                    category: category,
                    articles: articles
                }
            })
        )
        return updatedCategories;
    }

    const storedData = localStorage.getItem("articleSearchArray")
    const storedTime = localStorage.getItem("articleSearchArrayTime")
    const oneHour = 60 * 60 * 1000; //1hr in ms

    if (storedData && storedTime && (Date.now() - Number(storedTime)) < oneHour) {
        nytCategories = JSON.parse(storedData)
    } else {
        nytCategories = await updateCategories();
        localStorage.setItem("articleSearchArray", JSON.stringify(nytCategories))
        localStorage.setItem("articleSearchArrayTime", Date.now().toString())
    }


    return nytCategories

}