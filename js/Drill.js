function Drill(popis)
{
  this.popis = popis;
  this.hraci = [];
  this.field = new Field();
  this.paused = false;
  var drill = this;
  
  this.parse = function(){
    hraci = this.popis.split("\n\n");
    this.hraci = [];
    this.limit = hraci[0];
    for(var i in hraci)
    {
      if(i>0)
      {
        lines = hraci[i].split("\n");
        hrac = new Hrac();
        hrac.color = lines[0];
        hrac.interval = parseInt(lines[1]);
        hrac.id = i-1;
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
  
  this.export = function(){
    var text = '';
    text += this.limit + "\n\n";
    for(i in this.hraci){
      var hrac = this.hraci[i];
      text += hrac.color + "\n";
      text += hrac.interval + "\n";
      for(j in hrac.waypoints){
        var wp = hrac.waypoints[j];
        text += wp.x + " " + wp.y + " " + wp.t + "\n";
      }
      text += "\n";
    }
    return text;
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

