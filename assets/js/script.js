document.addEventListener('DOMContentLoaded', function () {

    $("#search-button").on("click", function (event) {

        event.preventDefault();

        const searchInput = $("#search-input").val().trim();

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
                for(var i = 1; i < 6; i++){
                    var dayInt = i * 8 - 1;
                    console.log(data.list[dayInt]);
                }
            });

        };
        fetchWeather(searchInput);
    });
})