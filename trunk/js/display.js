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

function Drill(popis)
{
  this.popis = popis;
  this.hraci = [];
  this.field = new Field();
  this.paused = false;
  var drill = this;
  
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
        //hrac.addLastWP();
        this.hraci.push(hrac);
      }
    }
  }

  this.setup = function(){
    this.parse();
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

  }

  this.pause = function(){
    for(var i in this.hraci)
    {
      this.hraci[i].pause();
    }
    this.paused = true;
    $('#pause-button').html('PLAY').unbind('click').click(function(){
      drill.resume();
    });
  }

  this.resume = function(){
    for(var i in this.hraci)
    {
      this.hraci[i].resume();
    }
    this.paused = false;
    $('#pause-button').html('PAUSE').unbind('click').click(function(){
      drill.pause();
    });
  }

  this.run = function(){
    for(var i in this.hraci)
    {
      this.hraci[i].animate(0,0);
    }
    $('#pause-button').html('PAUSE');
    $('#pause-button').unbind('click').click(function(){
      drill.pause();
    });
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

function bindStart()
{
  $('#pause-button').html('START').unbind('click').click(function(){
    drill = new Drill($('[name=popis]').val());
    drill.setup();
    drill.run();
  });
}

$(document).ready(function(){
  $('#slider').slider();
  bindStart();
  drill = new Drill($('[name=popis]').val());
  drill.setup();
});

