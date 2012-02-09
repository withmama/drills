<?php
if ($handle = opendir('data')) {
  while (false !== ($file = readdir($handle)))
  {
    if ($file != "." && $file != ".." && substr($file,-4)=='.txt')
    {
      $list [] = substr($file,0,strlen($file)-4);
    }
  }
  closedir($handle);
}
sort($list);
foreach($list as $item)
{
  $items_html []= '<a class="' . ($_GET['drillname']==$item?'active':'') . '" href="'.$item.'/">'.$item.'</a>';
}
echo '<div>' . implode(' | ', $items_html) . '</div>';
?>
