
$(".btn").click(function(){
  console.log("Hi!");
  console.log($("#citySearch").val());
  toList();
//   generateDash();
  generateForecast();
});

function toList(){
  $("#cityList").append("<div class='list-group-item'>" + $("#citySearch").val() + "</div>");
};

function generateForecast(){
  var URL = "api.openweathermap.org/data/2.5/forecast?q=" + $("#citySearch").val() + "&appid=2a459ebf1649c4965d63c31cfc93309d";
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    response.forEach(function(){
      console.log(response);
    });
  });
};