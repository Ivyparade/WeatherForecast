
var APIkey = "2a459ebf1649c4965d63c31cfc93309d"

$(".btn").click(function(){
  toList();
  console.log(typeof $("#citySearch").val());
//   generateDash();
  generateForecast();
});

function toList(){
  $("#cityList").append("<div class='list-group-item'>" + $("#citySearch").val() + "</div>");
};

function generateForecast(){
  var city = $("#citySearch").val();
  var URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&appid=" + APIkey;
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
};