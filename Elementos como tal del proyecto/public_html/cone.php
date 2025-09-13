<?php
$enlace = mysqli_connect('localhost', 'ctnas_fran', 'fran459', 'ctnas_bd');

if (!$enlace){
 exit("Error de Conexión ". mysqli_connect_error());
 }
?>