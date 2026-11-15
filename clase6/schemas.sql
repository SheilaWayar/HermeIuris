-- =====================================================================
-- TP N.º 6 - Esquema relacional de Herme Iuris
-- Ejecutable en MySQL (XAMPP / phpMyAdmin / Laragon)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS hermeiuris
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE hermeiuris;

-- ---------------------------------------------------------------------
-- Tablas maestras
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS roles (
    id_rol      INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(30)  NOT NULL UNIQUE,
    descripcion VARCHAR(150) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS areas_derecho (
    id_area     INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(60)  NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL,
    imagen_url  VARCHAR(255) NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categorias_foro (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre       VARCHAR(60) NOT NULL UNIQUE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS jurisdicciones (
    id_jurisdiccion INT AUTO_INCREMENT PRIMARY KEY,
    ambito          ENUM('nacional','provincial') NOT NULL,
    nombre          VARCHAR(80) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_jurisdiccion (ambito, nombre)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Usuarios (autenticación, rol y datos personales)
-- password_hash guarda el resultado de password_hash() de PHP (nunca texto plano)
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario    INT AUTO_INCREMENT PRIMARY KEY,
    id_rol        INT          NOT NULL,
    nombre        VARCHAR(60)  NOT NULL,
    apellido      VARCHAR(60)  NOT NULL,
    email         VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono      VARCHAR(30)  NULL,
    activo        TINYINT(1)   NOT NULL DEFAULT 1,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuarios_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Tablas principales de negocio
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS temas_foro (
    id_tema      INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario   INT          NOT NULL,
    id_categoria INT          NOT NULL,
    titulo       VARCHAR(150) NOT NULL,
    contenido    TEXT         NOT NULL,
    estado       ENUM('abierto','cerrado') NOT NULL DEFAULT 'abierto',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_temas_usuario   FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_temas_categoria FOREIGN KEY (id_categoria) REFERENCES categorias_foro(id_categoria)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS respuestas_foro (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    id_tema      INT  NOT NULL,
    id_usuario   INT  NOT NULL,
    contenido    TEXT NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_resp_tema    FOREIGN KEY (id_tema)    REFERENCES temas_foro(id_tema)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_resp_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS noticias (
    id_noticia   INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario   INT          NOT NULL,
    id_area      INT          NOT NULL,
    titulo       VARCHAR(200) NOT NULL,
    resumen      VARCHAR(500) NOT NULL,
    analisis     TEXT         NULL,
    publicada_en DATE         NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_noticias_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_noticias_area    FOREIGN KEY (id_area)    REFERENCES areas_derecho(id_area)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fallos (
    id_fallo        INT AUTO_INCREMENT PRIMARY KEY,
    id_jurisdiccion INT          NOT NULL,
    id_area         INT          NOT NULL,
    caratula        VARCHAR(200) NOT NULL,
    tribunal        VARCHAR(120) NOT NULL,
    fecha_fallo     DATE         NOT NULL,
    resumen         TEXT         NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_fallos_jurisdiccion FOREIGN KEY (id_jurisdiccion) REFERENCES jurisdicciones(id_jurisdiccion)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_fallos_area         FOREIGN KEY (id_area)         REFERENCES areas_derecho(id_area)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS terminos (
    id_termino INT AUTO_INCREMENT PRIMARY KEY,
    id_area    INT          NULL,
    termino    VARCHAR(80)  NOT NULL UNIQUE,
    definicion VARCHAR(600) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_terminos_area FOREIGN KEY (id_area) REFERENCES areas_derecho(id_area)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cursos (
    id_curso    INT AUTO_INCREMENT PRIMARY KEY,
    id_area     INT          NOT NULL,
    titulo      VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    imagen_url  VARCHAR(255) NULL,
    activo      TINYINT(1)   NOT NULL DEFAULT 1,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cursos_area FOREIGN KEY (id_area) REFERENCES areas_derecho(id_area)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Tabla de relación N:M (usuarios <-> cursos)
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS inscripciones (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     INT NOT NULL,
    id_curso       INT NOT NULL,
    fecha_inscripcion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_inscripcion (id_usuario, id_curso),
    CONSTRAINT fk_insc_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_insc_curso   FOREIGN KEY (id_curso)   REFERENCES cursos(id_curso)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Formulario de contacto (clase5/contacto.php); el usuario es opcional
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT          NULL,
    nombre     VARCHAR(60)  NOT NULL,
    email      VARCHAR(120) NOT NULL,
    asunto     VARCHAR(100) NOT NULL,
    mensaje    TEXT         NOT NULL,
    leido      TINYINT(1)   NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_contacto_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Índices de rendimiento (filtros frecuentes del sitio)
-- ---------------------------------------------------------------------

-- Filtro del foro por categoría y estado
CREATE INDEX idx_temas_categoria_estado ON temas_foro (id_categoria, estado);
-- Listado de actualidad: noticias más recientes
CREATE INDEX idx_noticias_publicada ON noticias (publicada_en);
-- Jurisprudencia: búsqueda por fecha y por jurisdicción
CREATE INDEX idx_fallos_fecha ON fallos (fecha_fallo);
CREATE INDEX idx_fallos_jurisdiccion ON fallos (id_jurisdiccion);
-- Apellido de usuarios (búsquedas desde el panel de administración)
CREATE INDEX idx_usuarios_apellido ON usuarios (apellido);