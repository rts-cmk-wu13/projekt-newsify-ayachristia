import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import getMostPopular from '../nytapi/getMostPopular.js'
import popularCards from '../components/popularCards/popularCards.js'
const popularArticles = await getMostPopular()
layout().appendChild(footer(), popularCards(popularArticles))