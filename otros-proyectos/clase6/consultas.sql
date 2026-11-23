-- =====================================================================
-- TP N.º 6 - Consultas de prueba CRUD de Herme Iuris
-- Ejecutar DESPUÉS de schema.sql
-- =====================================================================
USE hermeiuris;

-- =====================================================================
-- CREATE: datos iniciales
-- =====================================================================

-- Tablas maestras
INSERT INTO roles (nombre, descripcion) VALUES
    ('admin',      'Gestiona contenidos y usuarios del sitio'),
    ('estudiante', 'Accede a cursos y participa en el foro');

INSERT INTO areas_derecho (nombre, descripcion) VALUES
    ('Civil',   'Relaciones entre personas: contratos, familia, propiedad'),
    ('Laboral', 'Derechos y obligaciones entre trabajadores y empleadores'),
    ('Penal',   'Delitos, penas y garantías del proceso');

INSERT INTO categorias_foro (nombre) VALUES
    ('Consultas generales'),
    ('Derecho laboral');

INSERT INTO jurisdicciones (ambito, nombre) VALUES
    ('nacional',   'Corte Suprema de Justicia de la Nación'),
    ('provincial', 'Salta');

-- Usuarios (los hashes son de ejemplo; en el TP7 se generan con password_hash())
INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash) VALUES
    ((SELECT id_rol FROM roles WHERE nombre = 'admin'),
     'Ana', 'Gómez', 'ana@example.com',
     '$2y$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ0123456'),
    ((SELECT id_rol FROM roles WHERE nombre = 'estudiante'),
     'Lucía', 'Pérez', 'lucia@example.com',
     '$2y$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ0123457');

-- Tabla principal: temas del foro (vinculan usuario y categoría)
INSERT INTO temas_foro (id_usuario, id_categoria, titulo, contenido) VALUES
    ((SELECT id_usuario FROM usuarios WHERE email = 'lucia@example.com'),
     (SELECT id_categoria FROM categorias_foro WHERE nombre = 'Derecho laboral'),
     '¿Cuántos días de vacaciones me corresponden?',
     'Trabajo hace 4 años en relación de dependencia. ¿Cómo se calculan mis días de vacaciones?'),
    ((SELECT id_usuario FROM usuarios WHERE email = 'ana@example.com'),
     (SELECT id_categoria FROM categorias_foro WHERE nombre = 'Consultas generales'),
     'Bienvenidos al foro de Herme Iuris',
     'Espacio para consultas y debate. Recordá que el contenido es orientativo.');

-- Cursos e inscripción (tabla N:M)
INSERT INTO cursos (id_area, titulo, descripcion) VALUES
    ((SELECT id_area FROM areas_derecho WHERE nombre = 'Civil'),
     'Introducción al Derecho Civil', 'Conceptos básicos de personas, contratos y familia'),
    ((SELECT id_area FROM areas_derecho WHERE nombre = 'Laboral'),
     'Derecho Laboral Básico', 'Contrato de trabajo, vacaciones, licencias e indemnizaciones');

INSERT INTO inscripciones (id_usuario, id_curso) VALUES
    ((SELECT id_usuario FROM usuarios WHERE email = 'lucia@example.com'),
     (SELECT id_curso FROM cursos WHERE titulo = 'Introducción al Derecho Civil')),
    ((SELECT id_usuario FROM usuarios WHERE email = 'lucia@example.com'),
     (SELECT id_curso FROM cursos WHERE titulo = 'Derecho Laboral Básico'));

-- Registro de prueba que se va a eliminar más abajo (DELETE)
INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) VALUES
    ('Visitante de prueba', 'prueba@example.com', 'Mensaje de prueba',
     'Este registro se crea solo para probar el DELETE.');

-- =====================================================================
-- READ
-- =====================================================================

-- 1) SELECT con WHERE y ORDER BY: temas abiertos, del más nuevo al más viejo
SELECT id_tema, titulo, estado, created_at
FROM temas_foro
WHERE estado = 'abierto'
ORDER BY created_at DESC, id_tema DESC;

-- 2) INNER JOIN (3 tablas): tema + autor + categoría
SELECT t.titulo,
       CONCAT(u.nombre, ' ', u.apellido) AS autor,
       c.nombre                          AS categoria,
       t.estado
FROM temas_foro t
INNER JOIN usuarios        u ON u.id_usuario   = t.id_usuario
INNER JOIN categorias_foro c ON c.id_categoria = t.id_categoria
ORDER BY t.titulo;

-- 3) INNER JOIN (N:M): cursos en los que está inscripta cada persona, con su área
SELECT CONCAT(u.nombre, ' ', u.apellido) AS estudiante,
       cu.titulo                         AS curso,
       a.nombre                          AS area,
       i.fecha_inscripcion
FROM inscripciones i
INNER JOIN usuarios      u  ON u.id_usuario = i.id_usuario
INNER JOIN cursos        cu ON cu.id_curso  = i.id_curso
INNER JOIN areas_derecho a  ON a.id_area    = cu.id_area
WHERE u.email = 'lucia@example.com'
ORDER BY cu.titulo;

-- =====================================================================
-- UPDATE: cerrar un tema puntual (siempre con WHERE)
-- =====================================================================
UPDATE temas_foro
SET estado = 'cerrado'
WHERE titulo = 'Bienvenidos al foro de Herme Iuris';

-- Verificación
SELECT id_tema, titulo, estado, updated_at
FROM temas_foro
WHERE titulo = 'Bienvenidos al foro de Herme Iuris';

-- =====================================================================
-- DELETE: dar de baja el registro de prueba (siempre con WHERE)
-- =====================================================================
DELETE FROM mensajes_contacto
WHERE email = 'prueba@example.com'
  AND asunto = 'Mensaje de prueba';

-- Verificación: debe devolver 0
SELECT COUNT(*) AS mensajes_de_prueba_restantes
FROM mensajes_contacto
WHERE email = 'prueba@example.com';