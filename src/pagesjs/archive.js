import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import getArchive from '../nytapi/getArchive.js'
layout().appendChild(footer())

const archiveArticles = await getArchive(2024, 1)
console.log(archiveArticles);