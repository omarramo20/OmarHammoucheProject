

var clientSocket;
var io;

let gamers = new Map();

// object to send data to the server
var dt = {
	x:0,
	y:0,
	r:0,

};

// i couldn't acces to width and height from the other class , that's why i'm gonna pass it in data
let wid = 900; //window.innerWidth;
let hei = 900;
function setup(){ 

background(255);

clientSocket = 	io('http://localhost:3000');
clientSocket.on("sendToClient",newData); // you  wait for this event "sendToClient" then execute this function

createCanvas(900,900);
//
//createCanvas(window.innerWidth,window.innerHeight);

}

	function newData(allGamers){

	let transitString = JSON.stringify(Array.from(allGamers));
	//console.log(transitString)
	gamers = new Map(JSON.parse(transitString));

}

function send(){

	let	data = {
		x:mouseX,
		y:mouseY,
		r:0, // send the old  one not 60
		wid :wid,
		hei:hei,
		colorR:0,
		colorG:0,
		colorB:0
	};
	console.log(" client x : "+ data.x + " y : "+data.y);

	clientSocket.emit("sendToServer",data);

}

function draw(){

	 //	background(51,264,255);


	background(255,0,255); //	background(51,264,255);

	let move ; // i use this to move canvas

	// i don't know why i can't acces directely to the value with the socket id
	//i think because there is a map of map or something i don't understand

	 for (var [key, value] of gamers) {
    	if(key == clientSocket.id)
    		move = value;
    }
    // in the first time , it doesn't recognize the attributes x,y, ...
       	if(gamers.size > 0)
       	// function that shift the origine
       	// so it take care to put the circle(x,y) in the midle
       	//half - any position of x take of origon to this difference difference
  			translate(wid/2-move.x,hei/2-move.y); 

	for (var [key, value] of gamers) { // loop to every object
	
			fill(value.colorR,value.colorG,value.colorB);
	   		ellipse(value.x,value.y,value.r,value.r);
   }

	send();

}


/*var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

*/

