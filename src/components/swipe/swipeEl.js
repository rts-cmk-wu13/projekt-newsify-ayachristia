export default function swipeFunctionality(container) {
    let articles = container.querySelectorAll('.newsCards__content')

    articles.forEach((item) => {

        const article = item.closest('.newsCards__article');
        const iconSave = article.querySelector('.iconSave');
        const iconDelete = article.querySelector('.iconDelete');

        item.addEventListener("pointerdown", startTouch)
        item.addEventListener("pointermove", moveTouch)
        item.addEventListener("pointerup", endTouch)
        // item.addEventListener("pointerleave", endTouch)

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
            if (initialX === undefined) {
                initialX = event.clientX
            }
            event.target.closest('.newsCards__article').classList.remove('animate')
        }

        function moveTouch(event) {

            currentX = event.clientX
            movedX = currentX - initialX

            if (article.querySelector('.iconSave')) {
                const iconSave = article.querySelector('.iconSave');
                article.style.backgroundColor = "green";
                iconSave.style.display = 'block';
            } else if (article.querySelector('.iconDelete')) {
                const iconDelete = article.querySelector('.iconDelete');
                article.style.backgroundColor = "red";
                iconDelete.style.display = 'block';
            }


            if (movedX < 0) {
                event.target.closest('.newsCards__content').style.left = `${movedX}px`;
            }
        }


        function endTouch(event) {
            initialX = undefined;
            const cardContent = event.target.closest('.newsCards__content');
            const articleElement = event.target.closest('.newsCards__article');

            cardContent.style.left = `0px`;
            cardContent.classList.add('animate');

            if (movedX < -100) {
                let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];

                if (!savedArray.some(obj => obj.id === articleObj.id)) {
                    // Add to saved items
                    savedArray.push(articleObj);
                    localStorage.setItem('savedArray', JSON.stringify(savedArray));
                    console.log('Added to saved array:', savedArray);
                } else {
                    // Remove from saved items and animate the article away
                    savedArray = savedArray.filter(item => item.id != articleObj.id);
                    localStorage.setItem('savedArray', JSON.stringify(savedArray));
                    console.log('Removed from saved array:', savedArray);

                    // Apply the animation
                    articleElement.style.position = 'relative';
                    articleElement.style.opacity = '0';

                    // Optional: Remove from DOM after animation completes
                    setTimeout(() => {
                        articleElement.style.display = 'none';
                    }, 500); // Match this to your CSS transition duration
                }
            }
        }
    })

}