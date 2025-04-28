export default function carousel() {
    let sliderEl = document.createElement("div");
    sliderEl.className = "carousel-container"

    sliderEl.innerHTML = `
    <ul class="carousel">
            <li class="carousel__item">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding1.png" alt="onboardingImage" class="carousel__img">
                </div>
                <h2 class="carousel__headline">Stay Connected,
                Everywhere, Anytime</h2>
                <p class="carousel__text">Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.</p>
            </li>
            <li class="carousel__item">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding2.png" alt="onboardingImage">
                </div>
                <h2 class="carousel__headline">Become a Savvy Global Citizen.</h2>
                <p class="carousel__text">Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!</p>
            </li>
            <li class="carousel__item">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding3.png" alt="onboardingImage">
                </div>
                <h2 class="carousel__headline">Enhance your News
                Journey Now!</h2>
                <p class="carousel__text">Be part of our dynamic community and contribute your insights and participate in enriching conversations.</p>
            </li>
        </ul>

        <div class="carousel__dots">
        <span class="carousel__dot"></span>
        <span class="carousel__dot"></span>
        <span class="carousel__dot"></span>
        </div>

        <button class="carousel__continue">Continue</button>
        <button class="carousel__skip">Skip</button>
        `
    let slideIndex = 1;
    const carousel = sliderEl.querySelector('.carousel');
    const totalItems = carousel.querySelectorAll('li').length; // Changed here 👇
    console.log(totalItems);
    let currentItem = 0;


    sliderEl.querySelector('.carousel__skip').addEventListener('click', function () {
        // Always redirect to index.html immediately when pressed
        window.location.href = 'index.html';
    });



    sliderEl.querySelector('.carousel__continue').addEventListener('click', function () {

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