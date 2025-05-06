import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import getMostPopular from '../nytapi/getMostPopular.js'
import popularCards from '../components/popularCards/popularCards.js'
import colorScheme from '../components/settingsMenu/colorscheme.js'

const mainLayout = layout();


async function initializePage() {
    const popularArticles = await getMostPopular();
    mainLayout.appendChild(footer());
    mainLayout.appendChild(popularCards(popularArticles));

    document.addEventListener('DOMContentLoaded', () => {
        colorScheme();
    });
}

initializePage();