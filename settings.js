let tempUnit = document.getElementById("temp");
let windUnit = document.getElementById("wind");
let theme = document.getElementById("theme");
let language = document.getElementById("language");
let saveBtn = document.getElementById("saveBtn");


tempUnit.value = localStorage.getItem("tempUnit") || "metric";
windUnit.value = localStorage.getItem("windUnit") || "m/s";
theme.value = localStorage.getItem("theme") || "light";
language.value = localStorage.getItem("language") || "en";

function applyTheme(){
    if(theme.value === "dark") {
        document.body.classList.add("dark")
    }

    else{
        document.body.classList.remove("dark") 
    }
}

applyTheme()


    saveBtn.addEventListener("click",()=>{
        localStorage.setItem("tempUnit",tempUnit.value)
        localStorage.setItem("windUnit",windUnit.value)
        localStorage.setItem("theme",theme.value)
        localStorage.setItem("language",language.value)

        applyTheme();
        alert("saved successfully");
    })


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

     document.addEventListener("click",()=>{
        link.style.visibility = "hidden";
     })