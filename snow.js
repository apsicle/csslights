var diver = document.getElementById("overlay");

function Flake() {
	var x = Math.floor(Math.random() * window.innerWidth);
	var y = Math.floor(Math.random() * window.innerHeight);
	var img;
	var speed = 100;
	var direction = 3*Math.PI/2; 
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
		var wind = wind || 0;
		var x_p = x + (Math.cos(direction + wind) * speed);
		var y_p = y + (Math.sin(direction + wind) * speed);
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
}

function update_flakes(flakes, wind) {
	var wind = wind ||(Math.random() * Math.PI) - (Math.PI / 2);
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
	

function let_it_snow () {
	var snowflakes = [];
	setInterval(make_flake, 1000);
}

let_it_snow();

function update_flakes() {
	var wind = (Math.random() * Math.PI) - (Math.PI / 2);
}