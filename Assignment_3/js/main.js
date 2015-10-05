var city='';
var state='';
var APIKey='a6fdf97ce62a2009';
var saveTask = function(){
	var taskInput = document.getElementById('submit');
	var newTask = taskInput.value;
	taskArray.push(newTask);
	taskInput.value = "";
}
//loadWeather
var loadWeather = function(response){
	console.log("loadWeather is running");

	if(response.response.error){
		alert(response.response.error.description);
		return;
	}

	var thisCity = response.current_observation.display_location.city;
	var temp = response.current_observation.temp_f;
	var weather = response.current_observation.weather;
	var humi = response.current_observation.icon;

	$('.temperature').text(temp);
	$('.weather').text(weather);
	$('.currentCity').val(thisCity);
	if(humi == "rain"){
		$('.cloud').html('<img src="img/cloud-13.png" width="200">')
	}else if(humi == "clear"){
		$('.cloud').html('<img src="img/cloud-15.png" width="140">')
	}else{
		$('.cloud').html('<img src="img/cloud-14.png" width="200">')
	}
	if(temp >= 65 && temp <= 80){
		$('.city').html('<img src="img/aa.gif" width="400">');
	}else if(temp < 65){
		$('.city').html('<img src="img/bb.gif" width="400">');
	}else{
		$('.city').html('<img src="img/cc.gif" width="400">')
	}
};


//getWeather function
var getWeather = function(){
	var thisURL = 'http://api.wunderground.com/api/' + APIKey + '/conditions/q/' + state + '/' + city + '.json'
	
	$.ajax({
		url: thisURL,
		datatype : 'jsonp',
		success : function(response){
			loadWeather(response);
		}
	});

	console.log('get weather is running');
};


//setLocation function
var setLocation = function(){

	console.log("set location is running");
	//city
	city = $('.currentCity').val();
	if(city == ''|| city == null){
		alert("You need to list a city!");
		return;
	}


	//state
	state =  $('.currentState').val();
	console.log("city: "+ city + ", state: "+ state);
	getWeather();
};


//init

var init = function(){
	console.log("running");
	$('#submit').click(function(e){
		e.preventDefault();
		setLocation();
	});
	
};

//document ready weith init
$(document).ready(function(){
	init();
})