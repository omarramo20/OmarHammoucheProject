

const Controller = require('./controller'); // import the class controller
const Circle = require('./circle');	
   
let express = require("express"); // import the framework express, the var express store a function

let app = express();

var server = app.listen(3000);

app.use(express.static('public')); // public , when public goes to my server , i want them to see this files, static means ...hosting static files ,
// here's my js files,here's my html files,  heres my html file , images, i wanna the app to use , to host everything in this public directory

console.log("server is running");

let gamers = new Map(); // let
let onlyGamers = new Map(); 
let historical = new Map(); // i will use this to check the winner, if onlyGamers == 1 and historical > 1 that's
                           // means more than one were connected and only one still play



// add a socket connection between the client and the server

let socket = require('socket.io'); // create a socket, relation between the erver and the client

let io = socket(server); // inside this object we call the function on to set up a connection event

io.sockets.on('connection', newConnection); // i dear with the first event : connection



function newConnection(socket){ // whena  connection

	socket.on('gameOver', function (){

			console.log("game over");

			console.log("game over");

			console.log("game over");
   			//socket.disconnect(0);
   			//socket.destroy();
   			//socket.end("end");
	});

	socket.on('sendToServer',newData); // waiting for the data event 



	function newData(data){
		//console.log("data server = "+ data.x+ " " + data.y);
		//let controller = new controller(gamers);
		const control = new Controller(gamers,data,historical,onlyGamers); // i pass historical and onlyGamers only to check														  // if we have only one player

		control.findGamer(socket);
		console.log("onlyGamers.size  : " + onlyGamers.size + " historical.size "+ historical.size );
		if(onlyGamers.size == 1 && historical.size > 1){ // i use onlyGamers because gamers contains the small circles also

				console.log("you win");
			io.sockets.emit("youWIn",gamers);


		}
		else{
			io.sockets.emit("sendToClient",Array.from(gamers));
		}

		
	}

}


