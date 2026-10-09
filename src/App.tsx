import { useState, type CSSProperties } from "react";

type Page =
  | "home"
  | "actualidad"
  | "foro"
  | "cuenta"
  | "cursos"
  | "terminologia"
  | "chatbot"
  | "jurisprudencia-nacional"
  | "jurisprudencia-provincial"
  | "buscador";

const NIGHT = "#08142B";
const NAVY = "#0F2342";
const NAVY_DARK = "#0A1830";
const PANEL = "#0A1A33";
const GOLD = "#C5A059";
const GOLD_TEXT = "#8A6A1F";
const BORDER = "#D3DAE6";

const AREAS = [
  { icon: "⚖️", title: "Derecho Civil", desc: "Relaciones entre particulares, contratos, alquileres y daños.", to: "foro" as Page },
  { icon: "👷", title: "Derecho Laboral", desc: "Derechos del trabajador, despidos, teletrabajo e indemnizaciones.", to: "actualidad" as Page },
  { icon: "👨‍👩‍👧", title: "Familia y Sucesiones", desc: "Divorcios, filiación, herencias y vínculos familiares.", to: "cursos" as Page },
  { icon: "🏢", title: "Derecho Comercial", desc: "Actividad empresarial, sociedades y contratos comerciales.", to: "terminologia" as Page },
];

const MORE_AREAS = ["Penal", "Constitucional", "Procesal", "Administrativo", "Tributario", "Consumidor", "Ambiental", "Informativo"];

const TRUST = [
  { icon: "🛡️", title: "Contenido verificado", desc: "Fallos y fuentes revisadas" },
  { icon: "👤", title: "Pensado para vos", desc: "Lenguaje simple y claro" },
  { icon: "⚖️", title: "Jurisprudencia actual", desc: "Nacional y provincial" },
  { icon: "🔒", title: "Tus datos protegidos", desc: "Privacidad ante todo" },
];

const DICTIONARY_TERMS = [
  { term: "Acción", def: "Derecho de acudir ante un juez para pedir protección." },
  { term: "Allanamiento", def: "Ingreso autorizado por un juez a un domicilio." },
  { term: "Cautelar", def: "Medida preventiva para proteger un derecho." },
  { term: "Demanda", def: "Escrito que inicia un proceso judicial." },
  { term: "Fuero", def: "Jurisdicción competente según la materia." },
  { term: "Hábeas Corpus", def: "Garantía para proteger la libertad personal." },
  { term: "Indagatoria", def: "Declaración del imputado ante el juez." },
  { term: "Jurisprudencia", def: "Conjunto de fallos que crean precedente." },
];

const EXTRA_TERMS = [
  { term: "Prescripción", def: "Extinción de una acción legal por el paso del tiempo sin ejercerla." },
  { term: "Querella", def: "Denuncia formal que hace la víctima de un delito ante el juez." },
  { term: "Sentencia", def: "Resolución definitiva del juez que pone fin a un juicio." },
  { term: "Apelación", def: "Recurso para que un tribunal superior revise una sentencia." },
  { term: "Nulidad", def: "Declaración de invalidez de un acto jurídico." },
  { term: "Tutela", def: "Institución que protege a menores o incapaces sin padres." },
  { term: "Fideicomiso", def: "Contrato por el cual una persona transfiere bienes para un fin determinado." },
  { term: "Homologación", def: "Aprobación judicial de un acuerdo entre partes." },
];

type Comment = { user: string; text: string; time: string };

const NEWS: {
  id: number;
  title: string;
  date: string;
  tag: string;
  summary: string;
  analysis: string;
  comments: Comment[];
}[] = [
  {
    id: 1,
    title: "La Corte Suprema amplió el alcance del hábeas corpus colectivo",
    date: "10 sep 2026",
    tag: "Constitucional",
    summary: "El máximo tribunal resolvió que el hábeas corpus puede presentarse de forma colectiva cuando afecta a grupos vulnerables, ampliando el acceso a la justicia.",
    analysis: "Este fallo sienta un precedente clave: consolida la doctrina de los derechos colectivos en el ámbito de la libertad ambulatoria. Implica que organizaciones de derechos humanos pueden actuar en representación de grupos sin necesidad de individualizar a cada afectado.",
    comments: [
      { user: "Martina García", text: "¡Por fin una resolución que reconoce la realidad social!", time: "hace 2 h" },
      { user: "Lucas Fernández", text: "Importante que se expliquen los alcances prácticos.", time: "hace 5 h" },
    ],
  },
  {
    id: 2,
    title: "Nuevo fallo sobre indemnización por accidente de tránsito",
    date: "8 sep 2026",
    tag: "Civil",
    summary: "La Cámara Civil fijó criterios para calcular el daño psicológico en accidentes viales, aumentando el monto de las indemnizaciones reconocidas.",
    analysis: "La sentencia incorpora los estándares de la OMS sobre daño psíquico y establece que el peritaje psicológico es prueba esencial en estos casos. Afecta directamente a aseguradoras y víctimas de siniestros.",
    comments: [{ user: "Sofía Romero", text: "¿Esto aplica para accidentes anteriores a 2025?", time: "hace 1 d" }],
  },
  {
    id: 3,
    title: "Reforma en el régimen de trabajo remoto: nuevas obligaciones patronales",
    date: "5 sep 2026",
    tag: "Laboral",
    summary: "La Cámara Laboral interpretó la ley de teletrabajo y amplió las obligaciones del empleador respecto a la provisión de equipamiento y conectividad.",
    analysis: "El fallo establece que el empleador debe cubrir el 100% del costo de internet cuando el trabajo remoto es obligatorio. Las empresas tienen 60 días para adecuarse a esta interpretación.",
    comments: [],
  },
];

