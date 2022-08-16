// no UV index for this assignment because 2.5 has gotten rid of it

// API WE ARE USING: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// API KEY: 88217165f47370f98dbdcf362aa489be

var searchBtn = $("#searchBoxBtn");

var currentDate = moment().format("MMMM Do YYYY");


//Need empty array to push local storage stuff instead of just one value each


// THIS FUNCTION TAKES THE USERS CITY INPUT AND SAVES IT TO LOCAL STORAGE AND APPENDS BUTTONS TO THE PAGE
    searchBtn.on('click', function(){ 

        var searchedCity = $('#searchBox').val();

        localStorage.setItem('city1', searchedCity);

        var getSearchedCity = localStorage.getItem('city1')

        var cityBtn = $('<button></button>');
        cityBtn.text(getSearchedCity); 
        cityBtn.addClass('btn btn-secondary m-2');

        $('#cityBtns').append(cityBtn);

        getCity(searchedCity);

        }
    );

// THIS FUNCTION TAKES THE USERS INPUT OF CITY AND PUTS IT INTO THE REQUEST URL FOR THE API CALL AND GETS THE LAT AND LON OF THE CITY FOR LATER USE
    function getCity(city) {
        var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=88217165f47370f98dbdcf362aa489be';
      
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var enteredCityLat = data[0].lat; 
            var enteredCityLon = data[0].lon;

            getCityData(enteredCityLat, enteredCityLon)
            
          });
      }




// IN THIS FUNCTION WE GET THE WEATHER DATA OF THE SEARCHED CITY AND PUT IT ON THE PAGE
    function getCityData(lat, lon) { 

    var weatherOfCityUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +  '&lon=' + lon  + '&appid=88217165f47370f98dbdcf362aa489be';
    
    fetch(weatherOfCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      //SET WEATHER ICON URL IN LOCAL STORAGE
      var weatherIcon = src='https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';

      localStorage.setItem('weatherIcon', weatherIcon); 

      //SET TEMP AS FAHRENHEIT IN LOCAL STORAGE
      var kelvinTemp = data.current.temp
      var fahrTemp = Math.floor((kelvinTemp-273.15)*1.8+32)
      localStorage.setItem('fahrTemp', fahrTemp);

      //SET HUMIDITY IN LOCAL STORAGE
      var currentHumidity = data.current.humidity;
      localStorage.setItem('currentHumidity', currentHumidity);

      //SET CURRENT WIND SPEED IN LOCAL STORAGE
      var currentWindSpeed = data.current.wind_speed;

      localStorage.setItem('currentWindSpeed', currentWindSpeed);

      //APPEND ALL OF THE CURRENT WEATHER DATA TO A CARD
      var currentDateCard = document.createElement('div');

      currentDateCard.classList.add('card', 'bg-dark', 'text-light', 'mb-4', 'p-4');

      var currentInfo = document.createElement("h1");
      currentInfo.innerHTML = '<strong>City: </strong>' + localStorage.getItem('city1') + '<br/>' + '<strong>Date: </strong>' + moment().format("MMMM Do YYYY") + '<br/>' + '<ul class = "h6"' + '<li><img src=' + localStorage.getItem('weatherIcon') + '></li>' + '<li> Temp (F): ' + localStorage.getItem('fahrTemp') + ' Degrees</li>' + '<li> Humidity: '  + localStorage.getItem('currentHumidity') + '</li>' + '<li> Wind speed: ' + localStorage.getItem('currentWindSpeed') + ' miles per hour</li>' + '<ul/>';

      currentDateCard.append(currentInfo);

      $("#cityWeatherCards").append(currentDateCard);
    

      //Do the five day forecast and then do the local storage stuff and use the local storage arrays to save it all in the buttons that display the old cards

      

      //For loop to get the data of each day for five days of that city we've searched
      // for (let i = 0; i < data.daily.length; i++) { // for each object in daily get the key value EXAMPLE
      // console.log(data.daily[i].feels_like.eve);
      // }

      for (let i = 1; i < 6; i++) { // Get five values out of there  for five day forecast
        console.log(data.daily[i].temp.max); // this works to get all of the temp maxes - do this for each condition
        }


      // renderForecastCards(data)


    });
}





// Questions: How do I get it to work on the first button click and not after the second - something with local storage
//How do I clear local storage after each button press?
//How do I save the card in the button to be clicked later to come back onto the screen?
//Clear the card from view after clicking enter again?
//Doing five day forecast afer current day?




// function renderForecastCards(dataArray) {

//  // render present day first - then we can get the other cards appended too
//     // for (i=0; i){

//     //     document.createElement(div)

// console.log(dataArray)

//     }
