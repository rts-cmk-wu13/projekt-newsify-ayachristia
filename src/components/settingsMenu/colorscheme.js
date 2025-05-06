

export default function colorScheme() {
    setTimeout(() => {
        let rootEl = document.documentElement;
        const main = document.querySelector('main');
        let colorThemeBtn = main?.querySelector(".settingsEl__colorscheme");

        // Get the dark mode state from localStorage or fallback to system preference
        let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
        let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        let darkState = isDarkMode === null ? false : isDarkMode;
        // let darkState = isDarkMode === null ? browserDark : isDarkMode;

        // Apply the theme (dark or light) based on the saved state
        if (darkState) {
            rootEl.setAttribute("data-dark", true);
        } else {
            rootEl.setAttribute("data-dark", false);
        }

        // If the button exists (on settings page), add event listener to toggle theme
        if (colorThemeBtn) {
            // Update button appearance based on initial dark mode state
            updateButtonAppearance(darkState);

            // Add event listener to toggle dark/light mode on button click
            colorThemeBtn.addEventListener("click", function () {
                darkState = !darkState;

                // Update the theme and save the state to localStorage
                if (darkState) {
                    rootEl.setAttribute("data-dark", true);
                    localStorage.setItem('isDarkMode', JSON.stringify(true));
                } else {
                    rootEl.setAttribute("data-dark", false);
                    localStorage.setItem('isDarkMode', JSON.stringify(false));
                }

                // Update button appearance after toggling
                updateButtonAppearance(darkState);
            });
        }

        // Function to update the button's appearance based on the theme state
        function updateButtonAppearance(isDark) {
            if (colorThemeBtn) {
                colorThemeBtn.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
                if (isDark) {
                    colorThemeBtn.classList.add("dark-mode");
                    colorThemeBtn.classList.remove("light-mode");
                } else {
                    colorThemeBtn.classList.add("light-mode");
                    colorThemeBtn.classList.remove("dark-mode");
                }
            }
        }

    }, 0);
}