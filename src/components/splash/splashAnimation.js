import splash1 from '/imgs/newsify_logo1.png'
import splash2 from '/imgs/newsify_logo2.png'

export default function splashEl() {
    const body = document.querySelector('body')
    const animateEl = document.createElement('section')
    animateEl.classList.add('animateEl')

    animateEl.innerHTML = `
        <section class="animateEl__item mini">
            <img src="${splash1}" alt="logo">
        </section>
        <section class="animateEl__item big">
            <img src="${splash2}" alt="logo">
            <h1 class="animateEl__headline">Newsify</h1>
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