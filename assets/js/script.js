//global variables

//city input form elements
var userFormEl = document.querySelector("#cityinputform");
var cityInputEl = document.querySelector("#cityinput");
var cityDisplayEl = document.querySelector("#result-container")
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var iconEl = document.querySelector("#icon");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windspeedEl = document.querySelector("#windspeed");
var uvindexEl = document.querySelector("#uvindex");
var uvIndexIconEl = document.querySelector("#uvicon");
//five day forecast elements
var fiveDayContainerEl = document.querySelector("#fiveday-container");
var fiveDayContainerTitleEl = document.querySelector("#fivedayforecast");

var cardbody1El = document.querySelector("#cardbody1")
var cardbody2El = document.querySelector("#cardbody2")
var cardbody3El = document.querySelector("#cardbody3")
var cardbody4El = document.querySelector("#cardbody4")
var cardbody5El = document.querySelector("#cardbody5")

var futureday1titleEl = document.querySelector("#futureday1title");
var futureday2titleEl = document.querySelector("#futureday2title");
var futureday3titleEl = document.querySelector("#futureday3title");
var futureday4titleEl = document.querySelector("#futureday4title");
var futureday5titleEl = document.querySelector("#futureday5title");

var futureday1iconEl = document.querySelector("#futureday1icon");
var futureday2iconEl = document.querySelector("#futureday2icon");
var futureday3iconEl = document.querySelector("#futureday3icon");
var futureday4iconEl = document.querySelector("#futureday4icon");
var futureday5iconEl = document.querySelector("#futureday5icon");

var futuredaytemp1El = document.querySelector("#futuredaytemp1");
var futuredaytemp2El = document.querySelector("#futuredaytemp2");
var futuredaytemp3El = document.querySelector("#futuredaytemp3");
var futuredaytemp4El = document.querySelector("#futuredaytemp4");
var futuredaytemp5El = document.querySelector("#futuredaytemp5");

var futuredayhum1El = document.querySelector("#futuredayhum1");
var futuredayhum2El = document.querySelector("#futuredayhum2");
var futuredayhum3El = document.querySelector("#futuredayhum3");
var futuredayhum4El = document.querySelector("#futuredayhum4");
var futuredayhum5El = document.querySelector("#futuredayhum5");

var weatherdataidEl = document.querySelector("#weatherdataid");
//variable to manage hidden section
var showHiddenEl = document.querySelector("#hidden");
//container for search history
var searchresultlistcontainerEl = document.querySelector("#searchresultlistcontainer");
//parameter variables
var lat
var lon
var uvUrl







//function to reload the city data based on the clicked city in the city history list
var listItemClicker = function(event) {
    //to check for the name of the clicked city
    var clickedCityName = event.currentTarget.textContent;
    // console.log(clickedCityName);

    //call the below functions based on the city name that was selected for reload
    getWeatherPerCity(clickedCityName);
    getFiveDayForecast(clickedCityName);
}





//this function passes the username to the function so that we can filter the results
var formSubmitHandler = function(event) {
    event.preventDefault();
    cityName = cityInputEl.value.trim();
    // console.log(cityName);

    if (cityName) {
        //to get the cities with the city name
        getWeatherPerCity(cityName);
        getFiveDayForecast(cityName);

        //to clear the input form field after submit
        cityInputEl.value = "";

    } else {
        alert("Please enter a City")
    }
    // console.log(event);
}



