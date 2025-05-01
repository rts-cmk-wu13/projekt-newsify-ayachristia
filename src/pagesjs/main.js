import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import searchBar from '../components/searchbar/search.js'
import newsCards from '../components/newsCards/newsCards.js'
import getArticleSearch from '../nytapi/getArticleSearch.js'



const splashShown = localStorage.getItem('splashShown')
if (!splashShown) {
    window.location.href = '/pages/splash.html';
} else {
    loadMain()
}

async function loadMain() {
    const searchArticles = await getArticleSearch()
    console.log(searchArticles);
    layout().appendChild(footer(), searchBar(), newsCards(searchArticles))
}






