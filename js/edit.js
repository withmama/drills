function bindStartEditPlayer(){
  $('button.edit-player').click(function(){
      
      $('#playfield').html('<canvas id="playfield-canvas" width="'+drill.field.getWidth()+'" height="'+drill.field.getHeight()+'"></canvas>');
      var canvas = $('#playfield-canvas');
      var ctx = canvas[0].getContext("2d");
      ctx.beginPath();
      
      var hrac = drill.hraci[$(this).attr('playerid')];
      var html = "Player " + hrac.id + "<br/>"
      html += 'Color: <input class="color-picker" value="' + hrac.color + '"></input><br/>';
      for(j in hrac.waypoints){
        var wp = hrac.waypoints[j];
        html += '<input class="x" value="'+wp.x+'"></input>:<input class="y" value="'+wp.y+'"></input>';
        html += '<input class="t" value="'+wp.t+'"><br/>';
        if(j==0){
          ctx.moveTo(wp.x,wp.y);
          console.log('ctx.moveTo('+wp.x+','+wp.y+');');
        }else{
          ctx.lineTo(wp.x,wp.y);
          console.log('ctx.lineTo('+wp.x+','+wp.y+');');
        }
      }
      ctx.stroke();
      $('.player-detail').html(html);
    });
}

function bindStartEditing(){
  $('#toggle-edit').html('EDIT').unbind('click').click(function(){
    console.log('started editing');
    $('#pause-button').attr("disabled", true);
    drill.parse();
    $('#wpedit').html('<div class="player-chooser"></div><div class="player-detail"></div>');
    for(var i in drill.hraci){
      $('.player-chooser').append('<button class="edit-player" playerid="'+i+'">'+i+"</button> ");
      drill.hraci[i].getElement().html(i);
    }
    bindStartEditPlayer();
    bindStopEditing();
  });
}

function bindStopEditing(){
  $('#toggle-edit').html('DONE').unbind('click').click(function(){
    console.log('done editing');
    $('#pause-button').removeAttr("disabled");
    $('#wpedit').html('');
    for(var i in drill.hraci){
      drill.hraci[i].getElement().html('');
    }
    // save
    bindStartEditing();
  });
}

$(document).ready(function(){
  bindStartEditing();
});
