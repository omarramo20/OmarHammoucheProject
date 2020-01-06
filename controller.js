
const Model = require('./Model');
const Circle = require('./circle');   



class Controller{


	constructor(gamers,position,historical,onlyGamers){

		let model = new Model(gamers,position,historical,onlyGamers);
		

		this.findGamer = (socket) => {
			if(gamers.has(socket.id)){ // loop for the player
				gamers.get(socket.id);
				model.update(socket); // update  the positions
				model.Compare(socket); // see if a circle eats another circle
			}
			else{
				model.createGamer(socket); // crate the new player
			}
		}


	}

}
module.exports = Controller;