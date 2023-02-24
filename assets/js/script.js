const apiKey = "22a2a48d05ae9297e09f118308f99d21";
const currentWeatherEndpt = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forecastWeatherEndpt = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

const mainCard = document.querySelector("#main-card-title");
const temp = document.querySelector("#main-card-temp");
const wind = document.querySelector("#main-card-wind");
const humidity = document.querySelector("#main-card-humidity");
const date = document.querySelector(".date");

const userSearch = document.querySelector("#user-input");
// previousCityInput.innerHTML = cityInput.value;
const newCityInput = document.getElementById('previousCityInput');


// Main even that calls the big function that searches for the city and brings back the weather data
// const inputBar = document.getElementById("user-input");
// inputBar.addEventListener('keypress', function (e) {
//     if (e.key === "Enter")

searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    let city = userSearch.value
    getWeatherAPI(city);
    console.log(city, cityArray);
    cityArray.push(city);
    localStorage.setItem("city", JSON.stringify(cityArray));

})

let getCurrentWeather = `${currentWeatherEndpt}${userSearch}'&appid='${apiKey} + &units=imperial`;

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', getUserCity);

let recentBtn = document.getElementById('recent-searches-btns');
recentBtn.addEventListener('click', (event) => choiceClicked(event));

let clearHistoryBtn = document.getElementById('clear-history-btn');
clearHistoryBtn.addEventListener('click', clearStorage);

// A recenet search button click calls this function
function choiceClicked(event) {
    getCoordinates(event.target.innerHTML);
}

// Search button calls this function
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

// A recent search button click will also call this function 
// Use Geocoding API Call and set up a function put it in a variable
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// fetch it to turn the data into an object by using JSON.parse() or with fetch you can just use json()
// Getting lat and lon to put into our regular current and five day weather api calls
function getCoordinates(search) {
    // Clear out the input field
    userSearch.value = '';
    // Add the variable in the parameters to pass it in -- city the user inputs
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Pass the information into the next function
            // Take all the data with you and THEN pull out what you need
            getWeatherAPI(data[0]);
        })
        .catch((error) => {
            console.log(error)
        });
}
// This data should return the lat and log data but not the weather data

// Search button click calls this function at the top
// Be specific to carry only certain parts of the JSON
async function getWeatherApi(location) {
    // Deconstruct to get properties needed
    let { lat, lon } = location;
    let city = location.name;
    let response = await fetch(
        // Five-Day Forecase API url
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    );
    let data = await response.json();
    // Need to solve for current and 5 day
    // Carry the data and split it in a funciton
    forecastWeather(city, data.list);
}

function forecastWeather(city, list) {
    // Empty the recent buttons
    recentBtn.innerHTML = '';
    // Declare the local storage array
    let cityArray = JSON.parse(window.localStorage.getItem('previousCities')) || [];

    // Set to local storage and add to the array
    // If item does NOT exist
    if (!cityArray.includes(city)) {
        // Add (push) into the array
        cityArray.push(city);
        // When sending to local storage, must stringify first
        window.localStorage.setItem('previousCities', JSON.stringify(cityArray));
    
        // create the recent buttons
        for (let index = 0; index < cityArray.length; index++) 
            recentBtn.innerHTML += `<button class=:"">${cityArray[index]}</button>`;
    } else {
        for (let index = 0; index < cityArray.length; index++) {
            let recentBtn = document.getElementById('recent-searches-btns');

            recentBtn.innerHTML += `<button class="">${cityArray[index]}</button>`;
        }
    };
}

    // Create clear history buttton
    clearHistoryBtn.innerHTML = `<button class="d-grid pt-4 pb-5 btn btn-outline-secondary">Clear Search History</button>`;

    

// let city = "";
// const searchList = document.querySelector("#results-div");
// var cityArray = JSON.parse(localStorage.getItem("city")) || [];


// create a function that uses a loop to create buttons using the city names from cityArray 
// for each, document.createElement, .textContent, append
// add event listener inside the same for each loop



// 1st API call is to get the CURRENT weather data for the CURRENT day for a specific city 
// Added the parameters for unit:imperial so that the temperature would return back in farenheit andnot kelvin
function getWeatherAPI(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=` + apiKey + `&units=imperial`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            // Using the JavaScript DateConstructor instaed of moment.js or day.js
            // The API brings back the current date as a day object (labeled dt in the API response data);
            // Example: dt: 1610685149 is the formatting of the current date this API call gives us
            // So we have to convert that to a string
            //  ** see notes .md file to see how it came about; for now - it boils down to this:  var day = new Date(data.dt * 1000);
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

            // The 2nd API call is to get the weather FORECAST data for the next five days for a specific city 
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