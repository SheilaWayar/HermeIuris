<?php
// Conexión a MySQL en InfinityFree (PDO).
// Completá estos 4 datos con los que figuran en el panel: MySQL Databases.
$host    = 'sql206.infinityfree.com';        // "MySQL Host Name" del panel
$usuario = 'if0_43494049';                   // "MySQL User Name" del panel
$clave   = 'Rd3s689T6h';     // la contraseña de tu cuenta de hosting
$base    = 'if0_43494049_hermeiuris';        // nombre completo de la base, con el prefijo if0_...

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$base;charset=utf8mb4",
        $usuario,
        $clave,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $ex) {
    // Mensaje simple para no mostrar datos de conexión
    http_response_code(500);
    exit('No se pudo conectar a la base de datos. Revisá config/conexion.php');
}