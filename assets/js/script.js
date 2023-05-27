const addBtn = document.querySelector("#addBtn");
const searchArea = document.querySelector("#searchArea");
const removeBtn = document.querySelector("#removeBtn");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const countryArea = document.querySelector("#countryArea");
const currentDate = document.querySelector("#date");
const fBtn = document.querySelector(".f-contain");
const cBtn = document.querySelector(".c-contain");
const circle = document.querySelector(".circle")

addBtn.addEventListener("click", showInput);
removeBtn.addEventListener("click", hideInput);
searchBtn.addEventListener("click", getWeatherData);
searchInput.addEventListener("keyup", enterSearch);
fBtn.addEventListener("click", changeTempF);
cBtn.addEventListener("click", changeTempC)

function showInput() {
    $("#searchArea").slideDown()
    $("#addBtn").hide(100)
    $("#removeBtn").show(100)
}

function hideInput() {
    $("#searchArea").slideUp()
    $("#addBtn").show(100)
    $("#removeBtn").hide(100)
}

function enterSearch(e) {
    if (e.keyCode == 13) {
        getWeatherData()
    }
    return
}

function changeTempF() {
    fBtn.style.opacity = "1";
    cBtn.style.opacity = "0.5";
    let cTemp = document.querySelector(".degree").textContent.slice(0, 2)
    let fTemp = Math.floor((cTemp * 9 / 5) + 32)
    let monTemp = document.querySelector("#monTemp").textContent.slice(0, 2)
    let fmonTemp = Math.floor((monTemp * 9 / 5) + 32)
    let tuesTemp = document.querySelector("#tuesTemp").textContent.slice(0, 2)
    let ftuesTemp = Math.floor((tuesTemp * 9 / 5) + 32)
    let wedTemp = document.querySelector("#wedTemp").textContent.slice(0, 2)
    let fwedTemp = Math.floor((wedTemp * 9 / 5) + 32)
    let thurTemp = document.querySelector("#thurTemp").textContent.slice(0, 2)
    let fthurTemp = Math.floor((thurTemp * 9 / 5) + 32)
    let friTemp = document.querySelector("#friTemp").textContent.slice(0, 2)
    let ffriTemp = Math.floor((friTemp * 9 / 5) + 32)
    let satTemp = document.querySelector("#satTemp").textContent.slice(0, 2)
    let fsatTemp = Math.floor((satTemp * 9 / 5) + 32)
    let sunTemp = document.querySelector("#sunTemp").textContent.slice(0, 2)
    let fsunTemp = Math.floor((sunTemp * 9 / 5) + 32)
    document.querySelector(".degree").textContent = fTemp + "°F";
    document.querySelector("#monTemp").textContent = fmonTemp + "°F";
    document.querySelector("#tuesTemp").textContent = ftuesTemp + "°F";
    document.querySelector("#wedTemp").textContent = fwedTemp + "°F";
    document.querySelector("#thurTemp").textContent = fthurTemp + "°F";
    document.querySelector("#friTemp").textContent = ffriTemp + "°F";
    document.querySelector("#satTemp").textContent = fsatTemp + "°F";
    document.querySelector("#sunTemp").textContent = fsunTemp + "°F";

}

function changeTempC() {
    location.reload()
}


window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log("Tarayıcınız konum almayı desteklemiyor.");
    }
}


