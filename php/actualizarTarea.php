<?php

require_once './conectar.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['estado'])) {
    $id = $data['id'];
    $estado = $data['estado'];

    if (!is_numeric($id)) {
        echo json_encode(['error' => 'El ID debe ser un número válido']);
        exit;
    }

    $sql = "UPDATE lista SET completada = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die(json_encode(['error' => 'Error en la preparación de la consulta: ' . $conn->error]));
    }

    $stmt->bind_param('ii', $estado, $id);

    if ($stmt->execute()) {
        echo json_encode(['exito' => 'Lista editada correctamente en el id: ' . $id]);
    } else {
        echo json_encode(['error' => 'Error al editar la lista']);
    }
}

if (isset($data['id']) && isset($data['fechaCompletada'])) {
    $id = $data['id'];
    $fechaCompletada = $data['fechaCompletada'];

    if (!is_numeric($id)) {
        echo json_encode(['error' => 'El ID debe ser un número válido']);
        exit;
    }

    $sql = "UPDATE lista SET fechaCompletada = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die(json_encode(['error' => 'Error en la preparación de la consulta: ' . $conn->error]));
    }

    $stmt->bind_param('si', $fechaCompletada, $id);

    if ($stmt->execute()) {
        echo json_encode(['exito' => 'Fecha completada actualizada correctamente en el id: ' . $id]);
    } else {
        echo json_encode(['error' => 'Error al actualizar la fecha completada']);
    }
} else {
    echo json_encode(['error' => 'Algún dato (id, estado, fechaCompletada) no existe o está mal estructurado']);
}

$conn->close();
?>
