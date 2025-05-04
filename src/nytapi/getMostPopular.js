// const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/`
const BASE_URL = `https://api.nytimes.com/svc/topstories/v2/`
const BASE_URL_SEARCH = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
const API_KEY = import.meta.env.VITE_NYT_API_KEY

export default async function getMostPopular(query, filter) {
    // to merge from topStories + Search Apis 
    let topCategories = [
        'Health',
        'Sports',
        'Business',
        'Travel'
    ]
    let popularArray = JSON.parse(localStorage.getItem('popularArray'))
    let searchCategories = [
        'Europe'
    ]

    async function fetchSearchStories(customQuery) {
        const url = new URL(BASE_URL_SEARCH);
        url.searchParams.append('q', customQuery);
        url.searchParams.append('api-key', API_KEY);

        try {
            const response = await fetch(url)
            const data = await response.json()
            const articles = data.response.docs
            console.log(articles);

            let dataObject = articles.map((article) => {
                return {
                    category: `${customQuery}`,
                    headline: article.headline,
                    author: article.byline,
                    article: article.abstract,
                    resume: article.snippet,
                    id: article._id,
                    thumbnail: article.multimedia.thumbnail.url

                }

            })

            return dataObject
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    // const url = new URL(`${query}/${filter}.json`, BASE_URL);
    async function fetchTopStories(customQuery) {
        const topUrl = new URL(`${customQuery}.json`, BASE_URL);
        topUrl.searchParams.append('api-key', API_KEY);
        console.log(topUrl);

        try {
            const response = await fetch(topUrl)
            const data = await response.json()
            let articles = await data.results
            console.log(articles);
            if (!articles) {
                console.warn('No articles found for:', customQuery);
                return null;
            }

            let dataObject = articles.map((article) => {
                return {
                    category: `${customQuery}`,
                    headline: article.title,
                    author: article.byline,
                    article: article.url,
                    resume: article.abstract,
                    thumbnail: article.multimedia && article.multimedia.length > 1 ? article.multimedia[2].url : null
                }

            })

            return dataObject
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    async function updatedTopStories(topCategories) {
        const updated = await Promise.all(
            topCategories.map(async (category) => {
                let articles = await fetchTopStories(category.toLowerCase())
                if (articles == null) {
                    articles = await fetchSearchStories(category)
                }
                return {
                    category: category,
                    articles: articles
                }
            })
        )


        let europeCategory = {
            category: 'Europe',
            articles: await fetchSearchStories("Europe")
        }
        updated.push(europeCategory)

        return updated
    }

    const storedData = localStorage.getItem("popularArray")

    if (storedData) {
        popularArray = JSON.parse(storedData)
    } else {
        popularArray = await updatedTopStories(topCategories)
        localStorage.setItem('popularArray', JSON.stringify(popularArray))
    }

    return popularArray;
    // return updatedTopStories(topCategories)


    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     const articles = await data.results
    //     console.log(articles);

    //     let dataObject;
    //     dataObject = JSON.parse(localStorage.getItem("mostPopular"))

    //     if (dataObject == null) {
    //         dataObject = articles.map((article) => {
    //             return {
    //                 category: article.subsection,
    //                 headline: article.title,
    //                 author: article.byline,
    //                 article: article.uri,
    //                 resume: article.abstract,
    //                 published: article.published_date,
    //                 subsection: article.section,
    //                 id: article.id,
    //                 url: article.url,
    //                 defaultimage: article.media && article.media.length > 0 ? article.media[0]['media-metadata'][1].url : null,
    //                 thumbnail: article.media && article.media.length > 0 ? article.media[0]['media-metadata'][0].url : null

    //             }
    //         })

    //         localStorage.setItem("mostPopular", JSON.stringify(dataObject))
    //     }
    //     // console.log(dataObject);

    //     return dataObject;
    // } catch (error) {
    //     console.log('Error fetching data:', error);
    // }

}