document.addEventListener('DOMContentLoaded', function () {

    var todayEl = $("#today");

    var forecastEl = $("#forecast");

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

    $("#search-button").on("click", function (event) {

        event.preventDefault();

        const searchInput = $("#search-input").val().trim();

        fetchWeather(searchInput);
    });
})