<?php

$servername = "sql7.freesqldatabase.com";
$username = "sql7762333";
$password = "qsTbCn6QDM";
$dbname = "sql7762333"; // Nombre correcto de la BD

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo "No se ha establecido la conexion";
    die("Error de conexión: " . $conn->connect_error);
}

echo "Conexión exitosa";

?>
