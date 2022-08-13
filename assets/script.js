// no UV index for this assignment because 2.5 has gotten rid of it

var searchBtn = $("#searchBoxBtn");

var currentDate = moment().format("MMMM Do YYYY");


// var weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Better way to do this that takes the number of times the button is clicked into account - got this idea from https://stackoverflow.com/questions/18226598/how-to-add-a-button-dynamically-using-jquery

// lets get it so each city can be searched first - not saving the links or whatever to the data yet

// API KEY: 88217165f47370f98dbdcf362aa489be




    searchBtn.on('click', function(){ // THIS FUNCTION TAKES THE USERS CITY INPUT AND SAVES IT TO LOCAL STORAGE AND APPENDS BUTTONS TO THE PAGE

        var searchedCity = $('#searchBox').val();

        localStorage.setItem('city1', searchedCity);

        var getSearchedCity = localStorage.getItem('city1')

        var cityBtn = $('<button></button>');
        cityBtn.text(getSearchedCity); 
        cityBtn.addClass('btn btn-secondary m-2');

        $('#cityBtns').append(cityBtn);

        }

    );


//try to fetch one city's lat and lon using the API


    function getCity() { // THIS FUNCTION TAKES THE USERS INPUT OF CITY AND PUTS IT INTO THE REQUEST URL FOR THE API CALL AND GETS THE LAT AND LON OF THE CITY FOR LATER USE
        var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + localStorage.getItem('city1') + '&limit=1&appid=88217165f47370f98dbdcf362aa489be';
      

        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var enteredCityLat = data[0].lat; 
            var enteredCityLon = data[0].lon; // HELP - succesfully getting lat and lon consolelogged - now need to put the values into variables for later use

            localStorage.setItem('cityLat', enteredCityLat); 
            localStorage.setItem('cityLon', enteredCityLon); 
            
            //somehow get the data to print instead of object object
          });
      }
      
      searchBtn.on('click', getCity);






//try to fetch one city's weather data using the result of the above function - get the lat and lon keys from the object and add them to the new url





    function getCityData() { 

    var weatherOfCityUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + localStorage.getItem('cityLat') +  '&lon=' + localStorage.getItem('cityLon')  + '&appid=88217165f47370f98dbdcf362aa489be'; // in this URL we can take the lat and lon from above function and add them both in to get the weather data of this city
    
    fetch(weatherOfCityUrl)
    .then(function (response) {
      return response.json(); //json is javascript object notation
    })
    .then(function (data) {
      console.log(data)

      // NOW LET'S LOCALLY SAVE KEYS FOR EACH WEATHER DATA TYPE WE WANT

      //find city name with user input probably

      console.log(localStorage.getItem('city1')); //this one we already have saved from previous function -  localStorage.getItem('city1');

      //find current date using moment - dave saved in - localStorage.getItem('currentDate');

      localStorage.setItem('currentDate', currentDate);

      console.log(currentDate);


      //find icon for weather conditions in data

      console.log(data.current.weather[0].icon); // http://openweathermap.org/img/wn/10d@2x.png - replace 10d in this png file with the value found here and it should be the icon

      var weatherIcon = src='http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';

      console.log(weatherIcon); // This worked perfectly

      localStorage.setItem('weatherIcon', weatherIcon); // weather icon saved - get by doing localStorage.getItem('weatherIcon');

      //find temp in data, convert to fahrenheit using this equation (K − 273.15) × 9/5 + 32 = °F.

      var kelvinTemp = data.current.temp

      var fahrTemp = Math.floor((kelvinTemp-273.15)*1.8+32)

      console.log(fahrTemp); // got the temp in fahrenheit and rounded to nearest whole number

      localStorage.setItem('fahrTemp', fahrTemp); // temp saved - get by doing localStorage.getItem('fahrTemp');


      //find humidity in data

      var currentHumidity = data.current.humidity;

      localStorage.setItem('currentHumidity', currentHumidity); // humidity saved - get by doing localStorage.getItem('currentHumidity');

      //find wind speed in data

      var currentWindSpeed = data.current.wind_speed;

      localStorage.setItem('currentWindSpeed', currentWindSpeed); // localStorage.getItem('currentWindSpeed');

      $("#cityWeatherCards").append(localStorage.getItem('city1'), localStorage.getItem('currentDate'), localStorage.getItem('weatherIcon'), localStorage.getItem('fahrTemp'), localStorage.getItem('currentHumidity'), localStorage.getItem('currentWindSpeed'));


      //For loop to get the data of each day for five days of that city we've searched
      for (let i = 0; i < data.daily.length; i++) { // for each object in daily get the key value EXAMPLE
      console.log(data.daily[i].feels_like.eve);
      }


      renderForecastCards(data)


    });
}



searchBtn.on('click', getCityData);


function renderForecastCards(dataArray) {

 // render present day first - then we can get the other cards appended too
    // for (i=0; i){

    //     document.createElement(div)

console.log(dataArray)

    }





// temp is in kelvin - need to use this - var faren = (K − 273.15) × 9/5 + 32 = °F.

/*

       for (var i = 0; i < data.length; i++) {
              // Creating elements, tablerow, tabledata, and anchor
              var createTableRow = document.createElement('tr');
              var tableData = document.createElement('td');
              var link = document.createElement('a');
      
              // Setting the text of link and the href of the link
              link.textContent = data[i].html_url;
              link.href = data[i].html_url;
      
              // Appending the link to the tabledata and then appending the tabledata to the tablerow
              // The tablerow then gets appended to the tablebody
              tableData.appendChild(link);
              createTableRow.appendChild(tableData);
              tableBody.appendChild(createTableRow);
            }

  searchBtn.on('click', function(){
        var searchedCity = $("#searchBox").val();
        var searchedCityArray = [""];
        searchedCityArray.push(searchedCity);


        for (var i = 0, i < searchedCityArray.length; i++) {

        localStorage.setItem("city1", searchedCity);

        var getSearchedCity = localStorage.getItem("city1")

        var cityBtn = $("<button></button>");
        cityBtn.text(getSearchedCity); 
        cityBtn.addClass("btn btn-secondary m-2");

        $("#cityBtns").append(cityBtn);

        }

    });


$("#8-item-save").on("click", function () {
    var userInput8 = $("#8-item").val(); 

    localStorage.setItem("8-agenda-item", userInput8);

    var stored8 = localStorage.getItem("8-agenda-item");

    var userInput8Print = $("<li>");
    userInput8Print.text(stored8); 
    userInput8Print.addClass("my-2 text-dark");
    $("#8-item-container").append(userInput8Print);
    $("#8-item").hide();
    $("#8-item-save").hide();



})
};

*/