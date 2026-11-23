## Clase 5 – Procesamiento de Formularios y Seguridad Web

Carpeta: [`clase5/`](./clase5)

Se incorporó lógica del lado del servidor (PHP) para capturar y procesar datos enviados desde el navegador, con sanitización estricta contra XSS (OWASP Top 10) y validación en servidor.

### Estructura

```
clase5/
├── index.php            # Portada de la entrega
├── contacto.php         # Formulario por POST
├── buscar.php           # Formulario por GET
├── includes/
│   ├── funciones.php    # sanitizar(), post(), get(), email_valido()
│   ├── header.php       # Cabecera modular (include/require)
│   └── footer.php       # Pie modular
└── css/estilos.css      # Estilos responsive
```

### Formularios creados

**1. Formulario de contacto – método POST (`contacto.php`)**
Campos: nombre, correo electrónico, asunto y mensaje.
- Validación: campos obligatorios (`empty()`), longitudes mínimas/máximas y formato de email (`filter_var` con `FILTER_VALIDATE_EMAIL`).
- Si hay errores: se muestra la lista de errores, cada campo inválido se resalta y **se conservan los datos ya escritos**.
- Si es exitoso: se muestra un mensaje de confirmación con el resumen de los datos recibidos.

**2. Buscador de contenidos – método GET (`buscar.php`)**
Parámetros: `q` (término) y `categoria` (opcional).
- Validación: término obligatorio, entre 2 y 50 caracteres; la categoría se valida contra una lista blanca.
- Muestra la cantidad de resultados, o un mensaje si no hay coincidencias o si hay errores. El término buscado queda cargado en el campo.

### Seguridad aplicada (XSS)

- Ninguna variable de `$_POST` o `$_GET` se procesa ni se imprime sin sanitizar.
- Lectura con `filter_input()`, y luego `trim()` + `htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`, centralizado en `includes/funciones.php`.
- Los valores que se vuelven a mostrar en los campos (persistencia) y en los mensajes salen ya escapados, por lo que un payload como `<script>alert(1)</script>` se muestra como texto y no se ejecuta.

### Capturas de pantalla

> Reemplazar las rutas por las capturas propias (guardarlas en `clase5/capturas/`).

| Caso | Captura |
|------|---------|
| Contacto: envío exitoso | ![Contacto exitoso](clase5/capturas/contacto-exito.png) |
| Contacto: errores de validación y datos conservados | ![Contacto errores](clase5/capturas/contacto-errores.png) |
| Contacto: intento de XSS mostrado como texto | ![Contacto XSS](clase5/capturas/contacto-xss.png) |
| Búsqueda GET: resultados | ![Búsqueda resultados](clase5/capturas/buscar-resultados.png) |
| Búsqueda GET: validación / sin resultados | ![Búsqueda error](clase5/capturas/buscar-error.png) |

### Cómo ejecutarlo

```bash
cd clase5
php -S localhost:8000
# abrir http://localhost:8000
```