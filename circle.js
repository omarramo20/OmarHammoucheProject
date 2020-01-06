class Circle{

  constructor(x,y,diametre ) {
    //this.pos = createVector(x,y);  
 
    this.x = x;
    this.y = y;
    this.r = diametre;
    this.colorR = Math.floor(Math.random() * 255);     
	this.colorG = Math.floor(Math.random() * 255);   
	this.colorB = Math.floor(Math.random() * 255);   

}

}
module.exports = Circle;