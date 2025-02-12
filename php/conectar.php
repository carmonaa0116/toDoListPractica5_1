<?php

$servername = "sql209.infinityfree.com";
$username = "if0_38256311";
$password = "YMzHkeF1hTqY7e";
$dbname = "if0_38256311_todolist"; // Nombre correcto de la BD

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo "No se ha establecido la conexion";
    die("Error de conexión: " . $conn->connect_error);
}

echo "Conexión exitosa";

?>