const FORUM_TOPICS = [
  { id: 1, title: "¿Puede una empresa despedir a un empleado por publicaciones en redes sociales?", replies: 23, cat: "Laboral", author: "Pablo V.", time: "hace 1 h" },
  { id: 2, title: "Alquiler: ¿el propietario puede entrar sin permiso?", replies: 41, cat: "Civil", author: "Ana M.", time: "hace 3 h" },
  { id: 3, title: "Menores y redes sociales: ¿responsabilidad de los padres?", replies: 17, cat: "Familia", author: "Camila R.", time: "hace 6 h" },
  { id: 4, title: "¿Cuándo un contrato verbal tiene validez legal?", replies: 55, cat: "Comercial", author: "Diego S.", time: "hace 1 d" },
  { id: 5, title: "Multas de tránsito: ¿cómo impugnarlas?", replies: 38, cat: "Administrativo", author: "Romina P.", time: "hace 2 d" },
];

const COURSES = [
  { title: "Introducción al Derecho para No Abogados", level: "Básico", duration: "6 hs", lessons: 8, img: "photo-1434030216411-0b793f4b4173" },
  { title: "Tus Derechos como Consumidor", level: "Básico", duration: "4 hs", lessons: 5, img: "photo-1556742049-0cfed4f6a45d" },
  { title: "Derecho Laboral: Conocé tus Derechos", level: "Intermedio", duration: "8 hs", lessons: 10, img: "photo-1521737711867-e3b97375f902" },
  { title: "Cómo Leer un Contrato", level: "Básico", duration: "3 hs", lessons: 4, img: "photo-1507679799987-c73779587ccf" },
  { title: "Familia y Derecho: Separaciones y Herencias", level: "Intermedio", duration: "10 hs", lessons: 12, img: "photo-1511895426328-dc8714191011" },
  { title: "Privacidad y Datos Personales en la Era Digital", level: "Avanzado", duration: "5 hs", lessons: 7, img: "photo-1550751827-4bd374c3f58b" },
];

const JURISPRUDENCIA_NAC = [
  { tribunal: "Corte Suprema de Justicia", expediente: "CSJ 1234/2026", tema: "Hábeas Corpus Colectivo", fecha: "10/09/2026", materia: "Constitucional" },
  { tribunal: "Cámara Nacional de Apelaciones Civil", expediente: "CNA 5678/2026", tema: "Daño Psicológico en Accidentes", fecha: "08/09/2026", materia: "Civil" },
  { tribunal: "Cámara Nacional de Trabajo", expediente: "CNT 9012/2026", tema: "Teletrabajo y Equipamiento", fecha: "05/09/2026", materia: "Laboral" },
  { tribunal: "Cámara Federal de Seguridad Social", expediente: "CFSS 3456/2026", tema: "Jubilación Anticipada", fecha: "02/09/2026", materia: "Previsional" },
  { tribunal: "Cámara Nacional Comercial", expediente: "CNC 7890/2026", tema: "Concursos y Quiebras", fecha: "29/08/2026", materia: "Comercial" },
];

const JURISPRUDENCIA_PROV = [
  { tribunal: "Suprema Corte Buenos Aires", expediente: "SCBA 111/2026", tema: "Violencia de Género y Medidas Cautelares", fecha: "09/09/2026", materia: "Familia", provincia: "Buenos Aires" },
  { tribunal: "TSJ Córdoba", expediente: "TSJ-CBA 222/2026", tema: "Contrato de Locación Comercial", fecha: "07/09/2026", materia: "Civil", provincia: "Córdoba" },
  { tribunal: "STJ Santa Fe", expediente: "STJ-SF 333/2026", tema: "Responsabilidad Municipal", fecha: "04/09/2026", materia: "Administrativo", provincia: "Santa Fe" },
  { tribunal: "TSJ Mendoza", expediente: "TSJ-MZA 444/2026", tema: "Derecho de Aguas", fecha: "01/09/2026", materia: "Ambiental", provincia: "Mendoza" },
];

