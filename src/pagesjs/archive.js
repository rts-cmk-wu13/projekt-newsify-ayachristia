import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import getArchive from '../nytapi/getArchive.js'
import newsCards from '../components/newsCards/newsCards.js'

const archiveArticles = await getArchive(2024, 1)
console.log(archiveArticles);

layout().appendChild(footer(), newsCards(archiveArticles))