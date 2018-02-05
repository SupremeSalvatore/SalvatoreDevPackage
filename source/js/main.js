// Start WOW.js animations

new WOW().init();

// Colapse Navbar on click

$('.navbar-nav>li>a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  });


// Random Quote Generator

const quote = document.getElementById("quote");
const author = document.getElementById("author");

const url = "https://supremesalvatore.github.io/JSON-Examples/quotes.json";

function getData() {
    let data = new XMLHttpRequest();
    data.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let quotes = JSON.parse(this.responseText);
            let number = Math.floor(Math.random() * quotes.length);
            //For short quotes etc
            //  for (let i=0;i<quotes[number].quoteText.length;i++){
            //     if (quotes[i].quoteText.split(" ").length<10){
            //         quote.innerHTML=quotes[i].quoteText;
            //         author.innerHTML=quotes[i].quoteAuthor;
            //      }
            //  }
            quote.innerHTML = quotes[number].quoteText;
            author.innerHTML = quotes[number].quoteAuthor;
            quote.classList.add("quoteAni", "fadeInLeft");
            author.classList.add("authorAni", "fadeInRight");
            var quotesAni = new WOW({
                boxClass: 'quoteAni',
                animateClass: 'animated'
            });
            quotesAni.init();
            var authorAni = new WOW({
                boxClass: 'authorAni',
                animateClass: 'animated'
            });
            authorAni.init();
        } else {

        }
    }
    data.open("GET", url, true);
    data.send();
}
getData();
setInterval(getData, 9000);

//Weather in you city APi

let apiKey = "2909495c6e7a563e950bfcd58f577085";


let temp = document.getElementById('temperature');
let loc = document.getElementById('location');
let icon = document.getElementById('icon');
let humid = document.getElementById('humidity');
let wspeed = document.getElementById('wspeed');
let pressure=document.getElementById('pressure');


window.onload = function () {

      if (navigator.geolocation) {
            let myPosition = function (position) {
                  updateByGeo(position.coords.latitude, position.coords.longitude);
            }
            navigator.geolocation.getCurrentPosition(myPosition);
      }
}

function updateByGeo(lat, lon) {
      var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?" +
            "lat=" + lat +
            "&lon=" + lon +
            "&APPID=" + apiKey;
      sendRequest(url);
}

function sendRequest(url) {
      let myRequest = new XMLHttpRequest();
      myRequest.open("GET", url, true);
      myRequest.onload = function () {
            if (myRequest.status >= 200 && myRequest.status < 400) {
                  let myData = JSON.parse(myRequest.responseText);
                  let weather = {};
                  weather.location = myData.name;
                  weather.tempC = K2C(myData.main.temp);
                  weather.tempF = K2F(myData.main.temp);
                  weather.icon = myData.weather[0].icon;
                  weather.humid = myData.main.humidity;
                  weather.wspeed=myData.wind.speed;
                  weather.pressure=myData.main.pressure;
                  update(weather);
            }
      }

      myRequest.send();
}


function update(weather) {
      temp.textContent += "Temperature: " + weather.tempC + "° | " + weather.tempF + " F";
      loc.textContent = weather.location;
      icon.src = "icons/weather/" + weather.icon + ".svg";
      humid.textContent += "Humidity: " + weather.humid + " %";
      wspeed.textContent += "Wind speed is " + weather.wspeed + " m/s";
      pressure.textContent +="Pressure is " + weather.pressure+ " mbar";
}

function K2C(k) {
      return Math.round(k - 273.15);
}

function K2F(k) {
      return Math.round(k * (9 / 5) - 459.67);
}



