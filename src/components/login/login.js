/*login element*/
export default function loginAccount() {
    let loginEl = document.createElement("div");
    loginEl.className = "login"

    loginEl.innerHTML = `
        <div class="login__logo">
            <img src="/src/imgs/newsify_logo 2.png" alt="logo" aria-label>
        </div>
        <h1 class="login__headline">Newsify</h1>
        <p class="login__subtext">Welcome! Let's dive into your account!</p>

        <section class="login__buttons">
            <button class="login__btn">Continue with Facebook</button>
        <button class="login__btn">Continue with Google</button>
        <p>P</p>
        <button class="login__btn--login">Sing in with password</button>
    </section>

                
        `

    const buttons = loginEl.querySelectorAll('.login__buttons button')
    console.log(buttons);

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = `index.html`
        })
    })

    return loginEl
}