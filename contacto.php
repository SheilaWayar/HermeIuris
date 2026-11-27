<?php
$page_title = "Contacto";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto</title>
</head>
<body>

<h1>Contacto</h1>

<form method="post" action="">
    <label>Nombre:</label><br>
    <input type="text" name="nombre" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Mensaje:</label><br>
    <textarea name="mensaje" rows="5" required></textarea><br><br>

    <button type="submit">Enviar</button>
</form>

</body>
</html>