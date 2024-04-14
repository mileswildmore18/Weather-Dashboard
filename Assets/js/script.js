//Create an API Key
//Refer to the website the API key was founded
//Create a search bar
let searchList = JSON.parse(localStorage.getItem("#results"));
let nextSearch = JSON.parse(localStorage.getItem("new-search"));
let apiKey = "6e186993d5c7985aedd789da8065fa4d";
let city;

const searchInput = document.getElementById('search');

const formSubmitHandler = function (event) {
    const city = searchInput.value

    if (city) {
        search(city);

        searchInput.value = ''
    } else {
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
            // clearDiv();
            // subtitleDisplay();
            // pastCitiesArrayHandler(city);
            // localStorage.setItem('cities',(JSON.stringify(pastCities)))
            // searchList();
            //parse the data
            response.json()
                .then(function (data) {
                    console.log(data)
                    get5DayForecast(city)
                    //send the data to the display function
                    //displayWeather(data)
                    //forecastSearch(city)
                })
        } else {
            //send error alert if response failed
            alert(`Error: ${response.status.statusText}`);
        }
    })
}
    const displayWeather = function (data) {
        const cityNameEl = document.createElement('h2');
        const cityTempEl = document.createElement('h3');
        const cityWindEl = document.createElement('h3');
        const cityHumidityEl = document.createElement('h3');
        const date = dayjs().format('MM/DD/YYYY');
        const icon = weatherIcon(data);

        cityNameEl.textContent = `${data.name} ${data} ${icon}`;
        const cityTemp = (data.main.temp - 273.15) * (9 / 5) + 32;
        cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F`;
        cityWindEl.textContent = `Wind: ${data.wind.speed} MPH`;
        cityHumidityEl.textContent = `Humidity ${data.main.humidity} %`;

        weatherElement.appendChild(cityNameEl);
        weatherElement.appendChild(cityTempEl);
        weatherElement.appendChild(cityWindEl);
        weatherElement.appendChild(cityHumidityEl);

    const forecastSearch = function(city) {
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        fetch(queryURL)
        .then(function (response) {
            //check for response if it returned successfully
        })
    }
        
}
function displayForecast (data){
    for (let i = 1; 1 <= 5; i++) {
        const forecastCard = document.createElement ('div')
        forecastCard.setAttribute('id', 'card')
        
        const cityDateEl = document.createElement('h4')
        const iconEl = document.createElement ('h5')
        const cityTempEl = document.createElement ('h5')
        const cityWindEl = document.createElement ('h5')
        const cityHumidityEl = document.createElement ('h5')

        const date = forecastDate(i)
        const icon = forecastIcon(date, i)

        cityDateEl.textcontent = `${date}`;
        iconEl.textContent = icon;
        const cityTemp = (data.list[i].main.temp - 273.15) * (9 / 5) + 32;
        cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F`;
        cityWindEl.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
        cityHumidityEl.textContent = `Humidity ${data.list[i].main.humidity}%`;

        forecastCard.appendChild(cityDateEl);
        forecastCard.appendChild(iconEl);
        forecastCard.appendChild(cityTempEl);
        forecastCard.appendChild(cityWindEl);
        forecastCard.appendChild(cityHumidityEl);
        forecastElement.appendChild(forecastCard);
    }
}

const forecastDate = function (i) {
    let today = dayjs();
    let forecastDay = today.add(i, 'day').format('MM/DD/YYYY');
    return forecastDay;
}





function get5DayForecast(city) {
    let apiUrls = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(apiUrls)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data)})
                
                 } else {
                //send error alert if response failed
                alert(`Error: ${response.status.statusText}`);
            }
        });
    }
            // Extract relevant weather information for the next 5 days
//             const forecasts = data.list.filter((forecast, index) => index % 8 === 0); // Get forecasts for every 8th element (5-day forecast)

//             // Update HTML elements with weather information
//             const forecastContainer = document.getElementById('forecastContainer');
//             forecasts.forEach(forecast => {
//                 const date = new Date(forecast.dt * 1000); // Convert timestamp to date
//                 const temperature = Math.round(forecast.main.temp - 273.15); // Convert from Kelvin to Celsius
//                 const weatherDescription = forecast.weather[0].description;

//                 // Create HTML elements to display forecast information
//                 const forecastElement = document.createElement('div');
//                 forecastElement.classList.add('forecast');
//                 forecastElement.innerHTML = `
//                     <p>Date: ${date.toDateString()}</p>
//                     <p>Temperature: ${temperature}°C</p>
//                     <p>Weather: ${weatherDescription}</p>
//                 `;
//                 forecastContainer.appendChild(forecastElement);
                
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching weather data:', error);
//             // Display error message on the website
//             document.getElementById('weatherForecast').innerText = 'Error fetching weather data. Please try again later.';
//         });
//         //Call the get5DayForecast function to fetch and display the 5-day weather forecast when the page loads
// window.onload = get5DayForecast;
// }

const clearDiv = function () {
    weatherElement.innerHTML = ''
    forecastElement.innerHTML = ''
}
    
const searchHistory = function() {
    searchHistoryElement.innerHTML = ''
}



//Make the search bar activate on click and provide information if found or not.
//Store the information that was founded into the localStorage.
//L
//Create a search bar for a city, zip code or country