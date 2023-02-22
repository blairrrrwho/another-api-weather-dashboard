const apiKey = "22a2a48d05ae9297e09f118308f99d21";
const search = document.querySelector("#user-input")
const searchBtn = document.querySelector("#search-button")
const mainCard = document.querySelector("#main-card-title")
const temp = document.querySelector("#main-card-temp")
const wind = document.querySelector("#main-card-wind")
const humidity = document.querySelector("#main-card-humidity")
const date = document.querySelector(".date")


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
            const today = new Date(data.dt * 1000)
            const month = today.getMonth() + 1;
            date.innerHTML = "(" + month + "/" + today.getDate() + "/" + today.getFullYear() + ")"
            mainCard.innerHTML = data.name
            const todaysPic = document.createElement("img")
            const weatherPic = data.weather[0].icon;
            todaysPic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            todaysPic.setAttribute("alt", data.weather[0].description);
            mainCard.append(todaysPic)
            temp.innerHTML = "Temp: " + Math.floor(data.main.temp) + ` &#176F`
            wind.innerHTML = "Wind: " + Math.floor(data.wind.speed) + " mph"
            humidity.innerHTML = " Humidity: " + Math.floor(data.main.humidity) + "%";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=` + apiKey + `&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
        })