<?php
/*  This file is part of Iain Hamiltons Isometric HTML5 App.

    Iain Hamiltons Isometric HTML5 App is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Iain Hamiltons Isometric HTML5 App is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Iain Hamiltons Isometric HTML5 App.  If not, see <http://www.gnu.org/licenses/>. */


// This PHP file echoes the contents of an image folder in the format of XML.
// It makes it faster to access a large number of individual tiles for loading in within JavaScript

header('Content-type: text/xml');

function returnimages($dirname) {
  $files = array();  
  if (strpos($dirname, '..') === false) {
    $pattern = "(\.jpg$)|(\.png$)|(\.jpeg$)|(\.gif$)";
      foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator(realpath("img/" . $dirname))) as $filepath) {
        if (eregi($pattern, $filepath)) {
          $file =  basename($filepath);
          array_push($files, "<file>" . str_replace($_SERVER["DOCUMENT_ROOT"], "", $filepath) . "</file>");
      }
    }
    natsort($files);
  }
  return $files;
}

echo '<files>';
  foreach (returnimages($_GET['folder']) as $file) {
    echo $file;
  }
echo '</files>';
?>