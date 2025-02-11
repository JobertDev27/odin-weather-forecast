(function main () {
    const statusImg = document.getElementById("status-img");
    const search = document.getElementById("searchbar");
    const searchBtn = document.getElementById("search");
    //===== Labels =====
    const locationLbl = document.getElementById("location");
    const descriptionLbl = document.getElementById("description");
    const temperatureLbl = document.getElementById("temperature");
    const sunriseLbl = document.getElementById("sunrise");
    const sunsetLbl = document.getElementById("sunset");
    const humidLbl = document.getElementById("humidity");
    const visibilityLbl = document.getElementById("visibility");

    const apiKey = "9D32RGWUDJPTGFW2KVFUHW4MG";

    let data = {};

    searchBtn.addEventListener("click", async () => {
        if(search !== null) {
            const location = search.value;
            data = await getWeather(apiKey, location);
            dataHandler(data);
            console.log(data.location);
        }
    })
    
    const dataHandler = data => {
        locationLbl.textContent = data.location;
        descriptionLbl.textContent = data.description;
        temperatureLbl.textContent = `${data.temp}\u00B0 Fahrenheit or ${Math.round(((data.temp - 32) * 5/9) * 10) / 10}\u00B0 Celcius `;
        sunriseLbl.textContent = `The sun rises at ${data.sunrise}`;
        sunsetLbl.textContent = `The sun sets at ${data.sunset}`;
        humidLbl.textContent = `${Math.floor(data.humid)}%`;
        visibilityLbl.textContent = `${data.visibility}km`;
    } 
    
})();

async function getWeather(key, pos) {
    let data = {};
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${pos}?key=${key}`);
        const getData = await response.json();
        console.log(getData)
        data = {
        location : getData.resolvedAddress,
        description : getData.description,
        sunrise : getData.currentConditions.sunrise,
        sunset : getData.currentConditions.sunset,
        temp : getData.currentConditions.temp,
        humid : getData.currentConditions.humidity,
        visibility : getData.currentConditions.visibility
    }
    } catch(error) {
        alert("Invalid location");
    }

    return data;
}
