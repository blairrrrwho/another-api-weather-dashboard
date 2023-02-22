const apiKey = "22a2a48d05ae9297e09f118308f99d21";
const search = document.querySelector("#user-input")
const searchBtn = document.querySelector("#search-button")


searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let city = search.value
    getWeather(city)
    localStorage.setItem("city", JSON.stringify(city))
})