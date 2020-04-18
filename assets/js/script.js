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
var fiveDayContainerEl = document.querySelector("#fiveday-container");
var fiveDayContainerTitleEl = document.querySelector("#fivedayforecast");
var futureday1titleEl = document.querySelector("#futureday1title");
var futureday2titleEl = document.querySelector("#futureday2title");
var futureday3titleEl = document.querySelector("#futureday3title");
var futureday4titleEl = document.querySelector("#futureday4title");
var futureday5titleEl = document.querySelector("#futureday5title");
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
// document.querySelector("#weatherdataid").style.display = "none";
var showHiddenEl = document.querySelector("#hidden");
var searchresultlistcontainerEl = document.querySelector("#searchresultlistcontainer");







var lat
var lon
var uvUrl



var listItemClicker = function(event) {
    var clickedCityName = event.currentTarget.textContent;
    console.log(clickedCityName);
    getWeatherPerCity(clickedCityName);
}





//this function passes the username to the function so that we can filter the results
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    // console.log(cityName);
    var apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=813b5c16fd3ec3678dd044ecba8f628a";

    if (cityName) {
        //to get the cities with the city name
        getWeatherPerCity(cityName);
        getFiveDayForecast(apiFiveDayUrl);

   
        //to clear the input form field after submit
        cityInputEl.value = "";
        // weatherdataidEl.removeChild(fiveDayContainerEl);
    } else {
        alert("Please enter a City")
    }
    // console.log(event);
}



//this function gets the response from the API
var getWeatherPerCity = function(city) {
    //format the api url
    // var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Bratislava&appid=813b5c16fd3ec3678dd044ecba8f628a"
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=813b5c16fd3ec3678dd044ecba8f628a";




    //make request to the URL
    fetch(apiUrl)
    .then(function(response) {
        //add if else condition for ERROR HANDLING
        //if request was successful 
        if (response.ok) {
            response.json().then(function(jsonResponse) {
                // console.log(jsonResponse);
                //this was added to convert the response data to JSON, it will be sent from getUserRepos() to displayRepos()
                // displayRepos(data, user)
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


        
            var newListItemUlEl = document.createElement("li");
            newListItemUlEl.className = "list-group-item";
            newListItemUlEl.textContent = cityName;
            newListItemUlEl.addEventListener("click", listItemClicker);
            searchresultlistcontainerEl.appendChild(newListItemUlEl);

        







            })
            //this is the API call for the UV API
            // .then(function(response) {

            //     fetch(uvUrl).then(function(response){
            //         response.json().then(function (responseUvUrl) {
            //             console.log(responseUvUrl);
            //         })
            //     })
            // })
            //this is the API call for the 5 day forecast
            // .then(function(response) {

            //     fetch(apiFiveDayUrl).then(function(response){
            //         response.json().then(function (responseapiFiveDayUrl) {
            //             console.log(responseapiFiveDayUrl);
            //         })
            //     })
            // })

            

        } else {
            alert("Error: " + response.statusText);
        }
    })

    //this is getting chained in the end of the THEN METHOD
    .catch(function(error) {
        alert("Unable to connect to Open Weather Map")
    })

}



    //this is the API call for the 5 day forecast
    var getFiveDayForecast = function (apiFiveDayUrl) {
        fetch(apiFiveDayUrl).then(function(response) {
            if(response.ok) {
                response.json().then(function (responseapiFiveDayResponse) {
                    console.log(responseapiFiveDayResponse);


                    
                    //get the next 5 day date data and format it
                    var day1ofFive = responseapiFiveDayResponse.list[0].dt_txt;
                    // console.log("day1ofFive " + day1ofFive);
                    var formattedDay1ofFive = moment(day1ofFive).format('MM/DD/YYYY')
                    console.log(formattedDay1ofFive);

                    var day2ofFive = responseapiFiveDayResponse.list[8].dt_txt;
                    // console.log("day2ofFive " + day2ofFive);
                    var formattedDay2ofFive = moment(day2ofFive).format('MM/DD/YYYY')
                    console.log(formattedDay2ofFive);

                    var day3ofFive = responseapiFiveDayResponse.list[16].dt_txt;
                    // console.log("day3ofFive " + day3ofFive);
                    var formattedDay3ofFive = moment(day3ofFive).format('MM/DD/YYYY')
                    console.log(formattedDay3ofFive);

                    var day4ofFive = responseapiFiveDayResponse.list[24].dt_txt;
                    // console.log("day4ofFive " + day4ofFive);
                    var formattedDay4ofFive = moment(day4ofFive).format('MM/DD/YYYY')
                    console.log(formattedDay4ofFive);

                    var day5ofFive = responseapiFiveDayResponse.list[32].dt_txt;
                    // console.log("day5ofFive " + day5ofFive);
                    var formattedDay5ofFive = moment(day5ofFive).format('MM/DD/YYYY')
                    console.log(formattedDay5ofFive);



                    //get the next 5 day temperature
                    var temperatureDay1 = responseapiFiveDayResponse.list[0].main.temp; 
                    console.log(temperatureDay1 + " ℃");

                    var temperatureDay2 = responseapiFiveDayResponse.list[8].main.temp; 
                    console.log(temperatureDay2 + " ℃");

                    var temperatureDay3 = responseapiFiveDayResponse.list[16].main.temp; 
                    console.log(temperatureDay3 + " ℃");

                    var temperatureDay4 = responseapiFiveDayResponse.list[24].main.temp; 
                    console.log(temperatureDay4 + " ℃");

                    var temperatureDay5 = responseapiFiveDayResponse.list[32].main.temp; 
                    console.log(temperatureDay5 + " ℃");



                    //get the next 5 day humidity
                    var humidityDay1 = responseapiFiveDayResponse.list[0].main.humidity;
                    console.log(humidityDay1 + "%");

                    var humidityDay2 = responseapiFiveDayResponse.list[8].main.humidity;
                    console.log(humidityDay2 + "%");

                    var humidityDay3 = responseapiFiveDayResponse.list[16].main.humidity;
                    console.log(humidityDay3 + "%");

                    var humidityDay4 = responseapiFiveDayResponse.list[24].main.humidity;
                    console.log(humidityDay4 + "%");

                    var humidityDay5 = responseapiFiveDayResponse.list[32].main.humidity;
                    console.log(humidityDay5 + "%");




                    //construct the 5 day forecast title
                    fiveDayContainerTitleEl.innerHTML = "5-Day Forecast: ";
                    console.log(fiveDayContainerTitleEl);

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
                    // uvIndex.setAttribute("class", "icon-danger")

                    // uvindexEl.className = "icon-danger";
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
