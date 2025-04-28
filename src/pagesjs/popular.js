import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import getMostPopular from '../nytapi/getMostPopular.js'
layout().appendChild(footer())

//FETCH for popular
const popularArticles = await getMostPopular('viewed', 7)
// const popularArticles = await getMostPopular()
console.log(popularArticles);