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
	counter = -1
	for (var j = 0; j < 20; j++) {
		counter += 1
		var angles = [0,15,30,15,0,-15,-30,-15];
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

		bottompart.setAttribute('data-word', false);
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

for (var i = 0; i < 5; i++) {
	
	for (var j = 0; j < 20; j++) {
		
		var myLocation = $(light_matrix[i*2][j].childNodes[0]).offset();
		var ctr1Left = ((myLocation.left - oldLocationLeft) / 3) + oldLocationLeft;
		var ctr2Left = 2 * ((myLocation.left - oldLocationLeft) / 3) + oldLocationLeft;
		
		ctx.bezierCurveTo(ctr1Left, myLocation.top + 8, ctr2Left, myLocation.top + 8, myLocation.left, myLocation.top);
		
		ctx.stroke();
		oldLocationLeft = myLocation.left;
		oldLocationTop = myLocation.top;
		ctx.beginPath();
		ctx.moveTo(myLocation.left, myLocation.top);
			
	}
	for (var j = 19; j > -1; j--) {
		
		var myLocation = $(light_matrix[(i*2)+1][j].childNodes[0]).offset();
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

function jsisdumb(arr, obj) {
    for(var i=0; i<arr.length; i++) {
		for (var j = 0; j < 2; j++) {
			if (arr[i][j] != obj[j]) {
				break;
			}
			if (j == 1) {
				return true;
			}
		}		
	}
	return false;
}



function lights_on_off(i, j, wordArr) {
	var bulb = light_matrix[i][j].childNodes[1];
	if (!(jsisdumb(wordArr, [i,j]))) {
		var shadowColor = bulb.style.backgroundColor;
		var state = "on";
		window.setTimeout(function() {bulb.style.boxShadow = "0px 7px 20px 3px " + shadowColor; bulb.style.opacity = 1;}, 1500);
		window.setTimeout(lights_off, 2000, i, j, state);
	}
}
function lights_on(i, j) {
	var bulb = light_matrix[i][j].childNodes[1];
	var shadowColor = bulb.style.backgroundColor;
	bulb.style.boxShadow = "0px 7px 20px 7px " + shadowColor; bulb.style.opacity = 1;
	bulb.setAttribute('data-word', 'in');
}

function lights_off(i, j, state) {
	var bulb = light_matrix[i][j].childNodes[1];
	var shadowColor = bulb.style.backgroundColor;
	window.setTimeout(function() {bulb.style.boxShadow = "0px 7px 7px -7px " + shadowColor; bulb.style.opacity = 0.5; state = 'off';}, 1500);
}


var order = [];
for (var i = 0; i < 250; i++) {
	order.push([Math.floor(Math.random() * 10), Math.floor(Math.random() * 20)]);
}

//var hey = [[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2], [5,2],[5,3],[5,4], [2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5]];
//var I = [[2,8],[2,9],[3,9],[4,9],[5,9],[6,9],[2,10],[6,8],[6,10]];
//var H = [[2, 6], [3,6],[4,6],[5,6],[6,6], [4,7], [5,7], [2,7],[3,7],[4,7],[5,7],[6,7]];
var hi = [[2,6],[3,6],[4,6],[5,6],[6,6], [4,7], [4,8], [2,8],[3,8],[4,8],[5,8],[6,8], [2,9],[2,10],[2,11],[3,10],[4,10],[5,10],[6,10],[6,9],[6,11], [2, 13], [3,13], [4,13], [6,13]];
//var exclaim = [[2, 13], [3,13], [4,13], [6,13]];

//var rc = [[[2,8],[2,9],[3,9],[4,9],[5,9],[6,9],[2,10],[6,8],[6,10]]];
// var rc = [[2,2],[2,3],[3,3],[4,3],[5,3],[6,3],[2,4],[6,2],[6,4],[2,6],[3,5],[4,5],[5,6],[6,7],[5,8],[4,9],[3,9],[2,8],[3,7],
// [2,10],[3,10],[4,10],[5,10],[6,10],[2,11],[3,12],[4,11],[5,11],[6,12],[3,16],[2,15],[2,14],[3,13],[4,13],[5,13],[6,14],[6,15],[5,16],
// [2,17],[3,17],[4,17],[6,17]];


/*1) Make snow less obtrusie and fall in background. Do own animation
2) Give lights attrib to tell them to stay lit when called by lights_on_off
*/

/*
var lighter = 0;
function spell_word(word, speed) {
	var interval = setInterval(function() {
		count = 0;
		if (count < word.length) {
			lights_on(word[count][0], word[count][1]);
		}


setInterval(spell_word, 1000, hi)
setInterval(light_it_up, 1000);
*/
lighter = 0;
speller = 0;

function light_it_up(wordArr) {
	
	lights_on_off(order[lighter][0],order[lighter][1], wordArr);
	if (++lighter < 250) {
		if (lighter % 9 === 0) {
			window.setTimeout(light_it_up, 2500, wordArr);
    }
    else {
			window.setTimeout(light_it_up, 1000, wordArr);
    }
	}
}
function spell_word(wordArr, includeLetter) {
	if (speller < wordArr.length) {
		lights_on(wordArr[speller][0], wordArr[speller][1]);
		speller ++;
	}
	else if (includeLetter) {
		var letter = document.getElementById("lettercontainer");
		if (letter.style.opacity != 1) {
			window.setTimeout(function() {letter.style.opacity = 1;}, 2000);
			return;
		}
	}
	window.setTimeout(spell_word, 250, wordArr, includeLetter);
}

function begin(wordArr, includeLetter) {
	
	light_it_up(wordArr);
	var n = wordArr.length;
	window.setTimeout(spell_word, 7500, wordArr, includeLetter);
	window.setTimeout(function() {
		document.getElementById('container').style.opacity = 1;
	}, 5000);

	var t = 1000 * ((n / 4.0) - 6.4);
	if (t > 7500) {
		t = 4750;
	}
	var audio = new Audio('winterwonderland.wav');
	window.setTimeout(function() {
		audio.play();
	}, t);

}

//begin(rc);