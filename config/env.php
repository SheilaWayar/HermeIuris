<?php
/**
 * Carga las variables de entorno desde .env (o .env.example si no existe)
 * y las expone como constantes y variables globales.
 */
function cargar_env(string $ruta): array
{
    $vars = [];
    if (!is_readable($ruta)) {
        return $vars;
    }
    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        $linea = trim($linea);
        if ($linea === '' || $linea[0] === '#' || !str_contains($linea, '=')) {
            continue;
        }
        [$clave, $valor] = explode('=', $linea, 2);
        $vars[trim($clave)] = trim(trim($valor), "\"'");
    }
    return $vars;
}

$raiz = dirname(__DIR__);
$env = cargar_env($raiz . '/.env') ?: cargar_env($raiz . '/.env.example');

define('APP_NAME', $env['APP_NAME'] ?? 'Herme Iuris');
define('APP_EMAIL', $env['APP_EMAIL'] ?? 'contacto@example.com');
define('APP_ENV', $env['APP_ENV'] ?? 'local');

$nombre_sitio = APP_NAME;
$email_contacto = APP_EMAIL;

if (APP_ENV === 'local') {
    ini_set('display_errors', '1');
    error_reporting(E_ALL);
}
