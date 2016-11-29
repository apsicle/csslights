/*1) Randomly assign colors
2) Make flashing around bulbs
3) Create rope
*/
var diver = document.getElementById("overlay");

var colors = ["red", "blue", "yellow", "green", "orange"];
var num_colors = colors.length;
var prev_color = "red";

function pick_color(previous) {
	var selected = Math.floor(Math.random() * num_colors);
	
	if (colors[selected] == previous) {
		return pick_color(previous);
	}
	
	return colors[selected];
}


/*Loop creates a 10x20 grid of light divs, which each contain a top (square) and bottom (oval). The ovals, which are the lights,
get assigned a random color with the constraint that two of the same colors cannot be touching. Then, the box shadow is applied, and
the whole light is appended to the div overlaid on the canvas. */



for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 20; j++) {
		var mylight = document.createElement("div");
		mylight.className = "light";
		mylight.style.height = "10vh";
		var toppart = document.createElement("div");
		toppart.className = "square";
		mylight.appendChild(toppart);
		var bottompart = document.createElement("div");
		bottompart.className = "oval";
		var new_color = pick_color(prev_color);
		bottompart.style.backgroundColor = new_color;
		bottompart.style.boxShadow = "0px 7px 7px -7px " + new_color;
		prev_color = new_color;
		mylight.appendChild(bottompart);
		diver.appendChild(mylight);
		

		/*
		ctx.bezierCurveTo(10,1,40,1,mylocation.top, mylocation.left);
		ctx.stroke();*/
	}
}


/*
var div = document.body.getElementsByClassName("light");
var div = div[1];
var child = div.childNodes;
child[1].style.background = "yellow";
*/

var divs = document.body.getElementsByClassName("light");
var light_matrix = [];

for (var i = 0; i < 10; i++) {
	var row = [];
	for (var j = 0; j < 20; j++) {
		row.push(divs[(20*i)+j]);
		}
	light_matrix.push(row);
}

var c=document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.getElementById("container").appendChild(c);	
var ctx=c.getContext("2d");
ctx.beginPath();

ctx.strokeStyle = "grey";
var oldLocationLeft = 0;
var oldLocationTop = 0;

for (var i = 0; i < 10; i++) {
	
	for (var j = 0; j < 20; j++) {
		
		var myLocation = $(light_matrix[i][j].childNodes[0]).offset()
		var ctr1Left = ((myLocation.left - oldLocationLeft) / 3) + oldLocationLeft;
		var ctr2Left = 2 * ((myLocation.left - oldLocationLeft) / 3) + oldLocationLeft;
		
		ctx.bezierCurveTo(ctr1Left, myLocation.top + 8, ctr2Left, myLocation.top + 8, myLocation.left, myLocation.top);
		
		ctx.stroke();
		oldLocationLeft = myLocation.left;
		oldLocationTop = myLocation.top;
		ctx.beginPath();
		ctx.moveTo(myLocation.left, myLocation.top);
		
		
	}
}


function lights_on(i, j) {
	var bulb = light_matrix[i][j].childNodes[1];
	var shadowColor = bulb.style.backgroundColor;
	window.setTimeout(function() {bulb.style.boxShadow = "0px 7px 20px 3px " + shadowColor; bulb.style.opacity = 1;}, 1500);
	window.setTimeout(lights_off, 2000, i, j);
}

function lights_off(i, j) {
	var bulb = light_matrix[i][j].childNodes[1];
	var shadowColor = bulb.style.backgroundColor;
	window.setTimeout(function() {bulb.style.boxShadow = "0px 7px 7px -7px " + shadowColor; bulb.style.opacity = 0.75;}, 1500);
}

var bulb = light_matrix[1][1].childNodes[1];
var order = [];
for (var i = 0; i < 100; i++) {
	order.push([Math.floor(Math.random() * 10), Math.floor(Math.random() * 20)]);
}


var lighter = 0;
function light_it_up() {
	
	lights_on(order[lighter][0],order[lighter][1]);
	
	lights_on(Math.floor(Math.random() * 10), Math.floor(Math.random() * 20));
	if (++lighter < 100) {
		if (lighter % 9 === 0) {
			window.setTimeout(light_it_up, 3000);
    }
    else {
			window.setTimeout(light_it_up, 1500);
    }
	}
}

light_it_up();



	