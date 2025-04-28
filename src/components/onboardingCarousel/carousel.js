export default function carousel() {
    let sliderEl = document.createElement("div");
    sliderEl.className = "carousel-container"

    sliderEl.innerHTML = `
    <ul class="carousel">
            <li>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, assumenda vitae mollitia quo voluptatem minima ad officiis consequuntur ea expedita?</p>
            </li>
            <li>
                <h2>Assumenda eius inventore sapiente repellat!</h2>
                <p>Quisquam soluta culpa illum corrupti architecto tempore nam beatae sapiente, cumque earum voluptatem consequuntur commodi esse reprehenderit cupiditate, magnam odio?</p>
            </li>
            <li>
                <h2>Sed voluptatum corporis soluta ea.</h2>
                <p>Aliquam cupiditate commodi asperiores dolores officiis aspernatur, iure mollitia facilis sint cum ducimus error veritatis consequuntur esse voluptas eos ipsa!</p>
            </li>
        </ul>

        <button class="continue-btn">Continue</button>
  <button class="skip-btn">Skip</button>
        `

    const carousel = sliderEl.querySelector('.carousel');
    const totalItems = carousel.querySelectorAll('li').length; // Changed here 👇
    let currentItem = 0;


    sliderEl.querySelector('.skip-btn').addEventListener('click', function () {
        // Always redirect to index.html immediately when pressed
        window.location.href = 'index.html';
    });



    sliderEl.querySelector('.continue-btn').addEventListener('click', function () {

        const carousel = document.querySelector('.carousel')
        if (currentItem === totalItems - 1) {
            // If we're already at last slide, redirect
            window.location.href = 'index.html';
        } else {
            // Otherwise, scroll and increment
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            currentItem++;
        }
    })

    return sliderEl
}