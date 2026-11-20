(() => {
    const input = document.getElementById('inputBusqueda');
    const contenedor = document.getElementById('resultados');
    if (!input || !contenedor) return;

    const URL_API = 'api/buscar_cursos.php';
    const IMAGEN_POR_DEFECTO = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500';
    const ESPERA_MS = 300;
    let temporizador = null;
    let controlador = null;

    function mensaje(texto, clase) {
        contenedor.replaceChildren();
        const p = document.createElement('p');
        p.className = clase;
        p.textContent = texto;
        contenedor.appendChild(p);
    }

    function crearTarjeta(curso) {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'card-ley overflow-hidden';

        const cuerpo = document.createElement('div');
        cuerpo.className = 'p-3';

        const etiqueta = document.createElement('span');
        etiqueta.className = 'tag';
        etiqueta.textContent = curso.area || 'General';

        const titulo = document.createElement('h2');
        titulo.className = 'fs-5 mt-2';
        titulo.textContent = curso.titulo;

        const enlace = document.createElement('a');
        enlace.href = 'curso.php?id=' + encodeURIComponent(curso.id_curso);
        enlace.className = 'btn btn-navy w-100';
        enlace.textContent = 'Ver curso';

        cuerpo.append(etiqueta, titulo);
        if (curso.descripcion) {
            const desc = document.createElement('p');
            desc.className = 'small text-secondary';
            desc.textContent = curso.descripcion;
            cuerpo.appendChild(desc);
        }
        cuerpo.appendChild(enlace);
        const imagen = document.createElement('img');
        imagen.className = 'course-img';
        imagen.loading = 'lazy';
        imagen.alt = curso.titulo;
        imagen.src = curso.imagen_url || IMAGEN_POR_DEFECTO;
        imagen.addEventListener('error', () => {
            if (imagen.src !== IMAGEN_POR_DEFECTO) imagen.src = IMAGEN_POR_DEFECTO;
        });

        card.append(imagen, cuerpo);
        col.appendChild(card);
        return col;
    }

    function mostrar(cursos) {
        if (cursos.length === 0) {
            mensaje('No se encontraron cursos.', 'text-secondary');
            return;
        }
        const fila = document.createElement('div');
        fila.className = 'row g-4';
        cursos.forEach(c => fila.appendChild(crearTarjeta(c)));
        contenedor.replaceChildren(fila);
    }

    async function buscar(texto) {
        if (controlador) controlador.abort();
        controlador = new AbortController();

        try {
            const resp = await fetch(`${URL_API}?q=${encodeURIComponent(texto)}`, {
                signal: controlador.signal,
                headers: { 'Accept': 'application/json' }
            });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const datos = await resp.json();
            mostrar(datos.cursos || []);
        } catch (err) {
            if (err.name === 'AbortError') return;
            console.error(err);
            mensaje('No se pudo completar la búsqueda. Intentá de nuevo.', 'text-danger');
        }
    }

    input.addEventListener('input', () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => buscar(input.value.trim()), ESPERA_MS);
    });

    buscar(''); // carga inicial: todos los cursos
})();