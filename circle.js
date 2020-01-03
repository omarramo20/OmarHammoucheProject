class Circle{

  constructor(x,y,rayon ) {
    //this.pos = createVector(x,y);

    this.x = x;
    this.y = y;
    this.r = rayon; // pour commencer
    this.colorR = Math.floor(Math.random() * 255);     
	this.colorG = Math.floor(Math.random() * 255);   
	this.colorB = Math.floor(Math.random() * 255);   
  
    
  /*this.colorR = random(255);
  this.colorG = random(255);
  this.colorB = random(255);*/

}

}
module.exports = Circle;