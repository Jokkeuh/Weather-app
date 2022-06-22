



/*async function getImg() {

    try{
          
            const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=cHSU0BnzkfhNz4NBoF7TkA5gj8DiZ0jl&s=${country}`, {mode: "cors"})
            
    }catch(err){
        console.log(err)
    }
}
*/



const container = document.getElementById('container')
const outputField = document.getElementById("outputContainer")
const tempOut = document.getElementById("curTemp")
const maxTempOut = document.getElementById("maxTempOutput")
const minTempOut = document.getElementById("minTempOutput")
const countryOut = document.getElementById("countryOutput")
const cityOut = document.getElementById("cityOutput")
const weatherOut = document.getElementById("weatherOutput")

container.addEventListener("submit", e =>{
    e.preventDefault()
    getLocation()
    
} )





async function getLocation(){
    try{
        const country = document.getElementById("inputCountry")
        const city = document.getElementById("inputCity")

        CoValue = await country.value
        CiValue = await city.value
        getWeatherData(CoValue, CiValue)

       
    }catch(err){
        console.log(err.message)
        console.log("getLocation")
    }
    
   
}

const loader = document.querySelector("#loader")
loader.style.display ="none"

async function getWeatherData(country, city) {

    try{  
        
            loader.style.display ="flex"

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=adcc61620370c99069dcdb872fa27382`, {mode: "cors"})
            const weatherData = await response.json();

            loader.style.display ="none"
            
            const curTempMax =  Math.floor(((weatherData.main.temp_max) - 273.15)*100)/100
            const curTempMin =  Math.floor(((weatherData.main.temp_min) - 273.15)*100)/100
            const curTemp = Math.floor(((weatherData.main.temp) - 273.15)*100)/100
            const curWeather = weatherData.weather[0].description
            const curCountry = weatherData.sys.country
            const curCity = weatherData.name

            const responseGIF = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=cHSU0BnzkfhNz4NBoF7TkA5gj8DiZ0jl&s=${curWeather}`, {mode: "cors"})
            const gif = document.getElementById("gif")
            const imgData = await responseGIF.json();
            gif.src = imgData.data.images.original.url;
            
            


            tempOut.innerHTML = `current temperature :${curTemp}°c`;
            maxTempOut.innerHTML = `highest temperature today :${curTempMax}°c`;
            minTempOut.innerHTML = `lowest temperature today :${curTempMin}°c`;
            weatherOut.innerHTML = `clouds :${curWeather}`;
            countryOut.innerHTML = `Country :${ curCountry}`;
            cityOut.innerHTML = `City :${ curCity}`;
            return {weatherData}
       
    
    }catch(err){

        console.log(err.message)
        
    }



    
}



