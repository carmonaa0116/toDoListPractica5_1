<?php

require_once './conectar.php';

$data = json_decode(file_get_contents('php://input'), true);
$conexion = $conn;

if (isset($data['descripcion']) && isset($data['fechaAsignada'])) {
    $descripcion = $data['descripcion'];
    $fechaAsignada = $data['fechaAsignada'];

    // Insertar la tarea en la tabla
    $sql = "INSERT INTO lista (descripcion, fechaAsignada) VALUES (?,?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        die('Error en la preparación de la consulta: ' . $conexion->error);
    }

    $stmt->bind_param('ss', $descripcion, $fechaAsignada);

    if ($stmt->execute()) {

        $lastId = $conexion->insert_id;

        echo json_encode(['exito' => 'Tarea insertada correctamente', 'id' => $lastId]);
    } else {
        echo json_encode(['error' => 'Error al insertar la tarea']);
    }
} else if (isset($data['descripcion'])) {
    $descripcion = $data['descripcion'];

    $sql = "INSERT INTO lista (descripcion) VALUES (?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        die('Error en la preparación de la consulta: ' . $conexion->error);
    }

    $stmt->bind_param('s', $descripcion);

    if ($stmt->execute()) {

        $lastId = $conexion->insert_id;

        echo json_encode(['exito' => 'Tarea insertada correctamente', 'id' => $lastId]);
    } else {
        echo json_encode(['error' => 'Error al insertar la tarea']);
    }
} else {
    echo json_encode(['error' => 'Descripcion no proporcionada']);
}
$conexion->close();