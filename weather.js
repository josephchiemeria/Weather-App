let apiKey = "0e5c1c441520dfc3a7c0219d4cefa732";
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let clearBtn = document.getElementById("clearbtn");
let place = document.getElementById("place");
let temp = document.getElementById("temp");
let icon =  document.getElementById("icon");
let para =  document.getElementById("para");
let hum =  document.querySelectorAll(".hum");
let win =  document.getElementById("win");
let fee =  document.getElementById("fee");
let pre =  document.getElementById("pre");
let vis =  document.getElementById("vis");
let days = document.querySelectorAll(".day");
let dayTemp = document.querySelectorAll(".day-temp");
let dayPara = document.querySelectorAll(".day-para");
let dayIcon = document.querySelectorAll(".day-icon");
let hours = document.querySelectorAll(".hour");
let hourTemp = document.querySelectorAll(".hour-temp");
let hourIcon = document.querySelectorAll(".hour-icon");
let cha =  document.getElementById("cha");
let rise =  document.getElementById("rise");
let set =  document.getElementById("set");


tempUnit = localStorage.getItem("tempUnit") || "metric";
windUnit = localStorage.getItem("windUnit") || "m/s";
theme = localStorage.getItem("theme") || "light";
language = localStorage.getItem("language") || "en";


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
        hum.forEach((item)=>{
            item.innerHTML = data.main.humidity + "%"; 
        })
        let visKM = data.visibility / 1000;
        vis.innerHTML = `${visKM} km`;
        pre.innerHTML = data.main.pressure + " hPa";
        fee.innerHTML = Math.round(data.main.feels_like) + getTemp();
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunriseTime = sunrise.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
        });
        rise.innerHTML = sunriseTime;


        const sunset = new Date(data.sys.sunset * 1000);
        const sunsetTime = sunset.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
        });
        set.innerHTML = sunsetTime;



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
         dayPara[index].innerHTML = day.weather[0].description;
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

       let chance = data.list[0].pop * 100;
       cha.innerHTML = Math.round(chance) + "%";
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


     let span = document.querySelector(".span")
     let link = document.querySelector(".links")

     span.addEventListener("click",(e)=>{
        e.stopPropagation();
       if(link.style.visibility === "visible"){
        link.style.visibility =  "hidden";
       }

       else{
          link.style.visibility = "visible";
       }
       
     })

    