//this function gets the response from the One Day Forecast API
var getWeatherPerCity = function(city) {
    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=813b5c16fd3ec3678dd044ecba8f628a";


    //make request to the URL
    fetch(apiUrl)
    .then(function(response) {
        //add if else condition for ERROR HANDLING
        //if request was successful 
        if (response.ok) {
            response.json().then(function(jsonResponse) {
                // console.log(jsonResponse);
                
                //get city Name from the API call
                var cityName = jsonResponse.name; 
                //  console.log(cityName);

                //find correct date in the requested format
                var currentDate = moment().format('(MM/DD/YYYY)')
                // console.log(currentDate)


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

                // var localDt = jsonResponse.dt;
                // console.log("this is localdt" + localDt);
            


                // var dt = 1587087166
                // const unixTimestamp = 1587087166
    
                // const milliseconds = 1587087166 * 1000 // 1575909015000
                
                // const dateObject = new Date(milliseconds)
                
                // const humanDateFormat = dateObject.toLocaleString()
                // console.log(humanDateFormat);





                // var utcSeconds = 1587084500;
                // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                // d.setUTCSeconds(utcSeconds);
                // console.log(d)

                // var dateString = moment.unix(utcSeconds).format("(MM/DD/YYYY)");
                // console.log(dateString);




                //this conditionality handles conditional show and hide of images based on the response --> source for codes: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
                var weatherIcon = jsonResponse.weather[0].main;
                // console.log(weatherIcon);

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


                //get temperature data
                var temperature = jsonResponse.main.temp; 
                // console.log(temperature + " ℃");

                //get humidity data
                var humidity = jsonResponse.main.humidity;
                // console.log(humidity + "%");

                //get wind speed data
                var windSpeed = jsonResponse.wind.speed;
                // console.log(windSpeed + " MPH");

                //get latitude data
                lat = jsonResponse.coord.lat;
                // console.log(lat);
                //get longitude data
                lon = jsonResponse.coord.lon;
                // console.log(lon);
                //define URL for UV index based on the retrieved data from the one day weather api and pass it into the URL
                uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=813b5c16fd3ec3678dd044ecba8f628a&lat=" + lat + "&lon=" + lon;
                //call the getUvIndex function
                getUvIndex(uvUrl);



                //construct the title line for the current location
                cityContainerEl.innerHTML = cityName + " " + currentDate;
                //assign the temperatureEl the value from the api call result
                temperatureEl.innerHTML = "Temperature: " + temperature + " ℃";
                //assign the humidityEl the value from the api call result            
                humidityEl.innerHTML = "Humidity: " + humidity + " %";
                //assign the windspeedEl the value from the api call result    
                windspeedEl.innerHTML = "Wind Speed: "  + windSpeed + " MPH";


                //add the current location to the page
                cityDisplayEl.appendChild(cityContainerEl);
                //add icon to the page
                cityDisplayEl.appendChild(iconEl);
                //add temperature to the page
                cityDisplayEl.appendChild(temperatureEl);
                //add humidity to the page
                cityDisplayEl.appendChild(humidityEl);
                //add windspeed to the page
                cityDisplayEl.appendChild(windspeedEl);


                //create dynamic list items on the left side of the screen based on the input of the user
                var newListItemUlEl = document.createElement("li");
                newListItemUlEl.className = "list-group-item";
                newListItemUlEl.textContent = cityName;
                //on click of any of the list items reload the data for that city, call the function above that listens to this click
                newListItemUlEl.addEventListener("click", listItemClicker);
                //display the searched city data on the page
                searchresultlistcontainerEl.appendChild(newListItemUlEl);

            })          

        } else {
            alert("Error: " + response.statusText);
        }
    })

    //this is getting chained in the end of the THEN method
    .catch(function(error) {
        alert("Unable to connect to Open Weather Map")
    })

}



    //this is the API call for the 5 day forecast
    var getFiveDayForecast = function (cityName) {
        var apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=813b5c16fd3ec3678dd044ecba8f628a";
        fetch(apiFiveDayUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function (responseapiFiveDayResponse) {
                    console.log(responseapiFiveDayResponse);


                    
                    //get the next 5 day date data and format it
                    var day1ofFive = responseapiFiveDayResponse.list[0].dt_txt;
                    // console.log("day1ofFive " + day1ofFive);
                    var formattedDay1ofFive = moment(day1ofFive).format('MM/DD/YYYY')
                    // console.log(formattedDay1ofFive);

                    var day2ofFive = responseapiFiveDayResponse.list[8].dt_txt;
                    // console.log("day2ofFive " + day2ofFive);
                    var formattedDay2ofFive = moment(day2ofFive).format('MM/DD/YYYY')
                    // console.log(formattedDay2ofFive);

                    var day3ofFive = responseapiFiveDayResponse.list[16].dt_txt;
                    // console.log("day3ofFive " + day3ofFive);
                    var formattedDay3ofFive = moment(day3ofFive).format('MM/DD/YYYY')
                    // console.log(formattedDay3ofFive);

                    var day4ofFive = responseapiFiveDayResponse.list[24].dt_txt;
                    // console.log("day4ofFive " + day4ofFive);
                    var formattedDay4ofFive = moment(day4ofFive).format('MM/DD/YYYY')
                    // console.log(formattedDay4ofFive);

                    var day5ofFive = responseapiFiveDayResponse.list[32].dt_txt;
                    // console.log("day5ofFive " + day5ofFive);
                    var formattedDay5ofFive = moment(day5ofFive).format('MM/DD/YYYY')
                    // console.log(formattedDay5ofFive);




                    //get conditions for icons
                    //this conditionality handles conditional show and hide of images based on the response 
                    var futureweatherIcon1 = responseapiFiveDayResponse.list[0].weather[0].main;
                    console.log(futureweatherIcon1);

                    if (futureweatherIcon1 === "Clouds") {
                        futureday1iconEl.setAttribute("src", "./assets/images/overcast.png");
                    }
                    else if (futureweatherIcon1 === "Clear") {
                        futureday1iconEl.setAttribute("src", "./assets/images/sunny.png")
                    }
                    else if (futureweatherIcon1 === "Fog") {
                        futureday1iconEl.setAttribute("src", "./assets/images/fog.png")
                    }
                    else if (futureweatherIcon1 === "Snow") {
                        futureday1iconEl.setAttribute("src", "./assets/images/snowflake.png")
                    }
                    else if (futureweatherIcon1 === "Rain") {
                        futureday1iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon1 === "Drizzle") {
                        futureday1iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon1 === "Thunderstorm") {
                        futureday1iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon1 === "Mist") {
                        futureday1iconEl.setAttribute("src", "./assets/images/fog.png")
                    }


                    var futureweatherIcon2 = responseapiFiveDayResponse.list[8].weather[0].main;
                    console.log(futureweatherIcon2);

                    if (futureweatherIcon2 === "Clouds") {
                        futureday2iconEl.setAttribute("src", "./assets/images/overcast.png");
                    }
                    else if (futureweatherIcon2 === "Clear") {
                        futureday2iconEl.setAttribute("src", "./assets/images/sunny.png")
                    }
                    else if (futureweatherIcon2 === "Fog") {
                        futureday2iconEl.setAttribute("src", "./assets/images/fog.png")
                    }
                    else if (futureweatherIcon2 === "Snow") {
                        futureday2iconEl.setAttribute("src", "./assets/images/snowflake.png")
                    }
                    else if (futureweatherIcon2 === "Rain") {
                        futureday2iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon2 === "Drizzle") {
                        futureday2iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon2 === "Thunderstorm") {
                        futureday2iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon2 === "Mist") {
                        futureday2iconEl.setAttribute("src", "./assets/images/fog.png")
                    }


                    var futureweatherIcon3 = responseapiFiveDayResponse.list[16].weather[0].main;
                    console.log(futureweatherIcon3);

                    if (futureweatherIcon3 === "Clouds") {
                        futureday3iconEl.setAttribute("src", "./assets/images/overcast.png");
                    }
                    else if (futureweatherIcon3 === "Clear") {
                        futureday3iconEl.setAttribute("src", "./assets/images/sunny.png")
                    }
                    else if (futureweatherIcon3 === "Fog") {
                        futureday3iconEl.setAttribute("src", "./assets/images/fog.png")
                    }
                    else if (futureweatherIcon3 === "Snow") {
                        futureday3iconEl.setAttribute("src", "./assets/images/snowflake.png")
                    }
                    else if (futureweatherIcon3 === "Rain") {
                        futureday3iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon3 === "Drizzle") {
                        futureday3iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon3 === "Thunderstorm") {
                        futureday3iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon3 === "Mist") {
                        futureday3iconEl.setAttribute("src", "./assets/images/fog.png")
                    }

                    var futureweatherIcon4 = responseapiFiveDayResponse.list[24].weather[0].main;
                    console.log(futureweatherIcon4);

                    if (futureweatherIcon4 === "Clouds") {
                        futureday4iconEl.setAttribute("src", "./assets/images/overcast.png");
                    }
                    else if (futureweatherIcon4 === "Clear") {
                        futureday4iconEl.setAttribute("src", "./assets/images/sunny.png")
                    }
                    else if (futureweatherIcon4 === "Fog") {
                        futureday4iconEl.setAttribute("src", "./assets/images/fog.png")
                    }
                    else if (futureweatherIcon4 === "Snow") {
                        futureday4iconEl.setAttribute("src", "./assets/images/snowflake.png")
                    }
                    else if (futureweatherIcon4 === "Rain") {
                        futureday4iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon4 === "Drizzle") {
                        futureday4iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon4 === "Thunderstorm") {
                        futureday4iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon4 === "Mist") {
                        futureday4iconEl.setAttribute("src", "./assets/images/fog.png")
                    }


                    var futureweatherIcon5 = responseapiFiveDayResponse.list[32].weather[0].main;
                    console.log(futureweatherIcon5);

                    if (futureweatherIcon5 === "Clouds") {
                        futureday5iconEl.setAttribute("src", "./assets/images/overcast.png");
                    }
                    else if (futureweatherIcon5 === "Clear") {
                        futureday5iconEl.setAttribute("src", "./assets/images/sunny.png")
                    }
                    else if (futureweatherIcon5 === "Fog") {
                        futureday5iconEl.setAttribute("src", "./assets/images/fog.png")
                    }
                    else if (futureweatherIcon5 === "Snow") {
                        futureday5iconEl.setAttribute("src", "./assets/images/snowflake.png")
                    }
                    else if (futureweatherIcon5 === "Rain") {
                        futureday5iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon5 === "Drizzle") {
                        futureday5iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon5 === "Thunderstorm") {
                        futureday5iconEl.setAttribute("src", "./assets/images/rain.png")
                    }
                    else if (futureweatherIcon5 === "Mist") {
                        futureday5iconEl.setAttribute("src", "./assets/images/fog.png")
                    }






                    //get the next 5 day temperature
                    var temperatureDay1 = responseapiFiveDayResponse.list[0].main.temp; 
                    // console.log(temperatureDay1 + " ℃");

                    var temperatureDay2 = responseapiFiveDayResponse.list[8].main.temp; 
                    // console.log(temperatureDay2 + " ℃");

                    var temperatureDay3 = responseapiFiveDayResponse.list[16].main.temp; 
                    // console.log(temperatureDay3 + " ℃");

                    var temperatureDay4 = responseapiFiveDayResponse.list[24].main.temp; 
                    // console.log(temperatureDay4 + " ℃");

                    var temperatureDay5 = responseapiFiveDayResponse.list[32].main.temp; 
                    // console.log(temperatureDay5 + " ℃");



                    //get the next 5 day humidity
                    var humidityDay1 = responseapiFiveDayResponse.list[0].main.humidity;
                    // console.log(humidityDay1 + "%");

                    var humidityDay2 = responseapiFiveDayResponse.list[8].main.humidity;
                    // console.log(humidityDay2 + "%");

                    var humidityDay3 = responseapiFiveDayResponse.list[16].main.humidity;
                    // console.log(humidityDay3 + "%");

                    var humidityDay4 = responseapiFiveDayResponse.list[24].main.humidity;
                    // console.log(humidityDay4 + "%");

                    var humidityDay5 = responseapiFiveDayResponse.list[32].main.humidity;
                    // console.log(humidityDay5 + "%");



                    //construct the 5 day forecast title
                    fiveDayContainerTitleEl.innerHTML = "5-Day Forecast: ";
                    // console.log(fiveDayContainerTitleEl);

                    //add 5 day forecast dates to the page
                    futureday1titleEl.innerHTML = formattedDay1ofFive;
                    futureday2titleEl.innerHTML = formattedDay2ofFive;
                    futureday3titleEl.innerHTML = formattedDay3ofFive;
                    futureday4titleEl.innerHTML = formattedDay4ofFive;
                    futureday5titleEl.innerHTML = formattedDay5ofFive;

                    //add 5 day forecast temperatures to the page
                    futuredaytemp1El.innerHTML = "Temp: " + temperatureDay1 + " ℃";
                    futuredaytemp2El.innerHTML = "Temp: " + temperatureDay2 + " ℃";
                    futuredaytemp3El.innerHTML = "Temp: " + temperatureDay3 + " ℃";
                    futuredaytemp4El.innerHTML = "Temp: " + temperatureDay4 + " ℃";
                    futuredaytemp5El.innerHTML = "Temp: " + temperatureDay5 + " ℃";

                    //add 5 day forecast humidity to the page
                    futuredayhum1El.innerHTML = "Humidity: " + humidityDay1 + "%";
                    futuredayhum2El.innerHTML = "Humidity: " + humidityDay2 + "%";
                    futuredayhum3El.innerHTML = "Humidity: " + humidityDay3 + "%";
                    futuredayhum4El.innerHTML = "Humidity: " + humidityDay4 + "%";
                    futuredayhum5El.innerHTML = "Humidity: " + humidityDay5 + "%";

                    //add the title to the section of the page
                    fiveDayContainerEl.appendChild(fiveDayContainerTitleEl);
                    

                    //this will remove the class that was defaulted from the HTML file so that the 5 weather forecast box shows up
                    showHiddenEl.classList.remove("hidden");
        

                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather Map")
        })
    }



    //this is the API call for the UV API
    var getUvIndex = function (uvUrl) {
        fetch(uvUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function (responseUvUrl) {
                    // console.log(responseUvUrl);
                    //get UV index data
                    var uvIndex = responseUvUrl.value;
                    // console.log(uvIndex);

                    //conditionality to add a indicator / image for the UV index color
                    if (uvIndex >=0 && uvIndex <3) {
                        uvIndexIconEl.setAttribute("src", "./assets/images/green.png")
                    } 
                    else if (uvIndex >=3 && uvIndex < 6) {
                        uvIndexIconEl.setAttribute("src", "./assets/images/yellow.png")
                    }
                    else if (uvIndex >=6 && uvIndex < 8) {
                        uvIndexIconEl.setAttribute("src", "./assets/images/orange.png")
                    }
                    else if (uvIndex >=8 && uvIndex < 11) {
                        uvIndexIconEl.setAttribute("src", "./assets/images/red.png")
                    }
                    else if (uvIndex >=11) {
                        uvIndexIconEl.setAttribute("src", "./assets/images/violet.png")
                    }


                    //assign the uvindexEl the value from the api call result    
                    uvindexEl.innerHTML = "UV Index: " + uvIndex + "   ";
                    
                    

                    //add uvIndex to the page
                    cityDisplayEl.appendChild(uvindexEl);
                    cityDisplayEl.appendChild(uvIndexIconEl);

                })
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather Map")
        })
    }




//this listens to the user button click on submitting the input 
userFormEl.addEventListener("submit", formSubmitHandler);
