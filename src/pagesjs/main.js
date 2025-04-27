import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import searchBar from '../components/searchbar/search.js'
import newsCards from '../components/newsCards/newsCards.js'





layout().appendChild(footer(), searchBar(), newsCards())



