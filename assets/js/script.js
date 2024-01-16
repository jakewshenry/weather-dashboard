document.addEventListener('DOMContentLoaded', function () {

    var todayEl = $("#today");

    var forecastEl = $("#forecast");

    var historyEl = $("#history");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    const APIKey = '562f06234e59142d045a8afd6ab8c553';

    function fetchWeather(city) {
        // Performing our Fetch GET request
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

        fetch(queryURL)
        // After the data comes back from the API
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            var currentWeather = data.list[0];

            todayEl.empty();

            forecastEl.empty();

            var currentTime = dayjs(currentWeather.dt_txt).format('DD/MM/YYYY');

            var forecastHeader = $(`<h2>${data.city.name} ${currentTime}<img src='https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png'></img></h2>`);

            var forecastTemp = $(`<p>Temperature: ${Math.round(currentWeather.main.temp - 273.15)} &deg;C</p>`);

            var forecastWind = $(`<p>Wind: ${currentWeather.wind.speed} km/h</p>`);

            var forecastHumidity = $(`<p>Humudity: ${currentWeather.main.humidity} %</p>`);

            todayEl.append(forecastHeader, forecastTemp, forecastWind, forecastHumidity);

            var predictedHeader = $(`<h3 id="forecast-heading" class="mt-1 h3">5-Day Forecast</h3>`)

            forecastEl.append(predictedHeader);

            for(var i = 1; i < 6; i++){
                var dayInt = i * 8 - 1;
                var predictedWeather = data.list[dayInt];

                var predictedTime = dayjs(predictedWeather.dt_txt).format('DD/MM/YYYY');

                var mainCard = $(`<div class='card col-md-5'> 
                    <div class='card-body'> 
                        <h6>${predictedTime}<img src='https://openweathermap.org/img/w/${predictedWeather.weather[0].icon}.png'></img></h6>
                        <p>Temperature: ${Math.round(predictedWeather.main.temp - 273.15)} &deg;C</p>
                        <p>Wind: ${predictedWeather.wind.speed} km/h</p>
                        <p>Humudity: ${predictedWeather.main.humidity} %</p>
                    </div>
                </div>`)

                forecastEl.append(mainCard);
            }
        });

    };

    var historyList = $(`<ul class='list-group' id='searchHistoryList'></ul>`);

    historyEl.append(historyList);

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    var recentHistory = searchHistory.slice(-5);

    recentHistory.forEach((cityName) => {
        createBtn(cityName);

    });

    function createBtn(cityName){
        var newBtn = $(`<li class='list-group-item'>${cityName}</li>`);

        historyList.append(newBtn);
    }
    
    $("#search-button").on("click", function (event) {

        event.preventDefault();

        const searchInput = $("#search-input").val().trim();

        fetchWeather(searchInput);

        createBtn(searchInput);

        var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

		// Add current score to array
		searchHistory.push(searchInput);
	  
		// Save updated scores array back to local storage
		localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    });

    historyEl.on("click", '.list-group-item', function () {
        fetchWeather($(this).text());
    });
});