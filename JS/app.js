
var icons = { "clear-day"           :   "B",
              "clear-night"         :   "C",
              "rain"                :   "R",
              "snow"                :   "G",
              "sleet"               :   "X",
              "wind"                :   "S",
              "fog"                 :   "N",
              "cloudy"              :   "Y",
              "partly-cloudy-day"   :   "H",
              "parly-cloudy-night"  :   "I",
            };

var cities = {
              "seattle"           : { coords  : {latitude: 47.606209, longitude:-122.332071}},
              "los angeles"       : { coords  : {latitude: 34.052234, longitude:-118.243685}},
              "new york city"     : { coords  : {latitude: 40.712784, longitude:-74.005941}},
              "barcelona"         : { coords  : {latitude: 41.385064, longitude:2.173403}},
              "seoul"             : { coords  : {latitude: 37.566535, longitude:126.977969}},
              "current location"  : ""
              };

function loadWeather(cityCoords){

  var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

  var forecastURL = "https://api.forecast.io/forecast/f70e8c79b99541a9b246f5946778435b/"+latlng;

  $.ajax({
    url: forecastURL,
    jsonpCallback: 'jsonpCallback',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
      console.log(json);
      $("#current_temp").html(Math.round(json.currently.temperature)+"&#176F");
      $("#current_summary").html(json.currently.summary);
      $("#current_temp").attr("data-icon",icons[json.currently.icon]);
    },
    error: function(e){
      console.log(e.message);
    }
  });

}

function loadCity(city){
  $("#location").html(city);

  if(city.toLowerCase() == "current location"){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
      console.log("geo success");
    } else{
      loadDefaultCity();
      console.log("geo fail");
    }
  } else {
    loadWeather(cities[city.toLowerCase()]);
  }
}

function loadDefaultCity(){
  loadCity("Seattle");
}

$(document).ready(function(){
  loadCity("Seattle");

  $("a.city").bind("click",function(){
    loadCity($(this).html());
  })
});
