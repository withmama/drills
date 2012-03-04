function bindStart()
{
  $('#pause-button').html('START').unbind('click').click(function(){
    drill.parse();
    drill.run();
  });
}

$(document).ready(function(){
  drill = new Drill($('[name=popis]').val());
  bindStart();
  drill.setup();
});

