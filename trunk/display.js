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

function Hrac()
{
  this.waypoints = [];

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
  
  this.animate = function(){
    var elem = this.getElement();
    var cycle = 0;
    while(cycle*this.interval < this.limit)
    {
      for(var i in this.waypoints)
      {
        if(i>0)
        {
          if(cycle*this.interval + this.waypoints[i].t > this.limit)
          {
            if(this.id==7)console.log(cycle, cycle*this.interval, cycle*this.interval + this.waypoints[i].t, this.limit);
            return this;
          }
          elem = elem.animate(
            {left:this.waypoints[i].x,top:this.waypoints[i].y},
            this.waypoints[i].t - this.waypoints[i-1].t
            );
        }
      }
      cycle ++;
    }
    return this;
  }
}

function Drill(popis)
{
  this.popis = popis;
  this.hraci = [];
  this.field = new Field();
  
  this.parse = function(){
    hraci = this.popis.split("\n\n");
    this.limit = hraci[0];
    for(var i in hraci)
    {
      if(i>0)
      {
        lines = hraci[i].split("\n");
        hrac = new Hrac();
        hrac.color = lines[0];
        hrac.interval = parseInt(lines[1]);
        hrac.id = i;
        hrac.limit = parseInt(this.limit);
        for(var j in lines)
        {
          if(j>1)
          {
            data = lines[j].split(" ");
            if(!isNaN(data[0]) && !isNaN(data[1]) && !isNaN(data[2])){
            	hrac.addWaypoint(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
            	this.field.spanPoint(parseInt(data[0]), parseInt(data[1]));
            }
          }
        }
        hrac.addLastWP();
        this.hraci.push(hrac);
      }
    }
  }

  this.run = function(){
  	$('#playfield').width(this.field.getWidth()).height(this.field.getHeight());
    var html = '';
    for(var i in this.hraci)
    {
      html += this.hraci[i].getHtml();
    }
    $('#playfield').html(html);
    for(var i in this.hraci)
    {
      this.hraci[i].setup();
    }
    for(var i in this.hraci)
    {
      this.hraci[i].animate();
    }
    
  }
}

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

function runCode()
{
  drill = new Drill($('[name=popis]').val());
  drill.parse();
  drill.run();
}

