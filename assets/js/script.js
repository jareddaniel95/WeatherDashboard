var APIkey = "72579456c2145cddcdef6f3d9c3a30b9";
var city = "Atlanta";

var content = $('#content');
var citySearch = $('input[name="city"]');
var buttonSearch = $('#search');
var weatherPane = $('<div>');
// weatherPane.attr('class', 'row');
content.append(weatherPane);

buttonSearch.on('click', function() {
    var result = getWeather(citySearch.val());
});

function getWeather(cityInput) {
    var query = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIkey}&units=imperial`;
    fetch(query)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // console.log(data.main.temp);
            if (data.cod == 200) {
                // var extraData = getExtraData(data.coord.lat, data.coord.lon);
                weatherPane.empty();
                var wpTitle = $('<div>');
                wpTitle.attr('class', 'bg-primary px-3 my-2 text-white');
                wpTitle.html(`<table><tr><td><h2>${data.name} - ${moment().format("dddd, MMMM Do")}</h2></td><td><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'></td></tr></table>`);
                weatherPane.append(wpTitle);

                var wpTemp = $('<div>');
                wpTemp.html(`<h5>Temp: ${data.main.temp}&#176;F</h5>`);
                weatherPane.append(wpTemp);

                var wpWind = $('<div>');
                wpWind.html(`<h5>Wind: ${data.wind.speed} MPH</h5>`);
                weatherPane.append(wpWind);

                var wpHumid = $('<div>');
                wpHumid.html(`<h5>Humidity: ${data.main.humidity}%</h5>`);
                weatherPane.append(wpHumid);

                // var wpUVI = $('<div>');
                // wpUVI.html(`<h5>UV Index: ${extraData.current.uvi}</h5>`);
                // weatherPane.append(wpUVI);
            }
            return data;
        }
    );
}

// function getExtraData(lat, lon) {
//     var query = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${APIkey}&units=imperial`;
//     fetch(query)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             return data;
//         }
//     );
// }