/*1) Randomly assign colors
2) Make flashing around bulbs
3) Create rope
*/
var diver = document.getElementById("overlay");

for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 20; j++) {
		var mylight = document.createElement("div");
		mylight.className = "light";
		var toppart = document.createElement("div");
		toppart.className = "square";
		mylight.appendChild(toppart);
		var bottompart = document.createElement("div");
		bottompart.className = "oval";
		mylight.appendChild(bottompart);
		diver.appendChild(mylight);
	}
}


/*
var div = document.body.getElementsByClassName("light");
var div = div[1];
var child = div.childNodes;
child[1].style.background = "yellow";
*/

var divs = document.body.getElementsByClassName("light");
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
	
for (var i = 0; i < divs.length; i++) {
	var div = divs[i];
	var bulb = div.childNodes[1];
	var new_color = pick_color(prev_color);
	bulb.style.background = new_color;
	prev_color = new_color;
}

var light_matrix = [];

for (var i = 0; i < 10; i++) {
	var row = [];
	for (var j = 0; j < 20; j++) {
		row.push(divs[(20*i)+j]);
		}
	light_matrix.push(row);
}

	
function lights_on(i, j) {
	var bulb = light_matrix[i][j].childNodes[1];
	bulb.style.boxShadow = "0px 7px 20px 10px #ffef00";
	bulb.style.opacity = 1;
}

function lights_off(i, j) {
	var bulb = light_matrix[i][j].childNodes[1];
	bulb.style.boxShadow = "0px 7px 7px 0px #ffef00";
	bulb.style.opacity = 0.5;
}

var bulb = light_matrix[1][1].childNodes[1];

bulb.style.background = "red";
window.setTimeout(lights_on, 1000, 1, 1);
window.setTimeout(lights_off, 2000, 1, 1);



var c=document.getElementById("mycanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.moveTo(1,1);
ctx.bezierCurveTo(10,1,40,1,51,1);
ctx.strokeStyle = "grey";
ctx.stroke();


	