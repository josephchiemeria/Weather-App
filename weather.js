let apiKey = "0e5c1c441520dfc3a7c0219d4cefa732";
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let clearBtn = document.getElementById("clearbtn");
let place = document.getElementById("place");
let temp = document.getElementById("temp");
let icon =  document.getElementById("icon");
let para =  document.getElementById("para");
let hum =  document.getElementById("hum");
let win =  document.getElementById("win");
let fee =  document.getElementById("fee");
let days = document.querySelectorAll(".day");
let dayTemp = document.querySelectorAll(".day-temp");
let dayIcon = document.querySelectorAll(".day-icon");
let hours = document.querySelectorAll(".hour");
let hourTemp = document.querySelectorAll(".hour-temp");
let hourIcon = document.querySelectorAll(".hour-icon");


tempUnit = localStorage.getItem("tempUnit") || "metric";
windUnit = localStorage.getItem("windUnit") || "m/s";
theme = localStorage.getItem("theme") || "light";
language = localStorage.getItem("language") || "en";


let h4 = document.querySelectorAll("h4");

if (language === "en") {
    h4[0].textContent = "Feels Like";
    h4[1].textContent = "Humidity";
    h4[2].textContent = "Wind Speed";
}

else if (language === "fr") {
    h4[0].textContent = "Ressenti";
    h4[1].textContent = "Humidité";
    h4[2].textContent = "Vitesse du vent";
}

else if (language === "es") {
    h4[0].textContent = "Sensación térmica";
    h4[1].textContent = "Humedad";
    h4[2].textContent = "Velocidad del viento";
}

else if (language === "de") {
    h4[0].textContent = "Gefühlt";
    h4[1].textContent = "Luftfeuchtigkeit";
    h4[2].textContent = "Windgeschwindigkeit";
}

else if (language === "it") {
    h4[0].textContent = "Percepita";
    h4[1].textContent = "Umidità";
    h4[2].textContent = "Velocità del vento";
}

else if (language === "pt") {
    h4[0].textContent = "Sensação térmica";
    h4[1].textContent = "Umidade";
    h4[2].textContent = "Velocidade do vento";
}

else if (language === "ar") {
    h4[0].textContent = "المحسوسة";
    h4[1].textContent = "الرطوبة";
    h4[2].textContent = "سرعة الرياح";
}



function getTemp(){
    if(tempUnit === "metric") {
        return "°C"
    }

    if(tempUnit === "imperial"){
        return "°F"
    }
}

function getWind(speed){
        if(tempUnit === "imperial"){
            if(windUnit === "km/h") {
                return Math.round(speed * 1.60934) + " km/h";
            }
            return Math.round(speed * 0.44704) + " m/s";
        }

        if(windUnit === "km/h"){
            return Math.round(speed * 3.6) = " km/h"
        }
        return Math.round(speed) + " m/s";
}



    if(theme === "dark") {
        document.body.classList.add("dark")
    }

    else{
        document.body.classList.remove("dark") 
    }



    async function getWeather(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?units=${tempUnit}&appid=${apiKey}&q=${city}&lang=${language}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        place.innerHTML = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = Math.round(data.main.temp) +  getTemp();
        para.innerHTML = data.weather[0].description;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        win.innerHTML = getWind(data.wind.speed);
        hum.innerHTML = data.main.humidity + "%";
        fee.innerHTML = Math.round(data.main.feels_like) + getTemp();

        input.value = "";
    }
     

     async function forWeather(city) {
        let url = `https://api.openweathermap.org/data/2.5/forecast?units=${tempUnit}&appid=${apiKey}&q=${city}&lang=${language}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        let dailyForecast = [];
        for(let i = 0; i < data.list.length; i+=8 ){
            dailyForecast.push(data.list[i]);
        }
        dailyForecast.forEach((day, index)=>{
         let newDay = new Date(day.dt * 1000)
         let dayName = newDay.toLocaleDateString("en",{
            weekday:"short"
         })
         
         days[index].innerHTML = dayName;
         dayTemp[index].innerHTML = Math.round(day.main.temp) + getTemp();
         let dIcon = day.weather[0].icon;
         dayIcon[index].src = `https://openweathermap.org/img/wn/${dIcon}@2x.png`;
        })

        let hourlyForecast = [];
        for(let i =0; i < 8; i++){
            hourlyForecast.push(data.list[i])
        }
        hourlyForecast.forEach((hour, index)=>{
            let newHour = new Date (hour.dt_txt);
            let period = newHour.getHours();
            let time;
            if(period === 0){
                time = "12AM";
            }

            else if (period === 12) {
                time = "12PM"
            }

            else if (period < 12){
               time = period + "AM"
            }

            else {
                time = (period - 12) + "PM" 
            }

            hours[index].innerHTML = time;
            hourTemp[index].innerHTML = Math.round(hour.main.temp) + getTemp();
            let hIcon = hour.weather[0].icon;
            hourIcon[index].src = `https://openweathermap.org/img/wn/${hIcon}@2x.png`;
        })
     }

     input.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
          let city = input.value.trim();
        if(!city){
            return;
        }
         getWeather(city)
         forWeather(city)
    }

    if(input.value !== ""){
        clearBtn.style.display = "block";
    }

    else{
        clearBtn.style.display = "none"; 
    }
     })

     clearBtn.addEventListener("click",()=>{
        input.value = "";
         clearBtn.style.display = "none"; 
        input.focus();
     })

    btn.addEventListener("click",()=>{
        let city = input.value.trim();
        if(!city){
            return;
        }
         getWeather(city)
         forWeather(city)
    })
    let defaultCity = "Lagos, NG";
     getWeather(defaultCity)
     forWeather(defaultCity)
