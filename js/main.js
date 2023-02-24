let data=[];
let searchEle=document.querySelector("#home .search input");
let findEle=document.querySelector("#home .search .find");

//today elements
let todayHead=document.querySelector("#home .today .head")
let todayCity=document.querySelector("#home .today .content .city")
let todayTemp=document.querySelector("#home .today .content .temp")
let todayStatus=document.querySelector("#home .today .status")

//tomorrow elements
let tomorrowHead=document.querySelector("#home .tomorrow .head")
let tomorrowIcon=document.querySelector("#home .tomorrow .content .icon")
let tomorrowTempGreat=document.querySelector("#home .tomorrow .content .great")
let tomorrowTempSmall=document.querySelector("#home .tomorrow .content .small")
let tomorrowStatus=document.querySelector("#home .tomorrow .status")

//After tomorrow elements
let afterTomHead=document.querySelector("#home .after-tom .head")
let afterTomIcon=document.querySelector("#home .after-tom .content .icon")
let afterTomTempGreat=document.querySelector("#home .after-tom .content .great")
let afterTomTempSmall=document.querySelector("#home .after-tom .content .small")
let afterTomStatus=document.querySelector("#home .after-tom .status")

// ============= Date Object ================
const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

// getting Date 
function gettingDate(d){
    var objDate= new Date(d)
    const today=weekday[objDate.getDay()]
    const month=monthName[objDate.getMonth()]
    const dayNum=objDate.getDate();
    return [today , month ,dayNum]
}

// ===== fetching data from weather api =====
async function Weather(city){

    const req=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8bb0cc5e4d3840e3a4495400232402&q=${city}&days=3` );
    
    data=await req.json();
    console.log(data,city)
    return data;
}

async function weatherCalling(city){
    let dataObje= await Weather(city);
    let todayDate=gettingDate(dataObje.forecast.forecastday[0].date)
    let tomorrowDate =gettingDate(dataObje.forecast.forecastday[1].date)
    let afterTomDate =gettingDate(dataObje.forecast.forecastday[2].date)
    console.log(todayDate, tomorrowDate, afterTomDate);

    // adding today data
    todayHead.innerHTML = `${todayDate[0]} <span class="ms-auto">${todayDate[2]} ${todayDate[1]}</span>`;
    todayCity.innerHTML = `${dataObje.location.name}`;
    todayTemp.innerHTML = `<span>${Math.trunc(dataObje.current.temp_c)}&deg;C</span> 
        <img src="${dataObje.current.condition.icon}" alt="icon condition"  />`;
    todayStatus.innerHTML = `${dataObje.current.condition.text}`;

    // adding tomorrow data
    tomorrowHead.innerHTML = `${tomorrowDate[0]} `;
    tomorrowIcon.innerHTML= `<img src="${dataObje.forecast.forecastday[1].day.condition.icon}" alt="icon condition"  />;`
    tomorrowTempGreat.innerHTML = `${dataObje.forecast.forecastday[1].day.maxtemp_c}&deg;C`
    tomorrowTempSmall.innerHTML = `${dataObje.forecast.forecastday[1].day.mintemp_c}&deg;C`
    tomorrowStatus.innerHTML = `${dataObje.forecast.forecastday[1].day.condition.text}`

     // adding after-tomorrow data
     afterTomHead.innerHTML = `${afterTomDate[0]}`;
     afterTomIcon.innerHTML = `<img src="${dataObje.forecast.forecastday[2].day.condition.icon}" alt="condition" />`;
     afterTomTempGreat.innerHTML = `${dataObje.forecast.forecastday[2].day.maxtemp_c}&deg;C`
     afterTomTempSmall.innerHTML = `${dataObje.forecast.forecastday[2].day.mintemp_c}&deg;C`
     afterTomStatus.innerHTML = `${dataObje.forecast.forecastday[2].day.condition.text}`
}
weatherCalling("london")

searchEle.addEventListener("input", function () {
    console.log(searchEle.value);
    weatherCalling(searchEle.value);
  });