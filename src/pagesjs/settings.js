import '../styles/style.scss'
import layout from '../components/layout/layout.js'
import footer from '../components/footer/footer.js'
import settingsMenu from '../components/settingsMenu/settingsMenu.js'
import colorScheme from '../components/settingsMenu/colorscheme.js'
// Create the layout
const mainLayout = layout();

// Append footer and settings menu to the layout
mainLayout.appendChild(footer());
mainLayout.appendChild(settingsMenu());

// Wait for DOM to be fully loaded before initializing colorScheme
document.addEventListener('DOMContentLoaded', () => {
    colorScheme();
});