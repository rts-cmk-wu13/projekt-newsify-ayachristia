export default function swipeFunctionality(container) {
    let articles = container.querySelectorAll('.newsCards__content')
    const articlesContainer = container.querySelector('.newsCards__articleList')

    articles.forEach((item) => {
        const article = item.closest('.newsCards__article');

        // 🔥 Only add pointerdown to the article itself - removed pointermove and pointerup 🔥
        item.addEventListener("pointerdown", startTouch)

        let initialX;
        let currentX;
        let movedX;

        let articleObj = {
            category: item.dataset.category,
            headline: item.querySelector(".newsCards__article--headline").dataset.headline,
            id: item.dataset.id,
            thumbnail: item.querySelector('.newsCards__article--logo img')?.dataset?.img || null,
            resume: item.querySelector(".newsCards__article--resume").dataset.resume
        }

        function startTouch(event) {
            // 🔥 Removed incorrect event listeners to articlesContainer 🔥
            // 🔥 Properly initialize position 🔥
            initialX = event.clientX;
            event.target.closest('.newsCards__article').classList.remove('animate');

            // 🔥 Add the move and end listeners to the document instead of the article 🔥
            document.addEventListener("pointermove", moveTouch);
            document.addEventListener("pointerup", endTouch);
            document.addEventListener("pointercancel", endTouch);
        }

        function moveTouch(event) {
            currentX = event.clientX;
            movedX = currentX - initialX;

            if (article.querySelector('.iconSave')) {
                const iconSave = article.querySelector('.iconSave');
                article.style.backgroundColor = "green";
                iconSave.style.display = 'block';
            } else if (article.querySelector('.iconDelete')) {
                const iconDelete = article.querySelector('.iconDelete');
                article.style.backgroundColor = "red";
                iconDelete.style.display = 'block';
            }

            // 🔥 Use item directly instead of event.target.closest() 🔥
            if (movedX < 0) {
                item.style.left = `${movedX}px`;
            }
        }

        function endTouch(event) {
            // 🔥 Correctly remove event listeners 🔥
            document.removeEventListener("pointermove", moveTouch);
            document.removeEventListener("pointerup", endTouch);
            document.removeEventListener("pointercancel", endTouch);

            // 🔥 Use item directly instead of event.target 🔥
            item.style.left = `0px`;
            item.classList.add('animate');

            if (movedX < -100) {
                let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];

                // 🔥 Fixed syntax using && instead of & 🔥
                if (article.querySelector('.iconSave') && !savedArray.some(obj => obj.id === articleObj.id)) {
                    // Add to saved items
                    savedArray.push(articleObj);
                    localStorage.setItem('savedArray', JSON.stringify(savedArray));
                    console.log('Added to saved array:', savedArray);
                    // 🔥 Fixed syntax using && instead of & 🔥
                } else if (article.querySelector('.iconDelete') && savedArray.some(obj => obj.id === articleObj.id)) {
                    // Remove from saved items and animate the article away
                    savedArray = savedArray.filter(item => item.id != articleObj.id);
                    localStorage.setItem('savedArray', JSON.stringify(savedArray));
                    console.log('Removed from saved array:', savedArray);

                    // Apply the animation
                    article.style.position = 'relative';
                    article.style.opacity = '0';

                    // Optional: Remove from DOM after animation completes
                    setTimeout(() => {
                        article.style.display = 'none';
                    }, 500); // Match this to your CSS transition duration
                }
            }

            // 🔥 Reset all tracking variables 🔥
            initialX = undefined;
            currentX = undefined;
            movedX = undefined;
        }
    });
}