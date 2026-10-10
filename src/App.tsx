import { useState } from "react";

const NIGHT = "#08142B";
const NAVY = "#0F2342";
const NAVY_CARD = "#0A1A33";
const GOLD = "#C5A059";
const GOLD_LIGHT = "#E8C99A";
const BORDER = "#DCE1EB";
const BG = "#F4F6FA";

const AREAS = [
  { title: "Civil", desc: "Relaciones entre particulares", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400" },
  { title: "Penal", desc: "Delitos y sanciones", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400" },
  { title: "Laboral", desc: "Derechos del trabajador", img: "https://images.unsplash.com/photo-1521790361543-f645cf042ec4?w=400" },
  { title: "Comercial", desc: "Actividad empresarial", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" },
  { title: "Familia", desc: "Vínculos familiares y filiación", img: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400" },
  { title: "Constitucional", desc: "Derechos y garantías", img: "https://images.unsplash.com/photo-1589996448606-27d38c2a2bc0?w=400" },
  { title: "Procesal", desc: "Procedimientos judiciales", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
  { title: "Administrativo", desc: "Estado y administración", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400" },
  { title: "Tributario", desc: "Impuestos y finanzas públicas", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" },
  { title: "Consumidor", desc: "Defensa del consumidor", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400" },
  { title: "Ambiental", desc: "Medio ambiente y recursos", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
  { title: "Informativo", desc: "Novedades y actualidad", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400" },
];

const DICC = [
  { term: "Acción", def: "Derecho de acudir ante un juez para pedir protección." },
  { term: "Allanamiento", def: "Ingreso autorizado por un juez a un domicilio." },
  { term: "Cautelar", def: "Medida preventiva para proteger un derecho." },
  { term: "Demanda", def: "Escrito que inicia un proceso judicial." },
  { term: "Fuero", def: "Jurisdicción competente según la materia." },
  { term: "Hábeas Corpus", def: "Garantía para proteger la libertad personal." },
];

export default function App() {
  const [tab, setTab] = useState<"ingresar"|"registrarse">("ingresar");
  const [search, setSearch] = useState("");

  const filtered = DICC.filter(t => t.term.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, fontFamily: "'Outfit', sans-serif" }}>
      {/* HEADER - color de la última imagen */}
      <header style={{ backgroundColor: NIGHT, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", position: "sticky", top: 0, zIndex: 20, borderBottom: `1px solid rgba(197,160,89,0.2)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, backgroundColor: GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: NIGHT, fontWeight: 900 }}>H</div>
          <span style={{ color: "white", fontFamily: "'DM Serif Display', serif", fontSize: 21, fontWeight: 700 }}>Herme Iuris</span>
        </div>
        <nav style={{ display: "flex", gap: 6 }}>
          {["Home","Actualidad","Foro","Mi Cuenta"].map(l => (
            <span key={l} style={{ color: l==="Home"?GOLD:"rgba(255,255,255,0.7)", backgroundColor: l==="Home"?"rgba(197,160,89,0.15)":"transparent", padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{l}</span>
          ))}
        </nav>
      </header>

      {/* HERO - de la 1ra imagen pero en azul noche/dorado */}
      <section style={{ backgroundColor: NIGHT, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", minHeight: 380, position: "relative" }}>
          <div style={{ padding: "50px 5% 50px 8%", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", backgroundColor: "rgba(197,160,89,0.15)", border: `1px solid rgba(197,160,89,0.3)`, borderRadius: 20, padding: "5px 14px", marginBottom: 18 }}>
              <p style={{ color: GOLD, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", margin: 0 }}>BIENVENIDO A HERME IURIS</p>
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", color: "white", fontSize: "clamp(26px, 2.8vw, 36px)", lineHeight: 1.25, fontWeight: 400, marginBottom: 16 }}>
              Herme Iuris es un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.7, maxWidth: 520, marginBottom: 22 }}>
              Aquí no importa si sos abogado o ciudadano común: todos tienen derecho a entender cómo las leyes impactan en nuestra sociedad. Queremos que te sientas acompañado, identificado y con voz en cada debate.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["El derecho explicado para todos.", "Tu voz también cuenta.", "La justicia se construye entre todos."].map(t=>(
                <span key={t} style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", padding: "7px 14px", borderRadius: 20, fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800" alt="Justicia" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${NIGHT} 15%, rgba(8,20,43,0) 60%)` }} />
          </div>
        </div>
      </section>

      {/* 3 COLUMNAS - layout de la 1ra y 2da foto */}
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr 320px", gap: 18, padding: 18, alignItems: "start" }}>
        
        {/* LEFT - Mi Cuenta */}
        <div style={{ backgroundColor: "white", borderRadius: 12, border: `1px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <div style={{ backgroundColor: NIGHT, padding: "14px 16px", color: "white", fontFamily: "'DM Serif Display', serif", fontSize: 16 }}>Mi Cuenta</div>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", backgroundColor: "#EEF2F7", borderRadius: 9, padding: 4, marginBottom: 16 }}>
              <button onClick={()=>setTab("ingresar")} style={{ flex: 1, padding: "8px 0", borderRadius: 7, border: "none", backgroundColor: tab==="ingresar"?NIGHT:"transparent", color: tab==="ingresar"?"white":"#5a6a85", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Ingresar</button>
              <button onClick={()=>setTab("registrarse")} style={{ flex: 1, padding: "8px 0", borderRadius: 7, border: "none", backgroundColor: tab==="registrarse"?NIGHT:"transparent", color: tab==="registrarse"?"white":"#5a6a85", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Registrarse</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <input placeholder="Email o teléfono" style={{ padding: "11px 12px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 12, outline: "none" }} />
              <input placeholder="Contraseña" type="password" style={{ padding: "11px 12px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 12, outline: "none" }} />
              <button style={{ backgroundColor: NIGHT, color: "white", padding: "12px 0", borderRadius: 8, fontWeight: 800, fontSize: 12, border: "none", marginTop: 4, cursor: "pointer" }}>Acceder</button>
              <a href="#" style={{ textAlign: "center", fontSize: 11, color: NAVY, textDecoration: "none", marginTop: 2 }}>¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>

        {/* CENTER - Areas */}
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: NIGHT, fontSize: 22, margin: "4px 0 12px 0" }}>Areas del Derecho</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {AREAS.map(a=>(
              <div key={a.title} style={{ backgroundColor: "white", borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, cursor: "pointer" }}>
                <div style={{ height: 86, position: "relative" }}>
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,20,43,0.85) 10%, rgba(0,0,0,0) 70%)" }} />
                  <span style={{ position: "absolute", bottom: 7, left: 9, color: "white", fontWeight: 800, fontSize: 12, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{a.title}</span>
                </div>
                <div style={{ padding: "7px 9px", fontSize: 10.5, color: "#6b7a90", backgroundColor: "white" }}>{a.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            {[
              { icon: "📰", title: "Últimas noticias", desc: "Fallos y análisis recientes" },
              { icon: "💬", title: "Foro de debate", desc: "Participá en la discusión" },
              { icon: "📚", title: "Cursos gratuitos", desc: "Aprendé sobre tus derechos" },
              { icon: "🤖", title: "Chatbot legal", desc: "Consultá dudas al instante" },
            ].map(c=>(
              <div key={c.title} style={{ backgroundColor: "white", borderRadius: 10, padding: "14px 14px", border: `1px solid ${BORDER}`, cursor: "pointer" }}>
                <p style={{ color: NIGHT, fontWeight: 800, fontSize: 12, margin: "0 0 3px 0" }}>{c.icon} {c.title}</p>
                <p style={{ fontSize: 11, color: "#7a8aa6", margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Diccionario */}
        <div style={{ backgroundColor: "white", borderRadius: 12, border: `1px solid ${BORDER}`, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <div style={{ backgroundColor: NIGHT, padding: "14px 16px", color: "white", fontFamily: "'DM Serif Display', serif", fontSize: 15, display: "flex", gap: 8 }}>📖 Diccionario Jurídico</div>
          <div style={{ padding: 14 }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar término..." style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 12, marginBottom: 14, outline: "none" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filtered.map(d=>(
                <div key={d.term} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 10, marginBottom: 13 }}>
                  <p style={{ fontWeight: 800, fontSize: 12, color: NIGHT, margin: "0 0 2px 0" }}>{d.term}</p>
                  <p style={{ fontSize: 11, color: "#5e6e88", lineHeight: 1.35, margin: 0 }}>{d.def}</p>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", marginTop: 10, padding: "10px 0", borderRadius: 8, border: `1.5px solid ${NIGHT}`, color: NIGHT, fontWeight: 800, fontSize: 11, backgroundColor: "white", cursor: "pointer" }}>Ver glosario completo →</button>
          </div>
        </div>
      </div>

      {/* FOOTER - color de última imagen */}
      <footer style={{ backgroundColor: NIGHT, marginTop: 20, padding: "32px 5% 18px 5%", borderTop: `1px solid rgba(197,160,89,0.15)` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 30, maxWidth: 1280, margin: "0 auto" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, backgroundColor: GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: NIGHT, fontWeight: 900 }}>H</div>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, fontWeight: 700, color: "white" }}>Herme Iuris</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 280 }}>El derecho explicado para todos. Un espacio para entender, debatir y construir justicia juntos.</p>
          </div>
          <div>
            <p style={{ color: GOLD, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", marginBottom: 14 }}>SECCIONES</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.65)" }}><span>Home</span><span>Actualidad</span><span>Foro</span><span>Mi Cuenta</span></div>
          </div>
          <div>
            <p style={{ color: GOLD, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", marginBottom: 14 }}>RECURSOS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.65)" }}><span>Cursos</span><span>Terminología</span><span>Chatbot</span><span>Jurisprudencia</span></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 28, paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)", maxWidth: 1280, margin: "28px auto 0 auto" }}>
          <span>© 2026 Herme Iuris. Todos los derechos reservados.</span>
          <span>El contenido de este sitio es orientativo y no constituye asesoramiento legal.</span>
        </div>
      </footer>
    </div>
  );
}