const CHATBOT_QA = [
  { q: "¿Puedo grabar una conversación sin permiso?", a: "En Argentina, grabar una conversación en la que participas no es delito, pero usarla con fines de extorsión o publicarla sin consentimiento puede configurar otros delitos (art. 153 bis CP)." },
  { q: "¿Cuánto tiempo tengo para reclamar por un producto defectuoso?", a: "Según la Ley de Defensa del Consumidor (Ley 24.240), tenés 3 meses para reclamar la garantía legal desde que descubrís el defecto, con un plazo total de 6 meses desde la compra." },
  { q: "¿Me pueden negar trabajo por ser mayor de 45 años?", a: "Sí, está prohibido. La discriminación laboral por edad viola la Ley Antidiscriminatoria (Ley 23.592) y puede dar lugar a indemnización agravada." },
];

const TOPIC_COUNTS: Record<string, number> = { Constitucional: 14, Civil: 11, Laboral: 9, Familia: 7, Comercial: 5 };

const inputStyle: CSSProperties = {
  padding: "10px 12px",
  border: `1.5px solid ${BORDER}`,
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  color: "#1a1a1a",
};

const eyebrow: CSSProperties = {
  color: GOLD_TEXT,
  fontWeight: 600,
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 6,
};

const darkField: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: NAVY,
  border: "1px solid rgba(197,160,89,0.28)",
  borderRadius: 4,
  color: "white",
  fontSize: 13,
  outline: "none",
};

const focusIn = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = NAVY);
const focusOut = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = BORDER);

