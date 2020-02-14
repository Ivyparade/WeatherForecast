
var APIkey = "2a459ebf1649c4965d63c31cfc93309d"
var cities = [];
var current = new Date();
$(".btn").click(function(){
  toList();
  var city = $("#citySearch").val();
  generateDash(city)
  generateForecast(city);
});

$("#cityList").click(function(event){
  var city = event.target.innerText;
  generateDash(city);
  generateForecast(city);
})

function toList(){
  cities.push($("#citySearch").val());
  $("#cityList").empty();
  for (var i = 0; i < cities.length; i++) {
    $("#cityList").append("<div class='list-group-item'>" + cities[i] + "</div>");
  };
};

function generateDash(city){
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var icon = setIcon(response.weather[0].main);
    var month = current.getMonth() + 1;
    $("#dash").empty();
    $("#dash").append("<h2>" + city + " " + "("+ month + "/" + current.getDate() + "/" + current.getFullYear() + ")" + " " +icon+ "</h2>")
    $("#dash").append("<p> Temperature: " + response.main.temp + " &#8457");
    $("#dash").append("<p> Humidity: " + response.main.humidity + "&#37; </p>");
    $("#dash").append("<p> Wind Speed: " + response.wind.speed + " MPH</p>");
    $("#dash").append("<p id='UVindex'> UV index: </p>");
    var url = "https://api.openweathermap.org/data/2.5/uvi?lat="+ response.coord.lat +"&lon=" + response.coord.lon + "&appid=" + APIkey;
    $.ajax({
      url: url,
      method: "GET"
    }).then(function(response){
      var uvSpan = $("<span>" + response.value + "</span>")
      if (response.value < 2) {
        uvSpan.attr("class", "bg-success");
      } else if (response.value < 8) {
        uvSpan.attr("class", "bg-warning");
      } else {
        uvSpan.attr("class", "bg-danger");
      }
      $("#UVindex").append(uvSpan);
    });
  });
};

function setIcon(weather) {
  switch(weather) {
        case "Clouds":
          var icon = "&#9729;";
          break;
        case "Clear":
          var icon = "&#9728;";
          break;
        case "Rain":
          var icon = "&#128167;";
          break;
      }
  return icon;
}

function generateForecast(city){
  $("#fiveDayForecast").empty();
  var URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + APIkey;
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    for (var i = 0; i < 40; i = i + 8) {
      var date = new Date(response.list[i].dt * 1000);
      var year = date.getYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var weather = response.list[i].weather[0].main;
      var icon = setIcon(weather);
      var newColum = $("<div class='col'>");
      var newbie = $("<div class='card bg-primary text-white'>");
      newbie.append("<h5 class='card-title'>"+ month + "/" + day + "/" + year +"</h5>");
      newbie.append("<p> &nbsp; "+ icon +" </p>");
      newbie.append("<p>Temp: "+ response.list[i].main.temp +" &#8457;</p>");
      newbie.append("<p>Humidity: "+ response.list[i].main.humidity +"</p>");
      newColum.append(newbie);
      $("#fiveDayForecast").append(newColum);
    };
  });
};
