<?php
$titulo_pagina = "Chatbot Legal";
require_once 'includes/header.php';

$faq = [
    ['¿Qué es un hábeas corpus?', 'Es una garantía que protege tu libertad personal frente a detenciones ilegales.'],
    ['¿Cuánto tarda un juicio laboral?', 'Depende de la jurisdicción, pero suele llevar entre 1 y 3 años.'],
    ['¿Qué es una medida cautelar?', 'Una medida preventiva que protege un derecho mientras dura el proceso.'],
];
?>
<main class="container py-5" style="max-width:820px">
    <p class="eyebrow dark mb-1">Asistente</p>
    <h1 class="mb-1">Chatbot Legal</h1>
    <p class="text-secondary small mb-3">Orientación general. No reemplaza el asesoramiento de un abogado.</p>
    <div class="chat-box">
        <div class="chat-head"><strong>Asistente <?= htmlspecialchars($nombre_sitio) ?></strong><br><small class="opacity-75">En línea</small></div>
        <div class="p-3" id="chat-log" style="min-height:220px">
            <div class="mb-2"><span class="chat-msg">Hola, soy el asistente legal de <?= htmlspecialchars($nombre_sitio) ?>. Podés preguntarme sobre tus derechos o elegir una de las preguntas frecuentes.</span></div>
        </div>
        <div class="p-3 border-top d-flex flex-wrap gap-2">
            <?php foreach ($faq as [$p, $r]): ?>
                <button class="btn btn-sm btn-outline-dark rounded-pill" data-pregunta="<?= htmlspecialchars($p) ?>" data-respuesta="<?= htmlspecialchars($r) ?>"><?= $p ?></button>
            <?php endforeach; ?>
        </div>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
