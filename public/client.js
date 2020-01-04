

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
		r:0,
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


	background(51,264,255); //	background(51,264,255);

	let move ; // i use this to move canvas

    // i don't know why i can't acces directely to the value with the socket id
	// that after i used json format , so i loop for all the map
    for (var [key, value] of gamers) {
    	if(key == clientSocket.id)
    		move = value;
    }

    if(gamers.size > 0 && typeof move == 'undefined') { // to check if there is nor return value
		// from the server in case the player lost i delete it from the map of players(gamers)
			

       		//clientSocket.emit("gameOver","nothing");
       		;
       		fill(0); // i have to do that in the client !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       		textSize(50);
			text("GAME OVER", wid/2, hei/2, 300, 300);
			clientSocket.disconnect(0)
			//clientSocket.emit("gameOver","nothing");
      		//clientSocket.destroy();
    }
       
    if(gamers.size > 0 && typeof move != 'undefined'){ // in the first time the map is empty 
       													  // so avoid the crush, i did this 
       													 // in the first time , it doesn't recognize the attributes x,y ... cause it's empty
  		// function that shift the origine
       	// so it take care to put the circle(x,y) in the midle
       	//half - any position of x take of origon to this difference difference
  		translate(wid/2-move.x,hei/2-move.y); 
  	}
  		// to print all the circles
	for (var [key, value] of gamers) { // loop to every object
					/*if(value.r == 0){
						
					}else{*/
		fill(value.colorR,value.colorG,value.colorB);
		ellipse(value.x,value.y,value.r,value.r);	
					
	}
		   // send the new data
	send();


}
