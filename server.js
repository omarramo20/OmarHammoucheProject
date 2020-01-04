

const Controller = require('./controller'); // import the class controller
const Circle = require('./circle');	

let express = require("express"); // import the framework express, the var express store a function

let app = express();

var server = app.listen(3000);

app.use(express.static('public')); // public , when public goes to my server , i want them to see this files, static means ...hosting static files ,
// here's my js files,here's my html files,  heres my html file , images, i wanna the app to use , to host everything in this public directory

console.log("server is running");

const gamers = new Map(); // let


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
		const control = new Controller(gamers,data);

		control.findGamer(socket);
		newCordinates= gamers.get(socket.id);

		io.sockets.emit("sendToClient",Array.from(gamers));
	}

}


