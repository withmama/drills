function Waypoint(x,y,t)
{
  this.x = x;
  this.y = y;
  this.t = t;
  
  this.add = function(wp){
    return new Waypoint(this.x + wp.x, this.y + wp.y, this.t + wp.t);
  }
  
  this.subtract = function(wp){
    return new Waypoint(this.x - wp.x, this.y - wp.y, this.t - wp.t);
  }
  
  this.multiply = function(c){
    return new Waypoint(this.x * c, this.y * c, this.t * c);
  }
  
}
