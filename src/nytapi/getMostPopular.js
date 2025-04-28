const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/`
const API_KEY = import.meta.env.VITE_NYT_API_KEY

export default async function getMostPopular(query, filter) {
    const url = new URL(`${query}/${filter}.json`, BASE_URL);

    url.searchParams.append('api-key', API_KEY);


    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = await data.results
        console.log(articles);

        let dataObject;
        dataObject = JSON.parse(localStorage.getItem("mostPopular"))

        if (dataObject == null) {
            dataObject = articles.map((article) => {
                return {
                    category: article.subsection,
                    headline: article.title,
                    author: article.byline,
                    article: article.uri,
                    resume: article.abstract,
                    published: article.published_date,
                    subsection: article.section,
                    id: article.id,
                    url: article.url,
                    defaultimage: article.media[0]['media-metadata'][1].url,
                    thumbnail: article.media[0]['media-metadata'][0].url

                }
            })

            localStorage.setItem("mostPopular", JSON.stringify(dataObject))
        }


        return dataObject;
    } catch (error) {
        console.log('Error fetching data:', error);
    }

}