//Create an API Key
//Refer to the website the API key was founded
//Create a search bar
let searchList = JSON.parse(localStorage.getItem("searches"));
let nextSearch = JSON.parse(localStorage.getItem("new-search"));
const APIKey = "6e186993d5c7985aedd789da8065fa4d";
let city;
let urlWeb = "https://api.openweathermap.org/"
const cityCardTemplate = document.querySelector("[data-city-template]");
const cityCardContainer = document.querySelector("[data-city-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchBarInput = document.querySelector("#search");
const searchCity = document.querySelector("city");


//Add variable to the search bar
function search() {
    let input = document.getElementById("search").value;
    let resultsDiv = document.getElementById("results");
    let myApiKey = "6e186993d5c7985aedd789da8065fa4d"
    let apiUrl = "https://api.openweathermap.org/" + encodeURIComponent(input); + '&apikey=' + myApiKey;

    //Make an API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            //Generate API response
            if(data.results.length > 0) {
                //Display the search results
                resultsDiv.innerHTML = "City found: " + data.results[0].name; //In case API returns city names         
            } else {
                //Display not found message
                resultsDiv.innerHTML = "City not found";
            }//Search results for city or city not found
        })
        .catch(error => {
            console.error('Error fetching data', error);
            resultsDiv.innerHTML = "An error occured while fetching data";
        });
}




    




//Make the search bar activate on click and provide information if found or not.
//Store the information that was founded into the localStorage.
//L
//Create a search bar for a city, zip code or country