async function onSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    let userLat = latitude.toFixed(4)
    let userLon = longitude.toFixed(4)

    const datas = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e62e5969fcd7494ebd7233023232405&q=${userLat},${userLon}&days=7&aqi=yes&alerts=yes`);
    const response = await datas.json();

    let { alert, current, forecast, location } = response;

    try {
        countryArea.textContent = `${location["region"]}, ${location["country"]}`;
        $(".degree").html(`${current["temp_c"]}<span class="degreesub"
        style="vertical-align: super;">°C</span>`);

        if (current.condition["icon"]) {
            let imgAddress = current.condition["icon"]
            $("#headImg").attr({ "src": `${imgAddress}` })
        }

        if (location["localtime"]) {
            let dateString = location["localtime"];
            let date = new Date(dateString);
            var day = date.getDate();
            let month = date.toLocaleString('default', { month: 'long' });
            let year = date.getFullYear();
            let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
            let hour = date.getHours();
            let minute = date.getMinutes();
            let ampm = hour >= 12 ? 'PM' : 'AM';
            $("#date").text(`${day}th ${month} ${year}`)
            $(".month").text(`${dayOfWeek} `)
            $(".hour").text(`${hour}:${minute} ${ampm}`)
        }

        $("#wind").text(`${current["wind_kph"]}`);
        $("#humidity").text(`${current["humidity"]}`);
        $("#rain").text(`${current["precip_in"]}`);

        let sunriseArr = forecast.forecastday[0]["astro"]["sunrise"].split("AM")
        let sunriseTime = sunriseArr[0]
        let sunsetArr = forecast.forecastday[0]["astro"]["sunset"].split("PM")
        let sunsetTime = sunsetArr[0]

        $("#sunrise").text(`${sunriseTime}`);
        $("#sunset").text(`${sunsetTime}`);

        $("#humid1").text(`${current["humidity"]}${"%"}`);
        $("#rainy").text(`${current["precip_in"]}${"%"}`);
        $("#wind1").text(`${current["wind_kph"]}`);

        let airQualityCount = `${current["air_quality"]["gb-defra-index"]}`

        switch (airQualityCount) {
            case "0":
                $(".circle").css({ "top": "40px", "left": "6px" })
                $("#airScore").text("0")
                break
            case "1":
                $(".circle").css({ "top": "30px", "left": "8px" })
                $("#airScore").text("1")
                break
            case "2":
                $(".circle").css({ "top": "20px", "left": "13px" })
                $("#airScore").text("2")
                break
            case "3":
                $(".circle").css({ "top": "8px", "left": "24px" })
                $("#airScore").text("3")
                break
            case "4":
                $(".circle").css({ "top": "0", "left": "38px" })
                $("#airScore").text("4")
                break
            case "5":
                $(".circle").css({ "top": "-5px", "left": "60px" })
                $("#airScore").text("5")
                break
            case "6":
                $(".circle").css({ "top": "-5px", "left": "76px" })
                $("#airScore").text("6")
                break
            case "7":
                $(".circle").css({ "top": "0px", "left": "90px" })
                $("#airScore").text("7")
                break
            case "8":
                $(".circle").css({ "top": "10px", "left": "110px" })
                $("#airScore").text("8")
                break
            case "9":
                $(".circle").css({ "top": "22px", "left": "120px" })
                $("#airScore").text("9")
                break
            case "10":
                $(".circle").css({ "top": "36px", "left": "126px" })
                $("#airScore").text("10")
                break
        }

        for (let i = 0; i <= 7; i++) {
            let dateStrings = forecast.forecastday[i]["date"]
            let dates = new Date(dateStrings)
            let days = dates.toLocaleString('default', { weekday: 'long' });
            let temp = Math.floor(forecast.forecastday[i]["day"]["avgtemp_c"]);
            let img = forecast.forecastday[i]["day"]["condition"]["icon"]
            switch (days) {
                case "Monday":
                    $("#monTemp").text(`${temp}°C`);
                    $("#monday").attr({ "src": `${img}` });
                    break;
                case "Tuesday":
                    $("#tuesTemp").text(`${temp}°C`)
                    $("#tuesday").attr({ "src": `${img}` });
                    break
                case "Wednesday":
                    $("#wedTemp").text(`${temp}°C`)
                    $("#wednesday").attr({ "src": `${img}` });
                    break
                case "Thursday":
                    $("#thurTemp").text(`${temp}°C`)
                    $("#thursday").attr({ "src": `${img}` });
                    break
                case "Friday":
                    $("#friTemp").text(`${temp}°C`)
                    $("#friday").attr({ "src": `${img}` });
                    break
                case "Saturday":
                    $("#satTemp").text(`${temp}°C`)
                    $("#saturday").attr({ "src": `${img}` });
                    break
                case "Sunday":
                    $("#sunTemp").text(`${temp}°C`)
                    $("#sunday").attr({ "src": `${img}` });
                    break
            }
            searchInput.value = "";
        }

        searchInput.value = "";
    } catch (error) {
    }




}

function onError(error) {
    console.log("Konum alınamadı: " + error.message);
}



async function getWeatherData() {

    try {
        let searchValue = searchInput.value;

        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e62e5969fcd7494ebd7233023232405&q=${searchValue}&days=7&aqi=yes&alerts=yes
        `);
        const response = await data.json()

        let { alert, current, forecast, location } = response;

        if (typeof current == "undefined" || typeof forecast == "undefined" || typeof location == "undefined") {
            $("#error").fadeIn()
            $("#error").fadeOut(3000)
            searchInput.value = "";
        }


        console.log(current);

        console.log(location);


        countryArea.textContent = `${location["region"]}, ${location["country"]}`;
        $(".degree").html(`${current["temp_c"]}<span class="degreesub"
        style="vertical-align: super;">°C</span>`);

        if (current.condition["icon"]) {
            let imgAddress = current.condition["icon"]

            $("#headImg").attr(`${imgAddress}`)

        }

        if (location["localtime"]) {
            let dateString = location["localtime"];
            let date = new Date(dateString);
            let day = date.getDate();
            let month = date.toLocaleString('default', { month: 'long' });
            let year = date.getFullYear();
            let dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
            let hour = date.getHours();
            let minute = date.getMinutes();
            let ampm = hour >= 12 ? 'PM' : 'AM';
            $("#date").text(`${day}th ${month} ${year}`)
            $(".month").text(`${dayOfWeek} `)
            $(".hour").text(`${hour}:${minute} ${ampm}`)
        }

        $("#wind").text(`${current["wind_kph"]} `);
        $("#humidity").text(`${current["humidity"]}`);
        $("#rain").text(`${current["precip_in"]}`);

        let sunriseArr = forecast.forecastday[0]["astro"]["sunrise"].split("AM")
        let sunriseTime = sunriseArr[0]
        let sunsetArr = forecast.forecastday[0]["astro"]["sunset"].split("PM")
        let sunsetTime = sunsetArr[0]

        $("#sunrise").text(`${sunriseTime}`);
        $("#sunset").text(`${sunsetTime}`);

        $("#humid1").text(`${current["humidity"]}${"%"}`);
        $("#rainy").text(`${current["precip_in"]}${"%"}`);
        $("#wind1").text(`${current["wind_kph"]}`);

        let airQualityCount = `${current["air_quality"]["gb-defra-index"]}`

        switch (airQualityCount) {
            case "0":
                $(".circle").css({ "top": "40px", "left": "6px" })
                $("#airScore").text("0")
                break
            case "1":
                $(".circle").css({ "top": "30px", "left": "8px" })
                $("#airScore").text("1")
                break
            case "2":
                $(".circle").css({ "top": "20px", "left": "13px" })
                $("#airScore").text("2")
                break
            case "3":
                $(".circle").css({ "top": "8px", "left": "24px" })
                $("#airScore").text("3")
                break
            case "4":
                $(".circle").css({ "top": "0", "left": "38px" })
                $("#airScore").text("4")
                break
            case "5":
                $(".circle").css({ "top": "-5px", "left": "60px" })
                $("#airScore").text("5")
                break
            case "6":
                $(".circle").css({ "top": "-5px", "left": "76px" })
                $("#airScore").text("6")
                break
            case "7":
                $(".circle").css({ "top": "0px", "left": "90px" })
                $("#airScore").text("7")
                break
            case "8":
                $(".circle").css({ "top": "10px", "left": "110px" })
                $("#airScore").text("8")
                break
            case "9":
                $(".circle").css({ "top": "22px", "left": "120px" })
                $("#airScore").text("9")
                break
            case "10":
                $(".circle").css({ "top": "36px", "left": "126px" })
                $("#airScore").text("10")
                break
        }

        for (let i = 0; i <= 7; i++) {
            let dateStrings = forecast.forecastday[i]["date"]
            let dates = new Date(dateStrings)
            let days = dates.toLocaleString('default', { weekday: 'long' });
            let temp = Math.floor(forecast.forecastday[i]["day"]["avgtemp_c"]);
            let img = forecast.forecastday[i]["day"]["condition"]["icon"]
            switch (days) {
                case "Monday":
                    $("#monTemp").text(`${temp}°C`);
                    $("#monday").attr({ "src": `${img}` });
                    break;
                case "Tuesday":
                    $("#tuesTemp").text(`${temp}°C`)
                    $("#tuesday").attr({ "src": `${img}` });
                    break
                case "Wednesday":
                    $("#wedTemp").text(`${temp}°C`)
                    $("#wednesday").attr({ "src": `${img}` });
                    break
                case "Thursday":
                    $("#thurTemp").text(`${temp}°C`)
                    $("#thursday").attr({ "src": `${img}` });
                    break
                case "Friday":
                    $("#friTemp").text(`${temp}°C`)
                    $("#friday").attr({ "src": `${img}` });
                    break
                case "Saturday":
                    $("#satTemp").text(`${temp}°C`)
                    $("#saturday").attr({ "src": `${img}` });
                    break
                case "Sunday":
                    $("#sunTemp").text(`${temp}°C`)
                    $("#sunday").attr({ "src": `${img}` });
                    break
            }
            searchInput.value = "";
        }
        searchInput.value = "";
    } catch (err) {
    }

}

$(document).ready(() => {
    let cardIndex = 0;
    const cardCount = $(".bg-weather").length;

    $("#moreBtn").click(() => {
        $(".bg-weather").eq(cardIndex).hide(1000);
        cardIndex = (cardIndex + 1) % cardCount;
        $(".bg-weather").eq(cardIndex).show(1000);
        if (cardIndex === 0) {
            for (let i = 0; i <= cardCount; i++) {
                $(".bg-weather").eq(i).show(1000);
            }

        }
    });
})