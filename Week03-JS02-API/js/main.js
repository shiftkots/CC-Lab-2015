var city = '';
var state = '';
var APIKey = "b84e9f589d2c5bab";

var loadWeather = function(response){
	if(response.response.error){
		alert(response.response.error);
		return;
	}
	//console.log("response = " + JSON.stringify(response));

	var thiscity = response.current_observation.display_location.city;
	var temp = response.current_observation.temp_f;
	var weather = response.current_observation.weather;
	var icon = response.current_observation.icon_url;

	console.log(thisCity);
	console.log(temp);
	console.log(weather);
	console.log(icon);

	$('.temperature').text(temp);
	$('.weather').text(weather);
	$('.currentcity').val(thisCity);
	$('.weathericon').html("<img src='"+ icon +"'>");

}

var getweather = function(){
	var thisURL = 'http://api.wunderground.com/api/'+ APIKey +'/conditions/q/'+ state +'/'+ city + '.json';
	$.ajax({
		url : thisURL,
		dataType : 'jsonp',
		success : function(response){
			loadWeather(response);
		}
	});
}

var setlocation = function(){
	city = $('.currentcity').val();
	if(city == null || city == ""){
		alert('you need to input a city');
	}
	state = $('.currentstate').val();
	console.log('we want the weather data for ' + city + ' / ' + state);
	getweather();
}

var init = function(){
	$('#submit').click(function(e){
		e.preventdefault();
		setlocation();
	});
}

$ (document).ready(function(){
	init();
})