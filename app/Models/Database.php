<?php
/**
 * Maneja la conexión a la base de datos (una sola instancia PDO).
 */
class Database
{
    private static ?PDO $conexion = null;

    public static function conectar(): PDO
    {
        if (self::$conexion === null) {
            $c = require __DIR__ . '/../../config/db_config.php';

            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                $c['host'],
                $c['db'],
                $c['charset'] ?? 'utf8mb4'
            );

            self::$conexion = new PDO($dsn, $c['user'], $c['pass'], [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }

        return self::$conexion;
    }
}