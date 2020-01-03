
const Model = require('./Model');
const Circle = require('./circle');



class Controller{


	constructor(gamers,position){

		let model = new Model(gamers,position);
		

		this.findGamer = (socket) => {
			if(gamers.has(socket.id)){
				gamers.get(socket.id);
				model.update(socket);
				model.Compare(socket);
			}
			else{
				model.createGamer(socket);
			}
		}


	}

}
module.exports = Controller;