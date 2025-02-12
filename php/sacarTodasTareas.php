<?php

require_once './conectar.php';

$sql = "SELECT * FROM lista";

$resultado = $conn->query($sql);

$tareas = [];

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $tareas[] = $row;
    }

    echo json_encode(['tareas' => $tareas]);
} else {
    echo json_encode(['error' => 'No hay tareas en la tabla tareas']);
}

$conn->close();
