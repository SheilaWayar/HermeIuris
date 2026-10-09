import { useState } from "react";
type Page = "home" | "actualidad" | "foro" | "cuenta" | "cursos" | "terminologia" | "chatbot" | "jurisprudencia-nacional" | "jurisprudencia-provincial" | "buscador";

const CATEGORIES = [
  { label: "Civil", icon: "⚖️", img: "photo-1589829545856-d10d557cf95f", desc: "Relaciones entre particulares" },
  { label: "Penal", icon: "🔒", img: "photo-1461360370896-922624d12aa1", desc: "Delitos y sanciones" },
  { label: "Laboral", icon: "👷", img: "photo-1521737711867-e3b97375f902", desc: "Derechos del trabajador" },
  { label: "Comercial", icon: "🏢", img: "photo-1507679799987-c73779587ccf", desc: "Actividad empresarial" },
  { label: "Familia", icon: "👨‍👩‍👧", img: "photo-1511895426328-dc8714191011", desc: "Vínculos familiares y filiación" },
  { label: "Constitucional", icon: "📜", img: "photo-1589994965851-a8f479c573a9", desc: "Derechos y garantías" },
  { label: "Procesal", icon: "🏛️", img: "photo-1555436169-dc69f478f4a2", desc: "Procedimientos judiciales" },
  { label: "Administrativo", icon: "🗂️", img: "photo-1450101499163-c8848c66ca85", desc: "Estado y administración" },
  { label: "Tributario", icon: "💰", img: "photo-1554224155-8d04cb21cd6c", desc: "Impuestos y finanzas públicas" },
  { label: "Consumidor", icon: "🛒", img: "photo-1556742049-0cfed4f6a45d", desc: "Defensa del consumidor" },
  { label: "Ambiental", icon: "🌿", img: "photo-1441974231531-c6227db76b6e", desc: "Medio ambiente y recursos" },
  { label: "Informativo", icon: "📰", img: "photo-1504711434969-e33886168f5c", desc: "Novedades y actualidad" },
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

const NEWS = [
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
    comments: [
      { user: "Sofía Romero", text: "¿Esto aplica para accidentes anteriores a 2025?", time: "hace 1 d" },
    ],
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

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<"login" | "register">("login");
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
    const found = CHATBOT_QA.find(item => item.q === q);
    const botReply = found
      ? found.a
      : "Esa es una consulta interesante. Te recomiendo consultar con un profesional del derecho para un asesoramiento personalizado. En Herme Iuris te orientamos, pero no reemplazamos al abogado.";
    setChatHistory(prev => [...prev, { role: "user", text: q }, { role: "bot", text: botReply }]);
    setChatInput("");
  };

  const filteredDict = DICTIONARY_TERMS.filter(t =>
    t.term.toLowerCase().includes(dictSearch.toLowerCase())
  );

  const filteredJur = (jurTab === "nacional" ? JURISPRUDENCIA_NAC : JURISPRUDENCIA_PROV).filter(j =>
    j.tema.toLowerCase().includes(jurSearch.toLowerCase()) ||
    j.materia.toLowerCase().includes(jurSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: "#FDF8F3" }}>

      {/* ─── NAVBAR ─── */}
      <header style={{ backgroundColor: "#7C1D3A", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(124,29,58,0.3)" }}>
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate("home")} className="flex items-center gap-2 group">
            <div style={{ width: 36, height: 36, backgroundColor: "#C9973A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#7C1D3A", fontFamily: "'DM Serif Display', serif", fontWeight: 700, fontSize: 18 }}>H</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: 22, letterSpacing: "-0.02em" }}>Herme Iuris</span>
          </button>

          {/* Main nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(["home", "actualidad", "foro", "cuenta"] as Page[]).map(p => {
              const labels: Record<string, string> = { home: "Home", actualidad: "Actualidad", foro: "Foro", cuenta: "Mi Cuenta" };
              return (
                <button key={p} onClick={() => navigate(p)}
                  style={{
                    padding: "6px 16px", borderRadius: 6, color: page === p ? "#C9973A" : "rgba(255,255,255,0.85)",
                    backgroundColor: page === p ? "rgba(201,151,58,0.15)" : "transparent",
                    fontWeight: 500, fontSize: 14, transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (page !== p) (e.target as HTMLElement).style.color = "white"; }}
                  onMouseLeave={e => { if (page !== p) (e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                >
                  {labels[p]}
                </button>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "white", padding: "6px 10px", borderRadius: 6, backgroundColor: menuOpen ? "rgba(255,255,255,0.15)" : "transparent", transition: "background 0.15s" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ height: 2, backgroundColor: "white", borderRadius: 2, transition: "all 0.2s",
                  transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4px,-5px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1
                }} />
              ))}
            </div>
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div style={{ backgroundColor: "#5A1228", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 0" }}>
            <div className="max-w-screen-xl mx-auto px-4">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 4 }}>
                {[
                  { p: "buscador" as Page, label: "🔍 Buscador", },
                  { p: "cursos" as Page, label: "📚 Cursos" },
                  { p: "terminologia" as Page, label: "📖 Terminología" },
                  { p: "chatbot" as Page, label: "🤖 Chatbot Legal" },
                  { p: "jurisprudencia-nacional" as Page, label: "🏛️ Jurisp. Nacional" },
                  { p: "jurisprudencia-provincial" as Page, label: "⚖️ Jurisp. Provincial" },
                ].map(({ p, label }) => (
                  <button key={p} onClick={() => navigate(p)}
                    style={{ textAlign: "left", padding: "8px 16px", color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, borderRadius: 6, transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Mobile nav links */}
              <div className="md:hidden mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 4, flexWrap: "wrap" }}>
                {(["home", "actualidad", "foro", "cuenta"] as Page[]).map(p => {
                  const labels: Record<string, string> = { home: "Home", actualidad: "Actualidad", foro: "Foro", cuenta: "Mi Cuenta" };
                  return (
                    <button key={p} onClick={() => navigate(p)}
                      style={{ padding: "6px 14px", color: page === p ? "#C9973A" : "rgba(255,255,255,0.85)", fontSize: 14, borderRadius: 6, backgroundColor: page === p ? "rgba(201,151,58,0.15)" : "transparent" }}
                    >
                      {labels[p]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1">

        {/* ════════ HOME ════════ */}
        {page === "home" && (
          <>
            {/* Hero */}
            <section style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>
              <img
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1400&h=600&fit=crop&auto=format"
                alt="Justicia y sociedad"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(90,18,40,0.88) 0%, rgba(124,29,58,0.75) 50%, rgba(0,0,0,0.5) 100%)" }} />
              <div className="relative max-w-screen-xl mx-auto px-4 py-16 flex items-center" style={{ minHeight: 520 }}>
                <div style={{ maxWidth: 640 }}>
                  <div style={{ display: "inline-block", backgroundColor: "#C9973A", color: "#5A1228", padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
                    Derecho para todos
                  </div>
                  <h1 style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.15, marginBottom: 24 }}>
                    Herme Iuris es un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad.
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                    Aquí no importa si sos abogado o ciudadano común: todos tienen derecho a entender cómo las leyes impactan en nuestra sociedad. Queremos que te sientas acompañado, identificado y con voz en cada debate.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {["El derecho explicado para todos.", "Tu voz también cuenta.", "La justicia se construye entre todos."].map(frase => (
                      <span key={frase} style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", padding: "6px 14px", borderRadius: 20, fontSize: 13, border: "1px solid rgba(255,255,255,0.2)" }}>
                        {frase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Three-column layout */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
              <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 240px", gap: 24, alignItems: "start" }}>

                {/* LEFT ASIDE: Login */}
                <aside style={{ position: "sticky", top: 88 }}>
                  <div style={{ backgroundColor: "white", borderRadius: 12, boxShadow: "0 4px 24px rgba(124,29,58,0.1)", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#7C1D3A", padding: "16px 20px" }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: 18, margin: 0 }}>Mi Cuenta</p>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ display: "flex", borderRadius: 8, backgroundColor: "#f5f0eb", marginBottom: 18 }}>
                        {(["login", "register"] as const).map(tab => (
                          <button key={tab} onClick={() => setLoginTab(tab)}
                            style={{ flex: 1, padding: "8px 0", borderRadius: 7, fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                              backgroundColor: loginTab === tab ? "#7C1D3A" : "transparent",
                              color: loginTab === tab ? "white" : "#666"
                            }}
                          >
                            {tab === "login" ? "Ingresar" : "Registrarse"}
                          </button>
                        ))}
                      </div>

                      {loginTab === "login" ? (
                        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <input type="text" placeholder="Email o teléfono"
                            style={{ padding: "10px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 14, outline: "none", transition: "border-color 0.15s" }}
                            onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                            onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                          />
                          <input type="password" placeholder="Contraseña"
                            style={{ padding: "10px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 14, outline: "none", transition: "border-color 0.15s" }}
                            onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                            onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                          />
                          <button type="submit"
                            style={{ backgroundColor: "#7C1D3A", color: "white", padding: "10px 0", borderRadius: 8, fontWeight: 600, fontSize: 14, transition: "background 0.15s" }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#5A1228")}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#7C1D3A")}
                          >
                            Acceder
                          </button>
                          <button type="button" style={{ color: "#7C1D3A", fontSize: 12, textAlign: "center" }}>¿Olvidaste tu contraseña?</button>
                        </form>
                      ) : (
                        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <input type="text" placeholder="Nombre completo"
                            style={{ padding: "10px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 14, outline: "none" }}
                            onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                            onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                          />
                          <input type="email" placeholder="Email"
                            style={{ padding: "10px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 14, outline: "none" }}
                            onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                            onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                          />
                          <input type="password" placeholder="Contraseña"
                            style={{ padding: "10px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 14, outline: "none" }}
                            onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                            onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                          />
                          <button type="submit"
                            style={{ backgroundColor: "#C9973A", color: "white", padding: "10px 0", borderRadius: 8, fontWeight: 600, fontSize: 14 }}
                          >
                            Crear cuenta
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </aside>

                {/* CENTER: Categories */}
                <div>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#7C1D3A", marginBottom: 20 }}>Áreas del Derecho</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat.label}
                        style={{ borderRadius: 10, overflow: "hidden", border: "none", padding: 0, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "left" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,29,58,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                      >
                        <div style={{ position: "relative", height: 100, backgroundColor: "#e8ddd5" }}>
                          <img src={`https://images.unsplash.com/${cat.img}?w=300&h=150&fit=crop&auto=format`} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(90,18,40,0.7) 0%, transparent 60%)" }} />
                          <span style={{ position: "absolute", bottom: 8, left: 10, color: "white", fontWeight: 700, fontSize: 14, fontFamily: "'DM Serif Display', serif" }}>{cat.label}</span>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "8px 10px" }}>
                          <p style={{ color: "#888", fontSize: 11, margin: 0 }}>{cat.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quick links to other sections */}
                  <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "📰 Últimas noticias", p: "actualidad" as Page, desc: "Fallos y análisis recientes" },
                      { label: "💬 Foro de debate", p: "foro" as Page, desc: "Participá en la discusión" },
                      { label: "📚 Cursos gratuitos", p: "cursos" as Page, desc: "Aprendé sobre tus derechos" },
                      { label: "🤖 Chatbot legal", p: "chatbot" as Page, desc: "Consultá dudas al instante" },
                    ].map(item => (
                      <button key={item.p} onClick={() => navigate(item.p)}
                        style={{ backgroundColor: "white", borderRadius: 10, padding: "16px 18px", textAlign: "left", border: "1.5px solid #e8ddd5", transition: "border-color 0.15s, box-shadow 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C1D3A"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(124,29,58,0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8ddd5"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <p style={{ fontWeight: 600, fontSize: 14, color: "#7C1D3A", marginBottom: 4 }}>{item.label}</p>
                        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT ASIDE: Dictionary */}
                <aside style={{ position: "sticky", top: 88 }}>
                  <div style={{ backgroundColor: "white", borderRadius: 12, boxShadow: "0 4px 24px rgba(124,29,58,0.1)", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#5A1228", padding: "16px 20px" }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: 17, margin: 0 }}>📖 Diccionario Jurídico</p>
                    </div>
                    <div style={{ padding: 16 }}>
                      <input placeholder="Buscar término..."
                        value={dictSearch} onChange={e => setDictSearch(e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #e0d9d1", borderRadius: 7, fontSize: 12, marginBottom: 12, outline: "none" }}
                        onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                        onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 360, overflowY: "auto" }}>
                        {filteredDict.map(item => (
                          <div key={item.term} style={{ borderLeft: "3px solid #C9973A", paddingLeft: 10 }}>
                            <p style={{ fontWeight: 700, fontSize: 13, color: "#7C1D3A", marginBottom: 2 }}>{item.term}</p>
                            <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.5 }}>{item.def}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => navigate("terminologia")} style={{ marginTop: 14, width: "100%", padding: "8px 0", border: "1.5px solid #7C1D3A", borderRadius: 7, color: "#7C1D3A", fontSize: 12, fontWeight: 600, backgroundColor: "transparent", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#7C1D3A"; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#7C1D3A"; }}
                      >
                        Ver glosario completo →
                      </button>
                    </div>
                  </div>
                </aside>

              </div>
            </div>
          </>
        )}

        {/* ════════ ACTUALIDAD ════════ */}
        {page === "actualidad" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div style={{ marginBottom: 32 }}>
              <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Actualidad Legal</p>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 8 }}>Fallos y Noticias Recientes</h1>
              <p style={{ color: "#666", fontSize: 16 }}>Análisis jurídico accesible sobre los fallos y debates más importantes del momento.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 32, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {NEWS.map(n => (
                  <article key={n.id} style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0e8e0" }}>
                    <div style={{ padding: "24px 28px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                        <span style={{ backgroundColor: "#f5e8ee", color: "#7C1D3A", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{n.tag}</span>
                        <span style={{ color: "#aaa", fontSize: 13 }}>{n.date}</span>
                      </div>
                      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 12, lineHeight: 1.3 }}>{n.title}</h2>
                      <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{n.summary}</p>
                      <button onClick={() => setExpandedNews(expandedNews === n.id ? null : n.id)}
                        style={{ color: "#7C1D3A", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6, backgroundColor: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                      >
                        {expandedNews === n.id ? "▲ Ocultar análisis" : "▼ Ver análisis jurídico"}
                      </button>
                      {expandedNews === n.id && (
                        <div style={{ marginTop: 16, padding: 16, backgroundColor: "#fdf4f6", borderRadius: 8, borderLeft: "4px solid #7C1D3A" }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#7C1D3A", marginBottom: 8 }}>Análisis Jurídico</p>
                          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, margin: 0 }}>{n.analysis}</p>
                        </div>
                      )}
                    </div>
                    {/* Comments */}
                    <div style={{ borderTop: "1px solid #f0e8e0", padding: "16px 28px", backgroundColor: "#fdfaf7" }}>
                      <p style={{ fontWeight: 600, fontSize: 13, color: "#7C1D3A", marginBottom: 12 }}>💬 Comentarios ({n.comments.length})</p>
                      {n.comments.length === 0 && <p style={{ color: "#aaa", fontSize: 13 }}>Sé el primero en comentar.</p>}
                      {n.comments.map((c, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#7C1D3A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>{c.user[0]}</span>
                          </div>
                          <div style={{ backgroundColor: "white", borderRadius: 8, padding: "8px 12px", flex: 1, border: "1px solid #f0e8e0" }}>
                            <p style={{ fontWeight: 600, fontSize: 12, color: "#7C1D3A", marginBottom: 2 }}>{c.user} <span style={{ color: "#bbb", fontWeight: 400 }}>· {c.time}</span></p>
                            <p style={{ fontSize: 13, color: "#444", margin: 0 }}>{c.text}</p>
                          </div>
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <input placeholder="Escribí tu comentario..." value={newComment} onChange={e => setNewComment(e.target.value)}
                          style={{ flex: 1, padding: "8px 12px", border: "1.5px solid #e0d9d1", borderRadius: 8, fontSize: 13, outline: "none" }}
                          onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                          onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                        />
                        <button onClick={() => setNewComment("")}
                          style={{ backgroundColor: "#7C1D3A", color: "white", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Right sidebar */}
              <aside style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0e8e0" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: "#7C1D3A", fontSize: 17, marginBottom: 14 }}>Temas destacados</p>
                  {["Constitucional", "Civil", "Laboral", "Familia", "Comercial"].map(t => (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f5f0eb", fontSize: 14 }}>
                      <span style={{ color: "#333" }}>{t}</span>
                      <span style={{ color: "#C9973A", fontWeight: 600, fontFamily: "DM Mono, monospace", fontSize: 12 }}>
                        {Math.floor(Math.random() * 20 + 3)} fallos
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: "#7C1D3A", borderRadius: 12, padding: 20, color: "white" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, marginBottom: 8 }}>¿Tenés dudas sobre un fallo?</p>
                  <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>Usá nuestro chatbot legal para obtener una explicación simple.</p>
                  <button onClick={() => navigate("chatbot")} style={{ backgroundColor: "#C9973A", color: "white", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
                    Consultar ahora →
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ════════ FORO ════════ */}
        {page === "foro" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Comunidad</p>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 8 }}>Foro General</h1>
                <p style={{ color: "#666", fontSize: 15 }}>Debatí, preguntá y compartí tu perspectiva sobre el derecho y la justicia.</p>
              </div>
              <button style={{ backgroundColor: "#7C1D3A", color: "white", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                + Nuevo tema
              </button>
            </div>

            {/* Category filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["Todos", "Civil", "Laboral", "Familia", "Comercial", "Administrativo", "Constitucional"].map(cat => (
                <button key={cat}
                  style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, border: "1.5px solid", borderColor: cat === "Todos" ? "#7C1D3A" : "#e0d9d1", backgroundColor: cat === "Todos" ? "#7C1D3A" : "transparent", color: cat === "Todos" ? "white" : "#555", cursor: "pointer", transition: "all 0.15s" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 32, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {FORUM_TOPICS.map(topic => (
                  <div key={topic.id} style={{ backgroundColor: "white", borderRadius: 10, padding: "18px 22px", border: "1px solid #f0e8e0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "box-shadow 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,29,58,0.1)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ backgroundColor: "#f5e8ee", color: "#7C1D3A", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{topic.cat}</span>
                        <span style={{ color: "#bbb", fontSize: 12 }}>por {topic.author} · {topic.time}</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0, lineHeight: 1.4 }}>{topic.title}</h3>
                    </div>
                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 20, fontWeight: 700, color: "#7C1D3A", margin: 0 }}>{topic.replies}</p>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>respuestas</p>
                    </div>
                  </div>
                ))}
              </div>

              <aside style={{ position: "sticky", top: 88 }}>
                <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, border: "1px solid #f0e8e0", marginBottom: 16 }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: "#7C1D3A", fontSize: 17, marginBottom: 12 }}>Estadísticas</p>
                  {[{ label: "Usuarios activos", val: "1.247" }, { label: "Debates abiertos", val: "89" }, { label: "Respuestas hoy", val: "234" }].map(s => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f0eb" }}>
                      <span style={{ fontSize: 13, color: "#555" }}>{s.label}</span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, fontWeight: 600, color: "#7C1D3A" }}>{s.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: "#fdf4f6", borderRadius: 12, padding: 20, border: "1px solid #f0e8e0" }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#7C1D3A", marginBottom: 8 }}>Reglas del foro</p>
                  <ul style={{ paddingLeft: 16, fontSize: 13, color: "#555", lineHeight: 1.8, margin: 0 }}>
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

        {/* ════════ MI CUENTA ════════ */}
        {page === "cuenta" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 800 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#7C1D3A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", fontSize: 32, fontFamily: "'DM Serif Display', serif" }}>M</span>
              </div>
              <div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#7C1D3A", marginBottom: 4 }}>María González</h1>
                <p style={{ color: "#888", fontSize: 14 }}>maria.gonzalez@email.com · Miembro desde enero 2026</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {[{ label: "Participaciones en foros", val: "23" }, { label: "Comentarios en noticias", val: "41" }, { label: "Cursos iniciados", val: "3" }, { label: "Cursos completados", val: "1" }].map(s => (
                <div key={s.label} style={{ backgroundColor: "white", borderRadius: 12, padding: 20, border: "1px solid #f0e8e0" }}>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 32, color: "#7C1D3A", fontWeight: 700, marginBottom: 4 }}>{s.val}</p>
                  <p style={{ color: "#666", fontSize: 14, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 24, border: "1px solid #f0e8e0", marginBottom: 16 }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", color: "#7C1D3A", fontSize: 20, marginBottom: 18 }}>Configuración</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Notificaciones por email", "Alertas de nuevos fallos", "Resumen semanal"].map(opt => (
                  <div key={opt} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #f5f0eb" }}>
                    <span style={{ fontSize: 14, color: "#333" }}>{opt}</span>
                    <div style={{ width: 40, height: 22, backgroundColor: "#7C1D3A", borderRadius: 11, position: "relative", cursor: "pointer" }}>
                      <div style={{ position: "absolute", right: 3, top: 3, width: 16, height: 16, backgroundColor: "white", borderRadius: "50%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button style={{ backgroundColor: "#f5e8ee", color: "#7C1D3A", padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* ════════ CURSOS ════════ */}
        {page === "cursos" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Formación</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 8 }}>Cursos de Derecho</h1>
            <p style={{ color: "#666", fontSize: 15, marginBottom: 32 }}>Aprendé sobre tus derechos con contenido simple, claro y gratuito.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {COURSES.map(c => (
                <div key={c.title} style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #f0e8e0", transition: "box-shadow 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,29,58,0.15)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ height: 160, backgroundColor: "#e8ddd5", position: "relative" }}>
                    <img src={`https://images.unsplash.com/${c.img}?w=400&h=200&fit=crop&auto=format`} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(90,18,40,0.5) 100%)" }} />
                    <span style={{ position: "absolute", top: 12, right: 12, backgroundColor: c.level === "Básico" ? "#C9973A" : c.level === "Intermedio" ? "#7C1D3A" : "#5A1228", color: "white", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                      {c.level}
                    </span>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.35 }}>{c.title}</h3>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                      <span style={{ fontSize: 13, color: "#888" }}>⏱ {c.duration}</span>
                      <span style={{ fontSize: 13, color: "#888" }}>📝 {c.lessons} clases</span>
                    </div>
                    <button style={{ width: "100%", backgroundColor: "#7C1D3A", color: "white", padding: "10px 0", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
                      Ver curso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ TERMINOLOGÍA ════════ */}
        {page === "terminologia" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Referencia</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 8 }}>Glosario Jurídico</h1>
            <p style={{ color: "#666", fontSize: 15, marginBottom: 24 }}>Terminología legal explicada en palabras simples.</p>
            <input placeholder="Buscar término jurídico..." value={dictSearch} onChange={e => setDictSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 480, padding: "12px 16px", border: "1.5px solid #e0d9d1", borderRadius: 10, fontSize: 15, marginBottom: 32, outline: "none" }}
              onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
              onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {[
                ...DICTIONARY_TERMS,
                { term: "Prescripción", def: "Extinción de una acción legal por el paso del tiempo sin ejercerla." },
                { term: "Querella", def: "Denuncia formal que hace la víctima de un delito ante el juez." },
                { term: "Sentencia", def: "Resolución definitiva del juez que pone fin a un juicio." },
                { term: "Apelación", def: "Recurso para que un tribunal superior revise una sentencia." },
                { term: "Nulidad", def: "Declaración de invalidez de un acto jurídico." },
                { term: "Tutela", def: "Institución que protege a menores o incapaces sin padres." },
                { term: "Fideicomiso", def: "Contrato por el cual una persona transfiere bienes para un fin determinado." },
                { term: "Homologación", def: "Aprobación judicial de un acuerdo entre partes." },
              ].filter(t => t.term.toLowerCase().includes(dictSearch.toLowerCase()) || t.def.toLowerCase().includes(dictSearch.toLowerCase())).map(item => (
                <div key={item.term} style={{ backgroundColor: "white", borderRadius: 10, padding: 18, border: "1px solid #f0e8e0", borderLeft: "4px solid #C9973A" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#7C1D3A", marginBottom: 6 }}>{item.term}</p>
                  <p style={{ fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 }}>{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ CHATBOT ════════ */}
        {page === "chatbot" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 720 }}>
            <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Asistente</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 4 }}>Chatbot Legal</h1>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>⚠ Orientación general. No reemplaza el asesoramiento de un abogado.</p>

            <div style={{ backgroundColor: "white", borderRadius: 14, overflow: "hidden", border: "1px solid #f0e8e0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div style={{ backgroundColor: "#7C1D3A", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#C9973A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>⚖️</span>
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 600, fontSize: 14, margin: 0 }}>Asistente Herme Iuris</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: 0 }}>En línea</p>
                </div>
              </div>

              <div style={{ height: 380, overflowY: "auto", padding: "20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                {chatHistory.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "75%", padding: "10px 14px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      backgroundColor: msg.role === "user" ? "#7C1D3A" : "#f5f0eb",
                      color: msg.role === "user" ? "white" : "#333", fontSize: 14, lineHeight: 1.6
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #f0e8e0" }}>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>Preguntas frecuentes:</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {CHATBOT_QA.map(qa => (
                    <button key={qa.q} onClick={() => handleChat(qa.q)}
                      style={{ padding: "5px 10px", borderRadius: 16, fontSize: 11, border: "1.5px solid #e0d9d1", color: "#555", backgroundColor: "transparent", cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C1D3A"; e.currentTarget.style.color = "#7C1D3A"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0d9d1"; e.currentTarget.style.color = "#555"; }}
                    >
                      {qa.q}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input placeholder="Escribí tu pregunta legal..." value={chatInput} onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleChat()}
                    style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e0d9d1", borderRadius: 10, fontSize: 14, outline: "none" }}
                    onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                    onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
                  />
                  <button onClick={() => handleChat()} style={{ backgroundColor: "#7C1D3A", color: "white", padding: "10px 18px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════ JURISPRUDENCIA ════════ */}
        {(page === "jurisprudencia-nacional" || page === "jurisprudencia-provincial") && (
          <div className="max-w-screen-xl mx-auto px-4 py-10">
            <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Base de Datos</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 24 }}>Jurisprudencia</h1>

            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {(["nacional", "provincial"] as const).map(tab => (
                <button key={tab} onClick={() => { setJurTab(tab); setPage(tab === "nacional" ? "jurisprudencia-nacional" : "jurisprudencia-provincial"); }}
                  style={{ padding: "10px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", transition: "all 0.15s",
                    backgroundColor: jurTab === tab ? "#7C1D3A" : "white",
                    color: jurTab === tab ? "white" : "#7C1D3A",
                    boxShadow: jurTab === tab ? "0 4px 12px rgba(124,29,58,0.2)" : "0 2px 8px rgba(0,0,0,0.06)"
                  }}
                >
                  {tab === "nacional" ? "🏛️ Nacional" : "⚖️ Provincial"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
              <input placeholder="Buscar por tema o materia..." value={jurSearch} onChange={e => setJurSearch(e.target.value)}
                style={{ flex: 1, maxWidth: 480, padding: "10px 16px", border: "1.5px solid #e0d9d1", borderRadius: 10, fontSize: 14, outline: "none" }}
                onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
              />
              <button style={{ backgroundColor: "#C9973A", color: "white", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
                Buscar
              </button>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #f0e8e0" }}>
              <div style={{ display: "grid", gridTemplateColumns: jurTab === "nacional" ? "1fr 180px 1fr 100px 120px" : "1fr 180px 1fr 100px 120px 110px", gap: 0, backgroundColor: "#7C1D3A", padding: "12px 20px" }}>
                {["Tribunal", "Expediente", "Tema", "Fecha", "Materia", ...(jurTab === "provincial" ? ["Provincia"] : [])].map(h => (
                  <span key={h} style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                ))}
              </div>
              {filteredJur.map((j, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: jurTab === "nacional" ? "1fr 180px 1fr 100px 120px" : "1fr 180px 1fr 100px 120px 110px", gap: 0, padding: "14px 20px", borderBottom: "1px solid #f5f0eb", transition: "background 0.15s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fdfaf7")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span style={{ fontSize: 13, color: "#333", fontWeight: 500, paddingRight: 12 }}>{j.tribunal}</span>
                  <span style={{ fontSize: 12, color: "#888", fontFamily: "DM Mono, monospace" }}>{j.expediente}</span>
                  <span style={{ fontSize: 13, color: "#555", paddingRight: 12 }}>{j.tema}</span>
                  <span style={{ fontSize: 12, color: "#888" }}>{j.fecha}</span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ backgroundColor: "#f5e8ee", color: "#7C1D3A", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{j.materia}</span>
                  </span>
                  {"provincia" in j && <span style={{ fontSize: 12, color: "#C9973A", fontWeight: 600 }}>{(j as { provincia: string }).provincia}</span>}
                </div>
              ))}
              {filteredJur.length === 0 && (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
                  No se encontraron fallos con ese criterio de búsqueda.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════ BUSCADOR ════════ */}
        {page === "buscador" && (
          <div className="max-w-screen-xl mx-auto px-4 py-10" style={{ maxWidth: 720 }}>
            <p style={{ color: "#C9973A", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Herme Iuris</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#7C1D3A", marginBottom: 8 }}>Buscador General</h1>
            <p style={{ color: "#666", fontSize: 15, marginBottom: 32 }}>Encontrá noticias, fallos, términos y cursos en un solo lugar.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
              <input placeholder="¿Qué querés buscar?" style={{ flex: 1, padding: "14px 18px", border: "2px solid #e0d9d1", borderRadius: 12, fontSize: 16, outline: "none" }}
                onFocus={e => (e.target.style.borderColor = "#7C1D3A")}
                onBlur={e => (e.target.style.borderColor = "#e0d9d1")}
              />
              <button style={{ backgroundColor: "#7C1D3A", color: "white", padding: "14px 24px", borderRadius: 12, fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer" }}>
                Buscar
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { label: "Fallos y noticias", icon: "📰", p: "actualidad" as Page },
                { label: "Glosario jurídico", icon: "📖", p: "terminologia" as Page },
                { label: "Jurisprudencia", icon: "⚖️", p: "jurisprudencia-nacional" as Page },
                { label: "Cursos", icon: "📚", p: "cursos" as Page },
                { label: "Foro", icon: "💬", p: "foro" as Page },
                { label: "Chatbot legal", icon: "🤖", p: "chatbot" as Page },
              ].map(item => (
                <button key={item.p} onClick={() => navigate(item.p)}
                  style={{ backgroundColor: "white", borderRadius: 10, padding: "20px 16px", border: "1.5px solid #f0e8e0", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C1D3A"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,29,58,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0e8e0"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ backgroundColor: "#3D0D1E", color: "white", padding: "40px 0 24px" }}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, backgroundColor: "#C9973A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#7C1D3A", fontFamily: "'DM Serif Display', serif", fontWeight: 700, fontSize: 18 }}>H</span>
                </div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22 }}>Herme Iuris</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 280 }}>
                El derecho explicado para todos. Un espacio para entender, debatir y construir justicia juntos.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                {[
                  { icon: "📸", label: "Instagram" },
                  { icon: "💬", label: "WhatsApp" },
                  { icon: "👥", label: "Facebook" },
                  { icon: "🐦", label: "Twitter" },
                ].map(s => (
                  <button key={s.label} title={s.label}
                    style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(201,151,58,0.3)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Secciones", links: ["Home", "Actualidad", "Foro", "Mi Cuenta"] },
              { title: "Recursos", links: ["Cursos", "Terminología", "Chatbot", "Jurisprudencia"] },
              { title: "Legal", links: ["Aviso legal", "Privacidad", "Términos de uso", "Contacto"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C9973A", marginBottom: 14 }}>{col.title}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <button style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                      >
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>© 2026 Herme Iuris. Todos los derechos reservados.</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>El contenido de este sitio es orientativo y no constituye asesoramiento legal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
