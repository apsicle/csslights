var diver = document.getElementById("overlay");
//You are so lucky

function Flake() {
	var x = Math.floor(Math.random() * window.innerWidth);
	var y = -50;
	var maxy = window.innerHeight;
	var img;
	var update = true;
	var speed = Math.floor(Math.random() * 400) + 200;
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
		if (this.update == false) {
		return;}
		var wind = wind || 0;
		var xTranslation = (Math.cos(direction + wind) * speed);
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

}

function update_flakes(flakes, wind) {
	if (Math.random() < 0.8) {
		wind = wind ||(Math.random() * Math.PI / 2) - (Math.PI / 4);
	}
	else {
		wind = wind ||(Math.random() * Math.PI) - (Math.PI / 2);
	}
	for (var i = 0; i < flakes.length; i++) {
		flakes[i].setPos(wind);
	alert("updating");
	}
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
	var updater = setInterval(update_flakes, 1000, snowflakes);
	alert("ran again");
}

let_it_snow(500);