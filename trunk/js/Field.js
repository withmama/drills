function Field()
{
	this.minX = 1000;
	this.maxX = -1000;
	this.minY = 1000;
	this.maxY = -1000;
	
	this.spanPoint = function(x,y){
		if(x > this.maxX)this.maxX=x;
		if(x < this.minX)this.minX=x;
		if(y > this.maxY)this.maxY=y;
		if(y < this.minY)this.minY=y;
	}
	
	this.getWidth = function(){
		return this.maxX + this.minX;
	}
	
	this.getHeight = function(){
		return this.maxY + this.minY;
	}
}
