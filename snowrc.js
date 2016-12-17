var body = document.body;
var html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

var diver = document.body;
var global_wind;
//You are so lucky

function Flake() {
	var x = Math.floor(Math.random() * window.innerWidth);
	var y = -50;
	var maxy = body.scrollHeight - 20;
	var img;
	var update = true;
	var speed = Math.floor(Math.random() * 10) + 5;
	var direction = 3*Math.PI/2; 
	var my_wind = 0;
	//direction in terms of degree of circular arc from positive x direction, and 0 y.
	
	this.getPos = function () {
		return [x, y];
	};
	this.getX = function () {
		return x;
	};
	this.getY = function () {
		return y;
	};
	this.getSpeed = function () {
		return speed;
	};
	this.setPos = function (wind) {
		//moves the flake according to speed in the direction its currently headed. setPos is called every 2 seconds. 
		if (this.update == false) {
		return;}
		var wind = (0.05*this.getWind()) + (0.95*my_wind);
		this.setWind((0.05*this.getWind()) + (0.95*my_wind));
		var xTranslation = (Math.cos(direction + wind) * speed);
		//console.log(this.getWind(), my_wind);
		var yTranslation = (-Math.sin(direction + wind) * speed);
		if (yTranslation + y > maxy) {
			yTranslation = maxy - y;
			this.update = false;
		}
		x = x + xTranslation;
		y = y + yTranslation;
		img.style.left = x;
		img.style.top = y;	
	};
	this.setSpeed = function (adj) {
		speed = speed + adj;
	};
	this.attach = function (div) {
		img = div;
	};
	this.getImg = function() {
		return div;
	};
	this.getWind = function() {
		return global_wind;
	};
	this.setWind = function(new_wind) {
		my_wind = new_wind;
	};

}

function update_flakes(flakes) {
	for (var i = 0; i < flakes.length; i++) {
		flakes[i].setPos();
	}
}

function make_wind(flakes) {
	if (Math.random() < 0.8) {
		var wind = (Math.random() * Math.PI / 2) - (Math.PI / 4);
	}
	else {
		var wind = (Math.random() * Math.PI) - (Math.PI / 2);
	}
	// for (var i = 0; i < flakes.length; i++) {
	// 	flakes[i].setWind(wind);
	// }
	global_wind = wind;
	return wind;
}

function make_flake(flake_array) {
	var flake_obj = new Flake();
	var flake_img = document.createElement("div");
	flake_img.setAttribute("id", "snow");
	flake_img.style.left = flake_obj.getX();
	flake_img.style.top = flake_obj.getY();
	diver.appendChild(flake_img);
	flake_obj.attach(flake_img);
	flake_array.push(flake_obj);
}
	
var snowflakes = [];
var timer = 0;
function let_it_snow (severity) {
	var maker = setInterval(function() {
	make_flake(snowflakes); timer += 1;}, severity);
	var updater = setInterval(update_flakes, 100, snowflakes);
	make_wind(snowflakes);
	var storm = setInterval(make_wind, 5000, snowflakes);
}

window.setTimeout(let_it_snow, 500, 350);