-- =====================================================================
-- TP N.º 8 - Ajustes de base de datos (ejecutar en phpMyAdmin, base hermeiuris)
-- =====================================================================
USE hermeiuris;

-- 1) Rol por defecto para los registros públicos (la consigna pide 'admin' / 'usuario')
INSERT INTO roles (nombre, descripcion)
SELECT 'usuario', 'Usuario registrado del sitio'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'usuario');

-- 2) Convertir en administrador a una cuenta YA registrada desde registro.php.
--    Cambiá el correo por el tuyo y ejecutá esto DESPUÉS de registrarte:
UPDATE usuarios
SET id_rol = (SELECT id_rol FROM roles WHERE nombre = 'admin')
WHERE email = 'tu_correo@ejemplo.com';

-- 3) Verificación: debe mostrar tu usuario con rol admin y un hash que empieza con $2y$
SELECT u.id_usuario, u.nombre, u.email, r.nombre AS rol, LEFT(u.password_hash, 7) AS inicio_hash
FROM usuarios u
INNER JOIN roles r ON r.id_rol = u.id_rol
ORDER BY u.id_usuario;