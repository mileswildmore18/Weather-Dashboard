//Create an API Key
//Refer to the website the API key was founded
//Create a search bar
let searchList = JSON.parse(localStorage.getItem("searches"));
let nextSearch = JSON.parse(localStorage.getItem("new-search"));
const  apiKey = "6e186993d5c7985aedd789da8065fa4d";
const urlWeb = "https://api.openweathermap.org"
const cityCardTemplate = document.querySelector("[data-city-template]");
const cityCardContainer = document.querySelector("[data-city-cards-container]");
const searchInput = document.querySelector("[data-search]");
const searchBarInput = document.querySelector("#search");
const searchCity = document.querySelector("city");

let cities = [];
//Add variable to the search bar
function search() {


    if ()
})
//Search results for city or city not found


    



function fetch(urlWeb);
    .then (res => res.json())
    .then(data => {
        city = data.map(city => {
        const card = cityCardTemplate.textContent.cloneNode(true).children[0]
        const body = card.querySelector("[data-body]")
        body.textContent = city.name
       cityCardContainer.append(card)
       return {city: city.name, element: card }
       }) 
})
}
//Make the search bar activate on click and provide information if found or not.
//Store the information that was founded into the localStorage.
//L
//Create a search bar for a city, zip code or country
