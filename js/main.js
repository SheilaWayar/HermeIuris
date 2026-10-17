// Buscador de glosario (filtra tarjetas en el cliente)
const buscadorGlosario = document.getElementById('buscar-termino');
if (buscadorGlosario) {
    buscadorGlosario.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('[data-termino]').forEach((el) => {
            el.parentElement.classList.toggle('d-none', !el.dataset.termino.toLowerCase().includes(q));
        });
    });
}

// Chatbot: respuestas rápidas a preguntas frecuentes
const chatLog = document.getElementById('chat-log');
document.querySelectorAll('[data-pregunta]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const add = (txt, user) => {
            const d = document.createElement('div');
            d.className = 'mb-2 ' + (user ? 'text-end' : '');
            const s = document.createElement('span');
            s.className = 'chat-msg' + (user ? ' user' : '');
            s.textContent = txt;
            d.appendChild(s);
            chatLog.appendChild(d);
        };
        add(btn.dataset.pregunta, true);
        add(btn.dataset.respuesta, false);
    });
});

// Foro: filtro por categoría
document.querySelectorAll('[data-filtro]').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filtro]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filtro;
        document.querySelectorAll('[data-categoria]').forEach((el) => {
            el.classList.toggle('d-none', cat !== 'Todas' && el.dataset.categoria !== cat);
        });
    });
});
