
const Circle = require('./circle');
class Model{


	constructor(gamers,position){

		

		this.update = (socket) =>{

			 let sourie = {
		    	x:0, // i have to change the fixed size width and height doesn't work for now
		    	y:0
		    };

		    sourie.x = position.x - position.wid/2;
		    sourie.y = position.y - position.hei/2;

		    sourie.x *= 0.02; // to avoid teleportation , to minimize the distance traveled
		    sourie.y *= 0.02;

		    let gamer = gamers.get(socket.id);
		    //gamer.r = 
		    
		    let testX = gamer.x + sourie.x; // if the next coordinates
		    let testY = gamer.y + sourie.y;

		    // this test just to limite the x and y positions to stay in the canvas

		    if(testX <= position.wid && testX >=  -position.hei){ // !!!!!!!!!!!!!!!!!!!!
		    	gamer.x += sourie.x;
		    }
		    if(testY <= position.wid && testY >=  -position.hei){
		    	gamer.y += sourie.y;
		}   
		    gamers.set(socket.id,gamer);
  		}


  		this.createGamer =(socket)=> {


			  						//createCanvas(900,900);
  			//if(position.x > position.wid)
  				position.x = position.wid;

  			if(position.y > position.hei)
  				position.y = position.hei;

			let circle = new Circle(position.x,position.y,100);
			gamers.set(socket.id,circle);


			let idSmallCircles;
			let xSmallCircles;
			let ySmallCircles;
			let sRandom;
			//  nowi create all the others small circles with every player
			for (let i = 50; i >= 0; i--) {
			     idSmallCircles = socket.id +i;
			     // Math.floor(Math.random() * position.wid*)
			     xSmallCircles = Math.floor(Math.random() * (position.wid + position.wid + 1) -position.wid);  // to make the small circle every where
			     ySmallCircles = Math.floor(Math.random() * (position.hei + position.hei + 1) -position.hei); // when i move the player
			     sRandom = Math.floor(Math.random() * 30);
			     let smallCircle = new Circle(xSmallCircles,ySmallCircles,sRandom);

			     gamers.set(idSmallCircles,smallCircle);
			   
			  }


		}	

		this.deleteCircle =(key)=> {
			gamers.delete(key);
		}



		this.Compare =(socket)=> {
			let currentPlayer  = gamers.get(socket.id);
			let distance;


			for (var [key, value] of gamers) { 

			    if(key != socket.id){ // to avoid the comparaison with him self( client), 
			    					// else the circle will grow all the time and also will delete him self
					// calculate distance between two points( circles)
			    	distance = Math.pow((currentPlayer.x-value.x),2)+ Math.pow((currentPlayer.y-value.y),2); 
			    	distance = Math.sqrt(distance);
			    	
			    	console.log("");
			    	console.log("currentPlayer.r : "+currentPlayer.r+ " value.r : "+value.r);
			    	console.log("distance abs : "+ distance);
			    	console.log("both : "+ (value.r /2+ currentPlayer.r/2));

			    	console.log("gamers size "+ gamers.size);
			    	
					if(distance < currentPlayer.r/2 + value.r/2){
					    console.log("petite--------------------------------------------------------------------------------");
						currentPlayer.r += value.r* 0.1;
						gamers.set(socket.id,currentPlayer);
						console.log("distance abs : "+ distance);
					    //  if(key != socket.id) // to avoid the deletion of the play because the key will be the sam as the socket id
					if(currentPlayer.r < value.r){

					      	this.deleteCircle(socket.id);
					  	/*	currentPlayer.colorR = 255;
						  	currentPlayer.colorG = 0;
						  	currentPlayer.colorB = 255;
						  	currentPlayer.r = 0;*/
					}
					else
						this.deleteCircle(key);
					
			 	}
			 }

			}
		}
	}
}
module.exports = Model;