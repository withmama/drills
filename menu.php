<?php
if ($handle = opendir('.')) {
  while (false !== ($file = readdir($handle)))
  {
    if ($file != "." && $file != ".." && substr($file,-4)=='.txt')
    {
      $list [] = substr($file,0,strlen($file)-4);
    }
  }
  closedir($handle);
}
foreach($list as $item)
{
  $items_html []= '<a href="edit.php?drillname='.$item.'">'.$item.'</a>';
}
echo '<div>' . implode(' | ', $items_html) . '</div>';
?>
