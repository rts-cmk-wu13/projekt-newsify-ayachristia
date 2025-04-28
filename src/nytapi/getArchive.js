const BASE_URL = `/nyt/svc/archive/v1/`
const API_KEY = import.meta.env.VITE_NYT_API_KEY

export default async function getArchive(query, filter) {
    let nytCategories;
    nytCategories = JSON.parse(localStorage.getItem("archiveArray"));

    const categories = [
        'Europe',
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]

    async function fetchArticles(customQuery) {
        const url = new URL(BASE_URL + `${query}/${filter}.json`, window.location.origin);
        url.searchParams.append('api-key', API_KEY);
        console.log(url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const articles = await data.response.docs
            console.log(articles);

            const dataObject = articles.map((article) => {
                // const query = customQuery ? customQuery.toLowerCase() : ""
                if (
                    article.keywords && article.keywords.some(keyword => keyword.value.toLowerCase().includes(customQuery.toLowerCase()))
                ) {
                    return {
                        category: article.news_desk,
                        headline: article.headline.main,
                        author: article.byline.original,
                        resume: article.lead_paragraph,
                        published: article.pub_date,
                        subsection: article.subsection,
                        id: article._id,
                        url: article.web_url,
                        defaultimage: 'http://static01.nyt.com/' + article.multimedia[1].url,
                        thumbnail: 'http://static01.nyt.com/' + article.multimedia[3].url
                    };
                }
                return null;
            }).filter(item => item !== null)

            return dataObject;
        } catch (error) {
            console.log('Error fetching data:', error);
        }

    }
    // fetchArticles()

    async function updateCategories() {
        const updatedCategories = await Promise.all(
            categories.map(async (category) => {
                const articles = await fetchArticles(category)
                return {
                    category: category,
                    articles: articles
                }
            }))
        return updatedCategories
    }

    const storedData = localStorage.getItem("archiveArray")
    const storedTime = localStorage.getItem("archiveArrayTime")
    const oneHour = 60 * 60 * 1000; //1hr in ms


    if (storedData && storedTime && (Date.now() - Number(storedTime)) < oneHour) {
        nytCategories = JSON.parse(storedData)
    } else {
        nytCategories = await updateCategories();
        localStorage.setItem("archiveArray", JSON.stringify(nytCategories))
        localStorage.setItem("archiveArrayTime", Date.now().toString())
    }




    return nytCategories
}