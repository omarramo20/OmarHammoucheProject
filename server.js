

const Controller = require('./controller');
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

	//let circle = new Circle(900/2,900/2,50,50);
	//gamers.set(socket.id,circle);
	//socket.on('start',newData); // waiting for the start event : because i have to send the first position 

	socket.on('sendToServer',newData); // waiting for the data event 

	function newData(data){
		//console.log("data server = "+ data.x+ " " + data.y);
		//let controller = new controller(gamers);
		const control = new Controller(gamers,data);
		//console.log("gamers.size  "+gamers.size);
		/*let cir = new Circle(10,10,50);
		gamers.set(socket.id,cir);
		let newCordinates = gamers.get(socket);*/


		//console.log("newCordinates "+newCordinates);

		//console.log("size gamers : "+ gamers.size);


		control.findGamer(socket);
		//console.log("data position : "+ data.x + " "+ data.y);
		//let newCordinates = new Circle(10,10,10);
		newCordinates= gamers.get(socket.id);
		//console.log("newCordinates "+newCordinates);
		///console.log("size gamers : "+ gamers.size);
		//console.log("newCordinates : "+ newCordinates.x + " "+newCordinates.y + " "+newCordinates.r);
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		//console.log("jason : " + JSON.stringify(gamers));
		//let cc = Customer.findGamer(socket);
		io.sockets.emit("sendToClient",Array.from(gamers));
	}




	/*setInterval(heartBeat,100);

	function heartBeat(){
		let newCordinates= gamers.get(socket.id);
		io.sockets.emit("sendToClient",newCordinates);
	}*/











}


