<script type="text/javascript" src="jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="display.js"></script>
<body onload="runCode()">
<input type="hidden" name="popis" value="
<?php
if($_GET['drillname'])
{
  
  $filename = $_GET['drillname'];
  $filename = preg_replace("/[^a-z]+/", "", $filename) . '.txt';


  if(file_exists($filename))
  {
    echo file_get_contents($filename);
  }
}
?>" />
<div id="playfield"></div>
</body>
