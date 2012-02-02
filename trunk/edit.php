<script type="text/javascript" src="jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="display.js"></script>
<link type="text/css" rel="stylesheet" href="style.css" />
<body>
<!--
<label for="nazov">Nazov:</label><input type="text" name="nazov" size="6" id="nazov" value="<?php echo $_GET['drillname']; ?>"/>
-->
<input type="submit" value="try the code:" onclick="runCode()"/><br/>
<textarea name="popis" rows="20">
<?php
if(isset($_GET['drillname']))
{
  
  $filename = $_GET['drillname'];
  $filename = preg_replace("/[^a-z]+/", "", $filename) . '.txt';


  if(file_exists($filename))
  {
    echo file_get_contents($filename);
  }
}
?>
</textarea>
<div style="position:absolute;top:0px;left:200px;" id="playfield"></div>
</body>
