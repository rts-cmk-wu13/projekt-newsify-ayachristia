/*login element*/
import logo from '/imgs/newsify_logo2.png'
// const loginImg = '/public/imgs/newsify_logo2.png'

export default function loginAccount() {
    let loginEl = document.createElement("div");
    loginEl.className = "login"

    loginEl.innerHTML = `
        <div class="login__logo">
            <img src="${logo}" alt="logo" aria-label>
        </div>
        <h1 class="login__headline">Newsify</h1>
        <p class="login__subtext">Welcome! Let's dive into your account!</p>

        <section class="login__buttons">
            <button class="login__btn">Continue with Facebook</button>
        <button class="login__btn">Continue with Google</button>
        <div class="login__or">
            <span class="login__hl"></span>
            <p class="login__or--text">or</p>
            <span class="login__hl"></span>
        </div>
        <button class="login__btn--login">Sing in with password</button>
    </section>

                
        `

    const buttons = loginEl.querySelectorAll('.login__buttons button')
    console.log(buttons);

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = `/index.html`
        })
    })

    return loginEl
}