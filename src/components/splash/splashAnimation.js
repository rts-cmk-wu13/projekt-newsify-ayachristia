const splashImgs = [
    '/public/imgs/newsify_logo1.png',
    '/public/imgs/newsify_logo2.png'
]

export default function splashEl() {
    const body = document.querySelector('body')
    const animateEl = document.createElement('section')
    animateEl.classList.add('animateEl')

    animateEl.innerHTML = `
        <section class="animateEl__header">
           <section class="animateEl__item mini">
            <img src="${splashImgs[0]}" alt="logo">
        </section>
        <section class="animateEl__item big">
            <img src="${splashImgs[1]}" alt="logo">
            <h1 class="animateEl__headline">Newsify</h1>
        </section> 
        </section>
    `
    const miniEl = animateEl.querySelector('.mini')
    const bigEl = animateEl.querySelector('.big')
    window.addEventListener('DOMContentLoaded', (event) => {
        console.log(event);
        miniEl.classList.add('fadein');
        setTimeout(() => {
            setTimeout(() => {
                miniEl.classList.add('fadeout')
            }, 300);

            setTimeout(() => {
                bigEl.classList.add('fadein')
            }, 300)

            setTimeout(() => {
                //indication that splash has been shown saved to localStorage
                localStorage.setItem('splashShown', 'true')
                window.location.href = `onboarding.html`
            }, 2000)
        },)
    })


    body.appendChild(animateEl)
    return body;
}