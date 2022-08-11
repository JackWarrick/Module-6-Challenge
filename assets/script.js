// no UV index for this assignment because 2.5 has gotten rid of it

var searchBtn = $("#searchBoxBtn");


// var weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Better way to do this that takes the number of times the button is clicked into account - got this idea from https://stackoverflow.com/questions/18226598/how-to-add-a-button-dynamically-using-jquery


// API KEY: 88217165f47370f98dbdcf362aa489be


    searchBtn.on('click', function(){
        var searchedCity = $("#searchBox").val();

        localStorage.setItem("city1", searchedCity);

        var getSearchedCity = localStorage.getItem("city1")

        var cityBtn = $("<button></button>");
        cityBtn.text(getSearchedCity); 
        cityBtn.addClass("btn btn-secondary m-2");

        $("#cityBtns").append(cityBtn);

        }

    );

//try to fetch one city using the API


    // function getCity() {
    //     var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=88217165f47370f98dbdcf362aa489be';
      

    //     fetch(requestUrl)
    //       .then(function (response) {
    //         return response.json();
    //       })
    //       .then(function (data) {
    //         console.log(data)
    //         localStorage.setItem("cityLatLon", data); //somehow get the data to print instead of object object
    //       });
    //   }
      
    //   searchBtn.on('click', getCity);

//try to fetch one city's weather data using the result of the above function - get the lat and lon keys from the object and add them to the new url

    function getCityData() {

    var weatherOfCityUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=51.5073219&lon=-0.1276474&appid=88217165f47370f98dbdcf362aa489be';
    
    fetch(weatherOfCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      localStorage.setItem("LondonData", data); //somehow get the data to print instead of object object
      console.log(data.daily[2].uvi);

      for (let i = 0; i < data.daily.length; i++) { // for each object in daily get the key value
      console.log(data.daily[i].feels_like.eve);
      }

      renderForecastCards(data)

    });
}

searchBtn.on('click', getCityData);


function renderForecastCards(dataArray) {
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