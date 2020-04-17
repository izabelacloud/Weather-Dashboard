var userFormEl = document.querySelector("#cityinputform");
var cityInputEl = document.querySelector("#cityinput");
var cityDisplayEl = document.querySelector("#result-container")
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var iconEl = document.querySelector("#icon");

var lon = ""
console.log(lon);

var lat = ""
console.log(lat);







//this function passes the username to the function so that we can filter the results
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    console.log(cityName);

    if (cityName) {
        //to get the cities with the city name
        getWeatherPerCity(cityName);
   
        //to clear the input form field after submit
        cityInputEl.value = "";
    } else {
        alert("Please enter a City")
    }
    console.log(event);
}



//this function gets the response from the API
var getWeatherPerCity = function(city, lon, lat) {
    //format the api url
    // var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Bratislava&appid=813b5c16fd3ec3678dd044ecba8f628a"
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=813b5c16fd3ec3678dd044ecba8f628a";
    var apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=813b5c16fd3ec3678dd044ecba8f628a";
    var uvUrl = "https://http://api.openweathermap.org/data/2.5/uvi?appid=813b5c16fd3ec3678dd044ecba8f628a&lat=" + lat + "&lon=" + lon;



    //make request to the URL
    fetch(apiUrl)
    .then(function(response) {
        //add if else condition for ERROR HANDLING
        //if request was successful 
        if (response.ok) {
            response.json().then(function(jsonResponse) {
                console.log(jsonResponse);
                //this was added to convert the response data to JSON, it will be sent from getUserRepos() to displayRepos()
                // displayRepos(data, user)
             var cityName = jsonResponse.name; 
             console.log(cityName);

            //find correct date in the requested format
            var currentDate = moment().format('(MM/DD/YYYY)')
            console.log(currentDate)
            // var newDate = moment(currentDate).add(10, 'hours')
            // console.log(newDate)
            // var currentDate = moment.timezone(-25200).format("(MM/DD/YYYY)");
            
            // var sec = 1587081901;
            // var date1 = new Date(sec * 1000);
            // var timestr = date1.toLocaleTimeString();

            // console.log(date1, timestr);
            // console.log(currentDate);


            // let unix = 1587081901;
            // let date = new Date(unix*1000);

            // console.log(date);

            // var dt = jsonResponse.timezone; 
            // console.log(timezone);

            var localDt = jsonResponse.dt;
            console.log("this is localdt" + localDt);
           


            var dt = 1587087166
            const unixTimestamp = 1587087166
 
            const milliseconds = 1587087166 * 1000 // 1575909015000
            
            const dateObject = new Date(milliseconds)
            
            const humanDateFormat = dateObject.toLocaleString()
            console.log(humanDateFormat);



            // var dtnew = new Date((dt * 1000) + (36000));
            // console.log(dtnew);

            // var loc = '-33.87, 151.21' // Sydney expressed as lat,lng tuple
            // var targetDate = new Date() // Current date/time of user computer
            // var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
            //     console.log(timestamp);

            var utcSeconds = 1587084500;
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(utcSeconds);
            console.log(d)

            var dateString = moment.unix(utcSeconds).format("(MM/DD/YYYY)");
            console.log(dateString);




            //source for codes: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
            var weatherIcon = jsonResponse.weather[0].main;
            console.log(weatherIcon);

            if (weatherIcon === "Clouds") {
                iconEl.setAttribute("src", "./assets/images/overcast.png");
            }
            else if (weatherIcon === "Clear") {
                iconEl.setAttribute("src", "./assets/images/sunny.png")
            }
            else if (weatherIcon === "Fog") {
                iconEl.setAttribute("src", "./assets/images/fog.png")
            }
            else if (weatherIcon === "Snow") {
                iconEl.setAttribute("src", "./assets/images/snowflake.png")
            }
            else if (weatherIcon === "Rain") {
                iconEl.setAttribute("src", "./assets/images/rain.png")
            }
            else if (weatherIcon === "Drizzle") {
                iconEl.setAttribute("src", "./assets/images/rain.png")
            }
            else if (weatherIcon === "Thunderstorm") {
                iconEl.setAttribute("src", "./assets/images/rain.png")
            }
            else if (weatherIcon === "Mist") {
                iconEl.setAttribute("src", "./assets/images/fog.png")
            }


            var lon = jsonResponse.coord.lon;
            console.log(lon);

            var lat = jsonResponse.coord.lat;
            console.log(lat);

            var temperature = jsonResponse.main.temp; 
            console.log(temperature);
            // var celsius = "℃"


            //construct the title line for the current location
            cityContainerEl.innerHTML = cityName + currentDate;
            //add the current location to the page
            cityDisplayEl.appendChild(cityContainerEl);
            cityDisplayEl.appendChild(iconEl);




            })
            //this is the API call for the UV API
            .then(function(lat, lon) {
                fetch(uvUrl).then(function(response){
                    response.json().then(function (responseUvUrl) {
                        console.log(responseUvUrl);
                    })
                })
            })
            //this is the API call for the 5 day forecast
            .then(function(response) {
                fetch(apiFiveDayUrl).then(function(response){
                    response.json().then(function (responseapiFiveDayUrl) {
                        console.log(responseapiFiveDayUrl);
                    })
                })
            })

            

        } else {
            alert("Error: " + response.statusText);
        }
    })

    //this is getting chained in the end of the THEN METHOD
    .catch(function(error) {
        alert("Unable to connect to Open Weather Map")
    })

}



//this function will display the city data
// var displayCity = function(city, searchTerm) {
//     console.log(city);
//     console.log(searchTerm);


//     //adding if else condition to check if the user has any repos
//     if (city ==="") {
//         cityContainerEl.textContent = "No cities found."
//     }

//     //clear old content
//     cityContainerEl.textContent = "";
//     citySearchTerm.textContent = searchTerm;

//     var cityNameEl = document.createElement("h2");
//     cityNameEl.innerHTML = "Bratislava";
//     cityContainerEl.appendChild( cityNameEl);

// }


userFormEl.addEventListener("submit", formSubmitHandler);
// getWeatherPerCity();