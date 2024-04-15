//Create an API Key
//Refer to the website the API key was founded
//Create a search bar
let searchList = JSON.parse(localStorage.getItem("#results"));
let nextSearch = JSON.parse(localStorage.getItem("new-search"));
let apiKey = "6e186993d5c7985aedd789da8065fa4d";
let city;
let weatherElement = document.getElementById('currentWeather')
const searchInput = document.getElementById('search');
let forecastContainer = document.getElementById('forecastContainer')
let pastCities = JSON.parse(localStorage.getItem('cities')) || [];
let cityHistory = document.getElementById('searchHistory');
//Provide the function for the search bar when the name of the city is typed in.
const formSubmitHandler = function (event) {
    const city = searchInput.value

    if (city) {
        search(city);

        searchInput.value = ''
    } else {
        //Alert in case nothing is put in when the search button is clicked.
        alert('Please enter city')
    }
};




//Add variable to the search bar, call API and retrieve data

function search(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //fetch api
    fetch(apiUrl)
        .then(function (response) {
            //check to see that the city was found
            if (response.ok) {
                clearDiv();
                pastCitiesArrayHandler(city);
                localStorage.setItem('cities', (JSON.stringify(pastCities)))
                searchHistory()
                //parse the data
                response.json()
                    .then(function (data) {
                        console.log(data)
                        displayWeather(data)
                        get5DayForecast(city)
                    })
            } else {
                //send error alert if response failed
                alert(`Error: ${response.status.statusText}`);
            }
        })
}
//Display the weather forecast and gather information about the city

const displayWeather = function (data) {
    const cityNameEl = document.createElement('h2');
    const cityTempEl = document.createElement('h3');
    const cityWindEl = document.createElement('h3');
    const cityHumidityEl = document.createElement('h3');
    const date = dayjs().format('MM/DD/YYYY');
    console.log(data)
    const iconPath = data.weather[0].icon;
    const icon = weatherIcon(iconPath);

    cityNameEl.textContent = `${data.name} (${date}) ${icon} `;
    const cityTemp = (data.main.temp - 273.15) * (9 / 5) + 32;
    cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F `;
    cityWindEl.textContent = `Wind: ${data.wind.speed} MPH `;
    cityHumidityEl.textContent = `Humidity ${data.main.humidity} % `;

    weatherElement.appendChild(cityNameEl);
    weatherElement.appendChild(cityTempEl);
    weatherElement.appendChild(cityWindEl);
    weatherElement.appendChild(cityHumidityEl);

}
//Fetching response from the website while searching from the targeted website
const forecastSearch = function (city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(queryURL)
        .then(function (response) {
            //check for response if it returned successfully
            if (response.ok) {
                //parse the data
                response.json()
                    .then(function (data) {
                        console.log(data)
                        //sends the data to the display function
                        displayForecast(data)
                    })
            } else {
                //send an error alert if response has failed
                alert(`Error: ${response.statusText}`);
            }
        })

}
//Show the information of the forecast in the specific city
function displayForecast(data) {
    for (let i = 0; i <= 4; i++) {
        const forecastCard = document.createElement('div')
        forecastCard.setAttribute('id', 'card')

        const cityDateEl = document.createElement('h4')
        const iconEl = document.createElement('h5')
        const cityTempEl = document.createElement('h5')
        const cityWindEl = document.createElement('h5')
        const cityHumidityEl = document.createElement('h5')
        //display the date
        const date = forecastDate(i)
        console.log(data)
        const iconPath = data.list[0].weather[0].icon;
        const icon = weatherIcon(iconPath)
        //Adding the temperature, wind speed and humidity from the searched city
        cityDateEl.textContent = `${date}`;
        iconEl.textContent = icon;
        const cityTemp = (data.list[i].main.temp - 273.15) * (9 / 5) + 32;
        cityTempEl.textContent = ` Temp: ${cityTemp.toFixed(2)} F `;
        cityWindEl.textContent = ` Wind: ${data.list[i].wind.speed} MPH `;
        cityHumidityEl.textContent = ` Humidity ${data.list[i].main.humidity}% `;
        //Adding information into a list
        forecastCard.appendChild(cityDateEl);
        forecastCard.appendChild(iconEl);
        forecastCard.appendChild(cityTempEl);
        forecastCard.appendChild(cityWindEl);
        forecastCard.appendChild(cityHumidityEl);
        forecastContainer.appendChild(forecastCard);
    }
}
//Provides today's date 
const forecastDate = function (i) {
    let today = dayjs();
    let forecastDay = today.add(i + 1, 'day').format('MM/DD/YYYY');
    return forecastDay;
}
//Providing specific weather icons for the weather condition in the specific city
const weatherIcon = function (weatherIcon) {

    if (weatherIcon === '03d' || weatherIcon === '03n' || weatherIcon === '04d' || weatherIcon === '04n') {
        return '⛅'
    } else if (weatherIcon === '01d' || weatherIcon === '02d') {
        return '🌅'
    } else if (weatherIcon === '01n' || weatherIcon === '02n') {
        return '🌃'
    } else if (weatherIcon === '10d' || weatherIcon === '10n' || weatherIcon === '09d' || weatherIcon === '09n') {
        return '☔'
    } else if (weatherIcon === '11n' || weatherIcon === '11d') {
        return '🌧'
    } else if (weatherIcon === '13n' || weatherIcon === '13d') {
        return '🌡'
    } else if (weatherIcon === '50n' || weatherIcon === '50d') {
        return '❆'
    } else {
        return '?'
    }
}
//Adding 5 days of the forecast on a specific city searched
function get5DayForecast(city) {
    let apiUrls = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(apiUrls)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                        displayForecast(data)
                    })
            } else {
                //send error alert if response failed
                alert(`Error: ${response.status.statusText}`);
            }
        });
}

//Adding past cities from previous searches
const pastCitiesArrayHandler = function (city) {
    if (pastCities.includes(city)) {
        return
    } else {
        pastCities.push(city)
    }
}
//Clears up the history in the 5 day forecast
const clearDiv = function () {
    weatherElement.innerHTML = ''
    forecastContainer.innerHTML = ''
}
// Adding searched cities into the history
const searchHistory = function () {
    console.log('History')
    cityHistory.innerHTML = '';
    for (const city of pastCities) {
        historyCard = document.createElement('button')
        historyCard.textContent = city
        historyCard.setAttribute('id', 'searchCard')
        historyCard.setAttribute('data-content', city)
        cityHistory.appendChild(historyCard)
    }
}
//Calls the history of past searched cities
searchHistory();
