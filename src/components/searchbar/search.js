export default function searchBar() {
    const header = document.querySelector('header')
    let inputEl = document.createElement("input");
    inputEl.className = "mainLayoutEl__searchBar"
    inputEl.placeholder = `Search news`


    header.appendChild(inputEl)
    return header
}