
const Circle = require('./circle');
class Model{


	constructor(gamers,position,historical,onlyGamers){

		

		this.update = (socket) =>{

			 let sourie = {
		    	x:0, // i have to change the fixed size width and height doesn't work for now
		    	y:0
		    };

		    sourie.x = position.x - position.wid/2;
		    sourie.y = position.y - position.hei/2;

		    sourie.x *= 0.02; // minimize the distance traveled, to avoid teleportation 
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


		function getRandomInt(min, max) {
		   min = Math.ceil(min);
		   max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
		}



  		this.createGamer =(socket)=> {



  				//position.x = position.wid;

  				//position.y = position.hei;

			let circle = new Circle(position.x,position.y,100);
			gamers.set(socket.id,circle);

			historical.set(socket.id,circle);
			onlyGamers.set(socket.id,circle);


			let idSmallCircles;
			let xSmallCircles;
			let ySmallCircles;
			let sRandom;

			//  nowi create all the others small circles with every player
			for (let i = 50; i >= 0; i--) {
			     idSmallCircles = socket.id + i;
			     //Math.random() * (max - min) + min
			     //xSmallCircles = Math.floor(Math.random() * (position.wid + position.wid + 1) -position.wid);  // to make the small circle every where
			     //ySmallCircles = Math.floor(Math.random() * (position.hei + position.hei + 1) -position.hei); // when i move the player
			    // xSmallCircles =  Math.random() * (position.wid - (- position.wid)) -position.wid;
			     //if(xSmallCircles < -position.wid)
			     	//xSmallCircles = position.wid;
			    // ySmallCircles = Math.random() * (position.hei - (- position.hei) )-position.hei;

			    xSmallCircles = getRandomInt(-position.wid,position.wid);
			    ySmallCircles = getRandomInt(-position.hei,position.hei);
			     sRandom = Math.floor(Math.random() * 50);
			     let smallCircle = new Circle(xSmallCircles,ySmallCircles,sRandom);

			     gamers.set(idSmallCircles,smallCircle);
			   
			  }


		}





		this.Compare =(socket)=> {
			let currentPlayer  = gamers.get(socket.id);
			let distance;


			for (var [key, value] of gamers) { 

			    //if(key != socket.id){ // to avoid the comparaison with him self( client), 
			    					// else the circle will grow all the time and also will delete him self
					// calculate distance between two points( circles)
			    	distance = Math.pow((currentPlayer.x-value.x),2)+ Math.pow((currentPlayer.y-value.y),2); 
			    	distance = Math.sqrt(distance);
			    	
					if(distance < currentPlayer.r/2 + value.r/2){ // if the distance between two circles less than sum of there rays
						if(key != socket.id)
						currentPlayer.r += value.r* 0.1;
						gamers.set(socket.id,currentPlayer);
					 
					if(currentPlayer.r < value.r){
					      	gamers.delete(socket.id);
					      	onlyGamers.delete(socket.id);
					  	/*	currentPlayer.colorR = 255;
						  	currentPlayer.colorG = 0;
						  	currentPlayer.colorB = 255;
						  	currentPlayer.r = 0;*/
					}
					else if(currentPlayer.r > value.r){ // i use this condition instead of else because if not less 
														// he will directely delete the other player even if the current
														// player is less then the other and olso will try with something hes been already deleted
						gamers.delete(key);
						if(onlyGamers.has(key)){
							onlyGamers.delete(key);
						}

					}
					
			 	}
			 //}

			}
		}
	}
}
module.exports = Model;