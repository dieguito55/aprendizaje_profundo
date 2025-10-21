<?php
// ============================================================
// 🚀 DermApp - Enviar imagen validada al backend de Render
// ============================================================

$API_URL = "https://dermapp-backend.onrender.com/api/nueva_imagen";
$API_KEY = "TU_API_KEY_SECRETA"; // Debe coincidir con la del backend Render

// Datos recibidos (por POST o manual)
$nombre = $_POST['nombre_archivo'] ?? null;
$clase = $_POST['clase'] ?? null;
$ruta = $_POST['ruta'] ?? null;

if (!$nombre || !$clase || !$ruta) {
    die(json_encode(["status" => "error", "message" => "Datos incompletos."]));
}

// Crear JSON
$data = json_encode([
    "nombre_archivo" => $nombre,
    "clase" => $clase,
    "ruta" => $ruta
]);

// Enviar al backend de Render
$ch = curl_init($API_URL);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $API_KEY
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Mostrar respuesta
echo $response;
?>