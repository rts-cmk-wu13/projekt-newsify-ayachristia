export default function carousel() {
    let carouselEl = document.createElement("div");
    carouselEl.className = "carousel"

    carouselEl.innerHTML = `
            <figure class="carousel__slides">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding1.png" alt="onboardingImage" class="carousel__img">
                </div>
                <figcaption class="carousel__headline">Stay Connected,
                Everywhere, Anytime</figcaption>
                <figcaption class="carousel__text">Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.</figcaption>
            </figure>
            <figure class="carousel__slides">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding2.png" alt="onboardingImage">
                </div>
                <h2 class="carousel__headline">Become a Savvy Global Citizen.</h2>
                <p class="carousel__text">Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!</p>
            </figure>
            <figure class="carousel__slides">
                <div class="carousel__imgContainer">
                    <img src="/src/imgs/Onboarding3.png" alt="onboardingImage">
                </div>
                <h2 class="carousel__headline">Enhance your News
                Journey Now!</h2>
                <p class="carousel__text">Be part of our dynamic community and contribute your insights and participate in enriching conversations.</p>
            </figure>

            <div class="carousel__nav">
                <div class="carousel__dots">
                <span class="carousel__dot active"></span>
                <span class="carousel__dot"></span>
                <span class="carousel__dot"></span>
                </div>
    
                <div class="carousel__buttons">
                    <button class="carousel__skip">Skip</button>
                    <button class="carousel__next">Continue</button>
                </div>
            </div>
    `
    //elements
    const dots = carouselEl.querySelectorAll('.carousel__dot');
    console.log(dots);
    const slides = carouselEl.querySelectorAll('.carousel__slides');
    console.log(slides);
    const skipBtn = carouselEl.querySelector('.carousel__skip')
    const continueBtn = carouselEl.querySelector('.carousel__next')
    //events
    skipBtn.addEventListener('click', () => {
        window.location.href = 'login.html'
    })
    continueBtn.addEventListener('click', () => {
        plusSlides(1)
    })
    //start index
    let slideIndex = 0;
    //set first slide in show slides
    showSlides(slideIndex)
    //function to hide all slides
    function hideAllSlides() {
        // const slides = carouselEl.querySelectorAll('.carousel__slides');
        console.log(slides);
        slides.forEach((slide) => {
            slide.style.display = 'none';
        })
    }
    //the plus function to go to next slide
    function plusSlides(n) {
        showSlides((slideIndex += n))
    }
    //function to update the current active dot on index
    function updateActiveDot(index) {
        console.log(`Trying to activate dot at index: ${index}`);
        dots.forEach((dot) => {
            dot.classList.remove('active')
        })
        dots[index].classList.add('active')
    }
    //function to show current slideIndex
    function showSlides(n) {
        console.log(n);
        if (n > slides.length - 1) window.location.href = 'login.html'

        slideIndex = n;

        hideAllSlides()
        updateActiveDot(slideIndex)

        slides[slideIndex].style.display = "block"
    }

    //plusslides width if logic if(currentItem)
    //


    return carouselEl;
}