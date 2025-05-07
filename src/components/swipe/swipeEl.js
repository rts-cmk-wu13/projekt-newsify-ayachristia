export default function swipeFunctionality(container) {
    let articles = container.querySelectorAll('.newsCards__content')

    articles.forEach((item) => {

        const article = item.closest('.newsCards__article');
        const iconSave = article.querySelector('.iconSave');
        const iconDelete = article.querySelector('.iconDelete');

        item.addEventListener("pointerdown", startTouch)
        item.addEventListener("pointermove", moveTouch)
        item.addEventListener("pointerup", endTouch)
        item.addEventListener("pointerleave", endTouch)

        let initialX;
        let currentX;
        let movedX;

        let articleObj = {
            category: item.dataset.category,
            headline: item.querySelector(".newsCards__article--headline").dataset.headline,
            id: item.dataset.id,
            thumbnail: item.querySelector('.newsCards__article--logo img').dataset.img,
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

            let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];

            if (article.querySelector('.iconSave')) {
                const iconSave = article.querySelector('.iconSave');
                article.style.backgroundColor = "green";
                iconSave.style.display = 'block';
                // iconDelete.style.display = 'none';
            } else if (article.querySelector('.iconDelete')) {
                const iconDelete = article.querySelector('.iconDelete');
                article.style.backgroundColor = "red";
                // iconSave.style.display = 'none';
                iconDelete.style.display = 'block';
            }

            // if (!savedArray.some(obj => obj.id === articleObj.id)) {
            //     article.style.backgroundColor = "green";
            //     iconSave.style.display = 'block';
            //     iconDelete.style.display = 'none';
            // } else {
            //     article.style.backgroundColor = "red";
            //     iconSave.style.display = 'none';
            //     iconDelete.style.display = 'block';
            // }


            if (movedX < 0) {
                event.target.closest('.newsCards__content').style.left = `${movedX}px`;
            }
        }

        function endTouch(event) {
            initialX = undefined;
            event.target.closest('.newsCards__content').style.left = `0px`;

            article.style.backgroundColor = "transparent";
            // iconSave.style.display = 'none';
            // iconDelete.style.display = 'none';

            // if(movedX < -20)
            // overflow: clip;
            // touch-action: pan-y on content 
            if (movedX < -100) {
                let savedArray = JSON.parse(localStorage.getItem('savedArray')) || [];

                if (!savedArray.some(obj => obj.id === articleObj.id)) {
                    savedArray.push(articleObj);
                    localStorage.setItem('savedArray', JSON.stringify(savedArray));
                    // iconSave.style.display = 'none';
                    // iconDelete.style.display = 'none';
                } else {
                    savedArray = savedArray.filter(item => item.id != articleObj.id)
                    localStorage.setItem('savedArray', JSON.stringify(savedArray))
                    // iconSave.style.display = 'none';
                    // iconDelete.style.display = 'none';
                }

                event.target.closest('.newsCards__content').classList.add('animate')
            }


        }
    })

}