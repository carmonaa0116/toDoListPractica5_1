<?php

require_once './conectar.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];
    $sql = "DELETE FROM lista WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die('Error en la preparación de la consulta: ' . $conn->error);
    }

    $stmt->bind_param('i', $id);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['exito' => 'Tarea borrada correctamente']);
    } else {
        echo json_encode(['error' => 'No se encontró una tarea con el id proporcionado']);
    }
} else {
    echo json_encode(['error' => 'El dato (id) no existe o está mal estructurado']);
}

$conn->close();
