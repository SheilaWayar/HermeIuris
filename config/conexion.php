<?php
/**
 * Conexión PDO a MySQL (TP N.º 7).
 * Las credenciales viven en config/db_config.php (ignorado por Git).
 * Deja disponible la variable $pdo para quien haga require_once de este archivo.
 */
$archivo_config = __DIR__ . '/db_config.php';

if (!is_file($archivo_config)) {
    http_response_code(500);
    die('Falta config/db_config.php. Copiá db_config.example.php como db_config.php y completá tus datos.');
}

$config = require $archivo_config;

$dsn = "mysql:host={$config['host']};dbname={$config['db']};charset={$config['charset']}";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // los errores lanzan excepciones
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,         // filas como arreglos asociativos
    PDO::ATTR_EMULATE_PREPARES   => false,                    // prepared statements reales del motor
];

try {
    $pdo = new PDO($dsn, $config['user'], $config['pass'], $options);
} catch (PDOException $e) {
    error_log('Error de conexión PDO: ' . $e->getMessage());
    http_response_code(500);
    if (!empty($config['debug'])) {
        die('Error crítico de conexión: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8'));
    }
    die('No se pudo conectar con la base de datos. Intentá más tarde.');
}