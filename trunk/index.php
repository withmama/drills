<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.pause.js"></script>
<script type="text/javascript" src="js/jquery.ui.core.js"></script>
<script type="text/javascript" src="js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="js/jquery.ui.mouse.js"></script>
<script type="text/javascript" src="js/jquery.ui.slider.js"></script>
<script type="text/javascript" src="js/Waypoint.js"></script>
<script type="text/javascript" src="js/Hrac.js"></script>
<script type="text/javascript" src="js/Drill.js"></script>
<script type="text/javascript" src="js/Field.js"></script>
<script type="text/javascript" src="js/display.js"></script>
<script type="text/javascript" src="js/edit.js"></script>
<link type="text/css" rel="stylesheet" href="style.css" />
<link type="text/css" rel="stylesheet" href="js/themes/smoothness/jquery.ui.all.css" />
<link type="text/css" rel="stylesheet" href="js/themes/smoothness/jquery.ui.base.css" />
<link type="text/css" rel="stylesheet" href="js/themes/smoothness/jquery.ui.core.css" />
<link type="text/css" rel="stylesheet" href="js/themes/smoothness/jquery.ui.slider.css" />
<body>
<?php require_once('menu.php'); ?>
<textarea name="popis" rows="20">
<?php
if(isset($_GET['drillname']))
{
  $filename = $_GET['drillname'];
  $filename = 'data/' . preg_replace("/[^a-z]+/", "", $filename) . '.txt';

  if(file_exists($filename))
  {
    echo file_get_contents($filename);
  }
}
?>
</textarea>
<div id="playfield"></div>
<div class="control-panel"><button id="pause-button">PLAY</button><div id="slider" class="slider"></div></div>
<button id="toggle-edit">start editing</button>
<div id="wpedit"></div>
</body>
