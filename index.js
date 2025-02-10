(async function main () {
    const apiKey = "9D32RGWUDJPTGFW2KVFUHW4MG";
    let location = "iloilo";
     let data = {};
     data = await getWeather(apiKey, location);
    console.log("fetching done..");
    console.log(data.location);
})();

async function getWeather(key, pos) {
    let data = {};
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${pos}?key=${key}`);
        const getData = await response.json();

        data = {
        location : getData.resolvedAddress,
        description : getData.description,
        icon : getData.currentConditions.icon,
        sunrise : getData.currentConditions.sunrise,
        sunset : getData.currentConditions.sunset,
        temp : getData.currentConditions.temp,
        humid : getData.currentConditions.humidity,
        visibility : getData.currentConditions.visibility
    }
    } catch(error) {
        console.log(error);
    }

    return data;
}