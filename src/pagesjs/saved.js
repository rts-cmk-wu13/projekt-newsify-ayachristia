import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import savedCards from '../components/savedCards/savesCards.js'
import colorScheme from '../components/settingsMenu/colorscheme.js'


const mainLayout = layout()

mainLayout.appendChild(footer())
mainLayout.appendChild(savedCards())

document.addEventListener('DOMContentLoaded', () => {
    colorScheme();
});