/* ───────────────── HOME ───────────────── */
function Home({ navigate }: { navigate: (p: Page) => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: NIGHT }}>
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=800&fit=crop&auto=format"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${NIGHT} 0%, rgba(8,20,43,0.88) 45%, rgba(8,20,43,0.55) 100%)` }} />
        <div className="relative max-w-screen-xl mx-auto px-4 py-16 md:py-24">
          <div style={{ maxWidth: 620 }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
              Informado. Accesible. Para todos.
            </p>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                lineHeight: 1.1,
                color: "white",
                marginBottom: 24,
              }}
            >
              Asesoramiento claro.
              <br />
              <span style={{ color: GOLD }}>Derechos al alcance.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
              Herme Iuris es un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <button onClick={() => navigate("actualidad")} style={{ backgroundColor: GOLD, color: NIGHT, padding: "12px 24px", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Ver actualidad
              </button>
              <button onClick={() => navigate("chatbot")} style={{ backgroundColor: "transparent", color: "white", padding: "12px 24px", borderRadius: 4, fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.6)" }}>
                Consultar al chatbot
              </button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden="true" style={{ color: GOLD, fontSize: 20 }}>⚖️</span>
              Orientación legal para entender cómo las leyes impactan en tu vida.
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px]">
          <div className="px-4 py-10 md:px-8">
            <p style={{ display: "flex", alignItems: "center", gap: 12, color: GOLD_TEXT, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 22 }}>
              <span aria-hidden="true" style={{ width: 28, height: 2, backgroundColor: GOLD, display: "inline-block" }} />
              Áreas del derecho
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14 }}>
              {AREAS.map((a) => (
                <div key={a.title} style={{ border: "1px solid #E3E8F0", borderRadius: 6, padding: "20px 16px", textAlign: "center", backgroundColor: "white" }}>
                  <div aria-hidden="true" style={{ fontSize: 30, marginBottom: 10 }}>{a.icon}</div>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: NAVY, marginBottom: 8 }}>{a.title}</h2>
                  <p style={{ fontSize: 12.5, color: "#4b5563", lineHeight: 1.55, marginBottom: 14 }}>{a.desc}</p>
                  <button onClick={() => navigate(a.to)} aria-label={`Ver más sobre ${a.title}`} style={{ color: GOLD_TEXT, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Ver más →
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {MORE_AREAS.map((m) => (
                <button key={m} onClick={() => navigate("buscador")} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: NAVY, backgroundColor: "#E6ECF5" }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <aside aria-label="Hacer una consulta" style={{ backgroundColor: PANEL, padding: "28px 24px" }}>
            <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
              Hacé tu consulta
            </p>
            {sent ? (
              <p role="status" style={{ color: "white", fontSize: 14, lineHeight: 1.6 }}>
                ¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <input type="text" placeholder="Nombre completo" aria-label="Nombre completo" required style={darkField} />
                <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" required style={darkField} />
                <input type="tel" placeholder="Teléfono" aria-label="Teléfono" style={darkField} />
                <select aria-label="Área del derecho" defaultValue="" style={darkField}>
                  <option value="" disabled>Seleccioná un área</option>
                  <option>Civil</option>
                  <option>Laboral</option>
                  <option>Familia</option>
                  <option>Comercial</option>
                  <option>Otra</option>
                </select>
                <textarea placeholder="Tu mensaje" aria-label="Tu mensaje" rows={4} style={{ ...darkField, resize: "vertical" }} />
                <button type="submit" style={{ backgroundColor: GOLD, color: NIGHT, padding: "12px 0", borderRadius: 4, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                  Enviar consulta
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>

      <section style={{ backgroundColor: NIGHT, borderTop: "1px solid rgba(197,160,89,0.25)" }}>
        <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4" style={{ gap: 20 }}>
          {TRUST.map((t) => (
            <div key={t.title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span aria-hidden="true" style={{ fontSize: 24, color: GOLD }}>{t.icon}</span>
              <div>
                <p style={{ color: "white", fontSize: 13, fontWeight: 700, margin: 0 }}>{t.title}</p>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 12, margin: 0 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ===== PARTE 2 =====

/* ───────────────── APP ───────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedNews, setExpandedNews] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hola, soy el asistente legal de Herme Iuris. Podés preguntarme sobre tus derechos o elegir una de las preguntas frecuentes." },
  ]);
  const [jurTab, setJurTab] = useState<"nacional" | "provincial">("nacional");
  const [jurSearch, setJurSearch] = useState("");
  const [dictSearch, setDictSearch] = useState("");

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
  };

  const handleChat = (question?: string) => {
    const q = question || chatInput;
    if (!q.trim()) return;
    const found = CHATBOT_QA.find((item) => item.q === q);
    const botReply = found
      ? found.a
      : "Esa es una consulta interesante. Te recomiendo consultar con un profesional del derecho para un asesoramiento personalizado. En Herme Iuris te orientamos, pero no reemplazamos al abogado.";
    setChatHistory((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: botReply }]);
    setChatInput("");
  };

  const filteredJur = (jurTab === "nacional" ? JURISPRUDENCIA_NAC : JURISPRUDENCIA_PROV).filter(
    (j) =>
      j.tema.toLowerCase().includes(jurSearch.toLowerCase()) ||
      j.materia.toLowerCase().includes(jurSearch.toLowerCase()),
  );

  const mainNav: { p: Page; label: string }[] = [
    { p: "home", label: "Home" },
    { p: "actualidad", label: "Actualidad" },
    { p: "foro", label: "Foro" },
    { p: "cuenta", label: "Mi Cuenta" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: "#F4F6FA" }}>
      {/* ─── NAVBAR ─── */}
      <header style={{ backgroundColor: NIGHT, position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(197,160,89,0.25)" }}>
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} aria-label="Herme Iuris, ir al inicio" className="flex items-center gap-2">
            <div style={{ width: 36, height: 36, backgroundColor: GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: NIGHT, fontFamily: "'DM Serif Display', serif", fontWeight: 700, fontSize: 18 }}>H</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: 22, letterSpacing: "-0.02em" }}>Herme Iuris</span>
          </button>

          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
            {mainNav.map(({ p, label }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                aria-current={page === p ? "page" : undefined}
                style={{
                  padding: "6px 16px",
                  color: page === p ? GOLD : "rgba(255,255,255,0.9)",
                  borderBottom: page === p ? `2px solid ${GOLD}` : "2px solid transparent",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("chatbot")}
              className="hidden md:block"
              style={{ backgroundColor: GOLD, color: NIGHT, padding: "8px 18px", borderRadius: 4, fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Consultar
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              style={{ color: "white", padding: "6px 10px", borderRadius: 6, backgroundColor: menuOpen ? "rgba(255,255,255,0.15)" : "transparent" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      height: 2,
                      backgroundColor: "white",
                      borderRadius: 2,
                      transition: "all 0.2s",
                      transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4px,-5px)" : "none",
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: NAVY_DARK, borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 0" }}>
            <div className="max-w-screen-xl mx-auto px-4">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 4 }}>
                {[
                  { p: "buscador" as Page, label: "🔍 Buscador" },
                  { p: "cursos" as Page, label: "📚 Cursos" },
                  { p: "terminologia" as Page, label: "📖 Terminología" },
                  { p: "chatbot" as Page, label: "🤖 Chatbot Legal" },
                  { p: "jurisprudencia-nacional" as Page, label: "🏛️ Jurisp. Nacional" },
                  { p: "jurisprudencia-provincial" as Page, label: "⚖️ Jurisp. Provincial" },
                ].map(({ p, label }) => (
                  <button
                    key={p}
                    onClick={() => navigate(p)}
                    style={{ textAlign: "left", padding: "8px 16px", color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, borderRadius: 6 }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="md:hidden mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 4, flexWrap: "wrap" }}>
                {mainNav.map(({ p, label }) => (
                  <button
                    key={p}
                    onClick={() => navigate(p)}
                    style={{ padding: "6px 14px", color: page === p ? GOLD : "rgba(255,255,255,0.9)", fontSize: 14, borderRadius: 6 }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN ─── */}
      <main className="flex-1">
        {page === "home" && <Home navigate={navigate} />}

        {/* ACTUALIDAD */}
        {page === "actualidad" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div style={{ marginBottom: 32 }}>
              <p style={eyebrow}>Actualidad Legal</p>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 8 }}>Fallos y Noticias Recientes</h1>
              <p style={{ color: "#4b5563", fontSize: 16 }}>Análisis jurídico accesible sobre los fallos y debates más importantes del momento.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]" style={{ gap: 32, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {NEWS.map((n) => (
                  <article key={n.id} style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #E3E8F0" }}>
                    <div style={{ padding: "24px 28px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                        <span style={{ backgroundColor: "#E6ECF5", color: NAVY, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{n.tag}</span>
                        <span style={{ color: "#6b7280", fontSize: 13 }}>{n.date}</span>
                      </div>
                      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 12, lineHeight: 1.3 }}>{n.title}</h2>
                      <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{n.summary}</p>
                      <button
                        onClick={() => setExpandedNews(expandedNews === n.id ? null : n.id)}
                        aria-expanded={expandedNews === n.id}
                        style={{ color: NAVY, fontWeight: 600, fontSize: 14 }}
                      >
                        {expandedNews === n.id ? "▲ Ocultar análisis" : "▼ Ver análisis jurídico"}
                      </button>
                      {expandedNews === n.id && (
                        <div style={{ marginTop: 16, padding: 16, backgroundColor: "#F1F4F9", borderRadius: 8, borderLeft: `4px solid ${GOLD}` }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Análisis Jurídico</p>
                          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{n.analysis}</p>
                        </div>
                      )}
                    </div>
                    <div style={{ borderTop: "1px solid #E3E8F0", padding: "16px 28px", backgroundColor: "#F7F9FC" }}>
                      <p style={{ fontWeight: 600, fontSize: 13, color: NAVY, marginBottom: 12 }}>💬 Comentarios ({n.comments.length})</p>
                      {n.comments.length === 0 && <p style={{ color: "#6b7280", fontSize: 13 }}>Sé el primero en comentar.</p>}
                      {n.comments.map((c, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>{c.user[0]}</span>
                          </div>
                          <div style={{ backgroundColor: "white", borderRadius: 8, padding: "8px 12px", flex: 1, border: "1px solid #E3E8F0" }}>
                            <p style={{ fontWeight: 600, fontSize: 12, color: NAVY, marginBottom: 2 }}>
                              {c.user} <span style={{ color: "#6b7280", fontWeight: 400 }}>· {c.time}</span>
                            </p>
                            <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{c.text}</p>
                          </div>
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <input
                          placeholder="Escribí tu comentario..."
                          aria-label="Escribí tu comentario"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          style={{ ...inputStyle, flex: 1, padding: "8px 12px", fontSize: 13 }}
                          onFocus={focusIn}
                          onBlur={focusOut}
                        />
                        <button onClick={() => setNewComment("")} style={{ backgroundColor: NAVY, color: "white", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                          Enviar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, border: "1px solid #E3E8F0" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: NAVY, fontSize: 17, marginBottom: 14 }}>Temas destacados</p>
                  {Object.entries(TOPIC_COUNTS).map(([t, count]) => (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #EEF1F6", fontSize: 14 }}>
                      <span style={{ color: "#333" }}>{t}</span>
                      <span style={{ color: GOLD_TEXT, fontWeight: 600, fontFamily: "DM Mono, monospace", fontSize: 12 }}>{count} fallos</span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: PANEL, borderRadius: 12, padding: 20, color: "white" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, marginBottom: 8 }}>¿Tenés dudas sobre un fallo?</p>
                  <p style={{ fontSize: 13, marginBottom: 14, color: "rgba(255,255,255,0.9)" }}>Usá nuestro chatbot legal para obtener una explicación simple.</p>
                  <button onClick={() => navigate("chatbot")} style={{ backgroundColor: GOLD, color: NIGHT, padding: "8px 16px", borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Consultar ahora →
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* FORO */}
        {page === "foro" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={eyebrow}>Comunidad</p>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 8 }}>Foro General</h1>
                <p style={{ color: "#4b5563", fontSize: 15 }}>Debatí, preguntá y compartí tu perspectiva sobre el derecho y la justicia.</p>
              </div>
              <button style={{ backgroundColor: GOLD, color: NIGHT, padding: "12px 24px", borderRadius: 4, fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                + Nuevo tema
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["Todos", "Civil", "Laboral", "Familia", "Comercial", "Administrativo", "Constitucional"].map((cat) => (
                <button
                  key={cat}
                  style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, border: "1.5px solid", borderColor: cat === "Todos" ? NAVY : BORDER, backgroundColor: cat === "Todos" ? NAVY : "transparent", color: cat === "Todos" ? "white" : "#4b5563" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]" style={{ gap: 32, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {FORUM_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    style={{ backgroundColor: "white", borderRadius: 10, padding: "18px 22px", border: "1px solid #E3E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,35,66,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ backgroundColor: "#E6ECF5", color: NAVY, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{topic.cat}</span>
                        <span style={{ color: "#6b7280", fontSize: 12 }}>por {topic.author} · {topic.time}</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0, lineHeight: 1.4 }}>{topic.title}</h3>
                    </div>
                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 20, fontWeight: 700, color: NAVY, margin: 0 }}>{topic.replies}</p>
                      <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>respuestas</p>
                    </div>
                  </div>
                ))}
              </div>

              <aside>
                <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, border: "1px solid #E3E8F0", marginBottom: 16 }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: NAVY, fontSize: 17, marginBottom: 12 }}>Estadísticas</p>
                  {[
                    { label: "Usuarios activos", val: "1.247" },
                    { label: "Debates abiertos", val: "89" },
                    { label: "Respuestas hoy", val: "234" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #EEF1F6" }}>
                      <span style={{ fontSize: 13, color: "#4b5563" }}>{s.label}</span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, fontWeight: 600, color: NAVY }}>{s.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: "#F1F4F9", borderRadius: 12, padding: 20, border: "1px solid #E3E8F0" }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: NAVY, marginBottom: 8 }}>Reglas del foro</p>
                  <ul style={{ paddingLeft: 16, fontSize: 13, color: "#4b5563", lineHeight: 1.8, margin: 0 }}>
                    <li>Respeto ante todo</li>
                    <li>Sin asesoramiento legal vinculante</li>
                    <li>Fuentes verificadas</li>
                    <li>No publicar datos personales</li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* MI CUENTA */}
        {page === "cuenta" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 800 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: GOLD, fontSize: 32, fontFamily: "'DM Serif Display', serif" }}>M</span>
              </div>
              <div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: NAVY, marginBottom: 4 }}>María González</h1>
                <p style={{ color: "#5b6270", fontSize: 14 }}>maria.gonzalez@email.com · Miembro desde enero 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20, marginBottom: 24 }}>
              {[
                { label: "Participaciones en foros", val: "23" },
                { label: "Comentarios en noticias", val: "41" },
                { label: "Cursos iniciados", val: "3" },
                { label: "Cursos completados", val: "1" },
              ].map((s) => (
                <div key={s.label} style={{ backgroundColor: "white", borderRadius: 12, padding: 20, border: "1px solid #E3E8F0" }}>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 32, color: NAVY, fontWeight: 700, marginBottom: 4 }}>{s.val}</p>
                  <p style={{ color: "#4b5563", fontSize: 14, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 24, border: "1px solid #E3E8F0", marginBottom: 16 }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", color: NAVY, fontSize: 20, marginBottom: 18 }}>Configuración</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Notificaciones por email", "Alertas de nuevos fallos", "Resumen semanal"].map((opt) => (
                  <div key={opt} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #EEF1F6" }}>
                    <span style={{ fontSize: 14, color: "#333" }}>{opt}</span>
                    <div role="switch" aria-checked="true" aria-label={opt} style={{ width: 40, height: 22, backgroundColor: NAVY, borderRadius: 11, position: "relative" }}>
                      <div style={{ position: "absolute", right: 3, top: 3, width: 16, height: 16, backgroundColor: GOLD, borderRadius: "50%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button style={{ backgroundColor: "#E6ECF5", color: NAVY, padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* CURSOS */}
        {page === "cursos" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={eyebrow}>Formación</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 8 }}>Cursos de Derecho</h1>
            <p style={{ color: "#4b5563", fontSize: 15, marginBottom: 32 }}>Aprendé sobre tus derechos con contenido simple, claro y gratuito.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {COURSES.map((c) => (
                <div
                  key={c.title}
                  style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #E3E8F0", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,35,66,0.15)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div style={{ height: 160, backgroundColor: "#DCE3EE", position: "relative" }}>
                    <img src={`https://images.unsplash.com/${c.img}?w=400&h=200&fit=crop&auto=format`} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,24,48,0.6) 100%)" }} />
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: c.level === "Básico" ? GOLD : c.level === "Intermedio" ? NAVY : NAVY_DARK,
                        color: c.level === "Básico" ? NIGHT : "white",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {c.level}
                    </span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.35 }}>{c.title}</h3>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                      <span style={{ fontSize: 13, color: "#5b6270" }}>⏱ {c.duration}</span>
                      <span style={{ fontSize: 13, color: "#5b6270" }}>📝 {c.lessons} clases</span>
                    </div>
                    <button style={{ width: "100%", backgroundColor: NAVY, color: "white", padding: "10px 0", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                      Ver curso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TERMINOLOGÍA */}
        {page === "terminologia" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={eyebrow}>Referencia</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 8 }}>Glosario Jurídico</h1>
            <p style={{ color: "#4b5563", fontSize: 15, marginBottom: 24 }}>Terminología legal explicada en palabras simples.</p>
            <input
              placeholder="Buscar término jurídico..."
              aria-label="Buscar término jurídico"
              value={dictSearch}
              onChange={(e) => setDictSearch(e.target.value)}
              style={{ ...inputStyle, width: "100%", maxWidth: 480, padding: "12px 16px", borderRadius: 10, fontSize: 15, marginBottom: 32 }}
              onFocus={focusIn}
              onBlur={focusOut}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {[...DICTIONARY_TERMS, ...EXTRA_TERMS]
                .filter((t) => t.term.toLowerCase().includes(dictSearch.toLowerCase()) || t.def.toLowerCase().includes(dictSearch.toLowerCase()))
                .map((item) => (
                  <div key={item.term} style={{ backgroundColor: "white", borderRadius: 10, padding: 18, border: "1px solid #E3E8F0", borderLeft: `4px solid ${GOLD}` }}>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: NAVY, marginBottom: 6 }}>{item.term}</p>
                    <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.6 }}>{item.def}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* CHATBOT */}
        {page === "chatbot" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 720 }}>
            <p style={eyebrow}>Asistente</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 4 }}>Chatbot Legal</h1>
            <p style={{ color: "#5b6270", fontSize: 13, marginBottom: 24 }}>⚠ Orientación general. No reemplaza el asesoramiento de un abogado.</p>

            <div style={{ backgroundColor: "white", borderRadius: 14, overflow: "hidden", border: "1px solid #E3E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ backgroundColor: NIGHT, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>⚖️</span>
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 600, fontSize: 14, margin: 0 }}>Asistente Herme Iuris</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0 }}>En línea</p>
                </div>
              </div>

              <div aria-live="polite" style={{ height: 380, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                {chatHistory.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "10px 14px",
                        borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        backgroundColor: msg.role === "user" ? NAVY : "#EEF1F6",
                        color: msg.role === "user" ? "white" : "#333",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #E3E8F0" }}>
                <p style={{ fontSize: 12, color: "#5b6270", marginBottom: 8 }}>Preguntas frecuentes:</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {CHATBOT_QA.map((qa) => (
                    <button
                      key={qa.q}
                      onClick={() => handleChat(qa.q)}
                      style={{ padding: "5px 10px", borderRadius: 16, fontSize: 11, border: `1.5px solid ${BORDER}`, color: "#4b5563", backgroundColor: "transparent" }}
                    >
                      {qa.q}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    placeholder="Escribí tu pregunta legal..."
                    aria-label="Escribí tu pregunta legal"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChat()}
                    style={{ ...inputStyle, flex: 1, padding: "10px 14px", borderRadius: 10 }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <button onClick={() => handleChat()} aria-label="Enviar pregunta" style={{ backgroundColor: GOLD, color: NIGHT, padding: "10px 18px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* JURISPRUDENCIA */}
        {(page === "jurisprudencia-nacional" || page === "jurisprudencia-provincial") && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={eyebrow}>Base de Datos</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 24 }}>Jurisprudencia</h1>

            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {(["nacional", "provincial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setJurTab(tab);
                    setPage(tab === "nacional" ? "jurisprudencia-nacional" : "jurisprudencia-provincial");
                  }}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    backgroundColor: jurTab === tab ? NAVY : "white",
                    color: jurTab === tab ? "white" : NAVY,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {tab === "nacional" ? "🏛️ Nacional" : "⚖️ Provincial"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
              <input
                placeholder="Buscar por tema o materia..."
                aria-label="Buscar por tema o materia"
                value={jurSearch}
                onChange={(e) => setJurSearch(e.target.value)}
                style={{ ...inputStyle, flex: 1, maxWidth: 480, padding: "10px 16px", borderRadius: 10 }}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <button style={{ backgroundColor: GOLD, color: NIGHT, padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
                Buscar
              </button>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 12, overflowX: "auto", border: "1px solid #E3E8F0" }}>
              <div style={{ minWidth: 760 }}>
                <div style={{ display: "grid", gridTemplateColumns: jurTab === "nacional" ? "1fr 180px 1fr 100px 120px" : "1fr 180px 1fr 100px 120px 110px", backgroundColor: NIGHT, padding: "12px 20px" }}>
                  {["Tribunal", "Expediente", "Tema", "Fecha", "Materia", ...(jurTab === "provincial" ? ["Provincia"] : [])].map((h) => (
                    <span key={h} style={{ color: "rgba(255,255,255,0.95)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                  ))}
                </div>
                {filteredJur.map((j, i) => (
                  <div
                    key={i}
                    style={{ display: "grid", gridTemplateColumns: jurTab === "nacional" ? "1fr 180px 1fr 100px 120px" : "1fr 180px 1fr 100px 120px 110px", padding: "14px 20px", borderBottom: "1px solid #EEF1F6" }}
                  >
                    <span style={{ fontSize: 13, color: "#333", fontWeight: 500, paddingRight: 12 }}>{j.tribunal}</span>
                    <span style={{ fontSize: 12, color: "#5b6270", fontFamily: "DM Mono, monospace" }}>{j.expediente}</span>
                    <span style={{ fontSize: 13, color: "#4b5563", paddingRight: 12 }}>{j.tema}</span>
                    <span style={{ fontSize: 12, color: "#5b6270" }}>{j.fecha}</span>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ backgroundColor: "#E6ECF5", color: NAVY, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{j.materia}</span>
                    </span>
                    {"provincia" in j && <span style={{ fontSize: 12, color: GOLD_TEXT, fontWeight: 600 }}>{(j as { provincia: string }).provincia}</span>}
                  </div>
                ))}
                {filteredJur.length === 0 && (
                  <div style={{ padding: "32px 20px", textAlign: "center", color: "#5b6270", fontSize: 14 }}>
                    No se encontraron fallos con ese criterio de búsqueda.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BUSCADOR */}
        {page === "buscador" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 720 }}>
            <p style={eyebrow}>Herme Iuris</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: NAVY, marginBottom: 8 }}>Buscador General</h1>
            <p style={{ color: "#4b5563", fontSize: 15, marginBottom: 32 }}>Encontrá noticias, fallos, términos y cursos en un solo lugar.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
              <input
                placeholder="¿Qué querés buscar?"
                aria-label="¿Qué querés buscar?"
                style={{ ...inputStyle, flex: 1, padding: "14px 18px", border: `2px solid ${BORDER}`, borderRadius: 12, fontSize: 16 }}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <button style={{ backgroundColor: GOLD, color: NIGHT, padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
                Buscar
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 16 }}>
              {[
                { label: "Fallos y noticias", icon: "📰", p: "actualidad" as Page },
                { label: "Glosario jurídico", icon: "📖", p: "terminologia" as Page },
                { label: "Jurisprudencia", icon: "⚖️", p: "jurisprudencia-nacional" as Page },
                { label: "Cursos", icon: "📚", p: "cursos" as Page },
                { label: "Foro", icon: "💬", p: "foro" as Page },
                { label: "Chatbot legal", icon: "🤖", p: "chatbot" as Page },
              ].map((item) => (
                <button
                  key={item.p}
                  onClick={() => navigate(item.p)}
                  style={{ backgroundColor: "white", borderRadius: 10, padding: "20px 16px", border: "1.5px solid #E3E8F0", textAlign: "center" }}
                >
                  <span aria-hidden="true" style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#4b5563" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ backgroundColor: NIGHT, color: "white", padding: "40px 0 24px", borderTop: "1px solid rgba(197,160,89,0.25)" }}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]" style={{ gap: 32, marginBottom: 40 }}>
            <div className="col-span-2 md:col-span-1">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, backgroundColor: GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: NIGHT, fontFamily: "'DM Serif Display', serif", fontWeight: 700, fontSize: 18 }}>H</span>
                </div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22 }}>Herme Iuris</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 280 }}>
                El derecho explicado para todos. Un espacio para entender, debatir y construir justicia juntos.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                {[
                  { icon: "📸", label: "Instagram" },
                  { icon: "💬", label: "WhatsApp" },
                  { icon: "👥", label: "Facebook" },
                  { icon: "🐦", label: "Twitter" },
                ].map((s) => (
                  <button
                    key={s.label}
                    title={s.label}
                    aria-label={s.label}
                    style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}
                  >
                    <span aria-hidden="true">{s.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Secciones", links: ["Home", "Actualidad", "Foro", "Mi Cuenta"] },
              { title: "Recursos", links: ["Cursos", "Terminología", "Chatbot", "Jurisprudencia"] },
              { title: "Legal", links: ["Aviso legal", "Privacidad", "Términos de uso", "Contacto"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: GOLD, marginBottom: 14 }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((l) => (
                    <li key={l}>
                      <button style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, background: "none", border: "none", padding: 0 }}>{l}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>© 2026 Herme Iuris. Todos los derechos reservados.</p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>El contenido de este sitio es orientativo y no constituye asesoramiento legal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}