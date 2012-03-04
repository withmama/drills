function Hrac()
{
  this.id = 0;
  this.waypoints = [];
  var hrac = this;

  this.addWaypoint = function(x,y,t){
    this.waypoints.push(new Waypoint(x,y,t));
  }
  this.getHtml = function(){
    return "<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;background-color:" + this.color + "\" id=\"" + this.id + "\"></div>";
  }
  
  this.getElement = function(){
    return $('#' + this.id);
  }
  
  this.addLastWP = function(){
    for(var i in this.waypoints)
    {
      if(this.waypoints[i].t == 0)
      {
        this.addWaypoint(this.waypoints[i].x, this.waypoints[i].y, this.interval);
      }
    }
  }
  
  this.getWP = function(t){
    t = t % this.interval;
    var lastWP = new Waypoint(0,0,0);
    for(var i in this.waypoints)
    {
      if(this.waypoints[i].t == t)return this.waypoints[i];
      if(this.waypoints[i].t < t)lastWP = this.waypoints[i];
      if(this.waypoints[i].t > t)
      {
        var delta = this.waypoints[i].subtract(lastWP);
        var part = (t-lastWP.t) / (delta.t);
        var wp = lastWP.add(delta.multiply(part));
        return wp;
      }
    }
  }
  
  this.setup = function(){
    this.getElement().css('left',this.getWP(0).x);
    this.getElement().css('top',this.getWP(0).y);
  }

  this.pause = function(){
    var elem = this.getElement();
    elem.pause();
  }

  this.resume = function(){
    var elem = this.getElement();
    elem.resume();
  }
  
  this.animate = function(cycle,i){
    var elem = this.getElement();
    var nextI = (i+1)%this.waypoints.length;
    var nextCycle = cycle;
    if(nextI == 0)nextCycle++;
    var now = cycle * this.interval + this.waypoints[i].t;
    var then = nextCycle * this.interval + this.waypoints[nextI].t;
    if(now>=then){
      console.log('Fatal: animation time now='+now+', then='+then);
      console.log('Cycle='+cycle+', i='+i);
      console.log('Next cycle='+nextCycle+', nextI='+nextI);
      console.log(this);
    }

    if(nextCycle*this.interval + this.waypoints[nextI].t <= this.limit)
    {
      elem = elem.animate(
        {left:this.waypoints[nextI].x,top:this.waypoints[nextI].y},
        then - now,
        'linear',
        function(){
          hrac.animate(nextCycle,nextI);
        }        
      );
    }
    else
    {
      bindStart();
    }

    return this;
  }
}
