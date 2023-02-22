const apiKey = "22a2a48d05ae9297e09f118308f99d21";
const search = document.querySelector("#user-input")
const searchBtn = document.querySelector("#search-button")


searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let city = search.value
    getWeather(city)
    localStorage.setItem("city", JSON.stringify(city))
})

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=` + apiKey + `&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=` + apiKey + `&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
        })