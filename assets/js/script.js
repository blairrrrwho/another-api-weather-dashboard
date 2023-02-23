const apiKey = "22a2a48d05ae9297e09f118308f99d21";
const mainCard = document.querySelector("#main-card-title");
const temp = document.querySelector("#main-card-temp");
const wind = document.querySelector("#main-card-wind");
const humidity = document.querySelector("#main-card-humidity");
const date = document.querySelector(".date");

const userSearch = document.querySelector("#user-input");
const newCityInput = document.getElementById('previousCityInput');
// previousCityInput.innerHTML = cityInput.value;

let city = "";
const searchList = document.querySelector("#results-div");
var cityArray = JSON.parse(localStorage.getItem("city")) || [];


let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', getUserCity);

let recentBtn = document.getElementById('recent-searches-btns');
recentBtn.addEventListener('click', (event) => choiceClicked(event));

let clearHistoryBtn = document.getElementById('clear-history-btn');
clearHistoryBtn.addEventListener('click', clearStorage);

function choiceClicked(event) {
    getCoordinates(event.target.innerHTML);
}


function getUserCity() {
    // User input from input form
    if (!userSearch.value) {
        return;
    }
    // declare the input is valid
    let search = userSearch.value.trim();
    // check for the response in the input field

    //pass the variable to the next function
    //the variable can be used in the next function if passed
    getCoordinates(search);
}

function getCoordinates(search) {
    // clear out the input field
    userSearch.value = '';
    //add the variable in the parameters to pass it like a hand off
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherKey}`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //pass the information into the next function
            // take all the data with you and THEN pull out what you need
            getWeather(data[0]);
        })
        .catch((error) => {
            console.log(error)
        });
}

// Main even that calls the big function that searches for the city and brings back the weather data
searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let city = userSearch.value
    getWeather(city);
    console.log(city, cityArray);
    cityArray.push(city);
    localStorage.setItem("city", JSON.stringify(cityArray));

})

function createButtons() {
    for (let index = 0; index < cityArray.length; index++) {
        // const buttonNametextContent = cityArray[index];




    }
}


// create a function that uses a loop to create buttons using the city names from cityArray 
// for each, document.createElement, .textContent, append
// add event listener inside the same for each loop


// Add event listener for the dynamically generated search history buttons

// Create clear history buttton
clearHistoryBtn.innerHTML = `
<button class="d-grid pt-4 pb-5 btn btn-outline-secondary">Clear Search History</button>
`;


// 1st API call is to get the weather data for the current day for the specified city 
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
            const weatherPic = data.weather[0].icon
            todaysPic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            todaysPic.setAttribute("alt", data.weather[0].description);
            mainCard.append(todaysPic)

            temp.innerHTML = "Temp: " + Math.floor(data.main.temp) + ` &#176F`
            wind.innerHTML = "Wind: " + Math.floor(data.wind.speed) + " mph"
            humidity.innerHTML = " Humidity: " + Math.floor(data.main.humidity) + "%";

            // The 2nd API call is to get the weather data for the next five days for the searched city 
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + `&appid=` + apiKey + `&units=imperial`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    const forecastCards = document.querySelectorAll(".card-body")

                    // The for loop is so that each of the five cards gets this done but with its own data and with one set of code
                    for (let i = 0; i < forecastCards.length; i++) {
                        // iterates through the five cards to display the data for the respective dates
                        // leave the string empty so that when you do a new search, it doesn't add TO the cards; it'll replace the data with the new city's data
                        forecastCards[i].innerHTML = "";

                        // this api call displays the data every 3 hours; we to make it not do that
                        const index = i * 8 + 4;
                        const forecastDate = new Date(data.list[index].dt * 1000)

                        // Create element for date to display in 
                        // Write it to that element and append it to the DOM
                        const daysDate = document.createElement("p")
                        const month = forecastDate.getMonth() + 1;
                        daysDate.innerHTML = "(" + month + "/" + forecastDate.getDate() + "/" + forecastDate.getFullYear() + ")"
                        forecastCards[i].append(daysDate)

                        // Create element for open weather icon 
                        // Write it to that element and append it to the DOM
                        const forecastPic = document.createElement("img");
                        forecastPic.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png");
                        forecastPic.setAttribute("alt", data.list[index].weather[0].description);
                        forecastCards[i].append(forecastPic);

                        // Create elements for the weather data (three li's)
                        // Link them by their element's ID, write them and append them to the DOM
                        const forecastTemp = document.createElement("li")
                        forecastTemp.innerHTML = "Temp: " + Math.floor(data.list[index].main.temp) + ` &#176F`;
                        forecastCards[i].append(forecastTemp)
                        const forecastWind = document.createElement("li")
                        forecastWind.innerHTML = "Wind: " + Math.floor(data.list[index].wind.speed) + ` mph`;
                        forecastCards[i].append(forecastWind)
                        const forecastHumidity = document.createElement("li")
                        forecastHumidity.innerHTML = "Humidity: " + Math.floor(data.list[index].main.humidity) + `%`;
                        forecastCards[i].append(forecastHumidity)
                    }

                })
        })

}

// Clear storage option
function clearStorage() {
    localStorage.clear();
    recentBtn.innerHTML = '';
    clearHistoryBtn.innerHTML = '';
}