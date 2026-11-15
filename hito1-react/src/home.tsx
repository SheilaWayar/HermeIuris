import { useState } from "react";

type Target = "actualidad" | "foro" | "cursos" | "chatbot" | "terminologia" | "buscador" | "cuenta";

const NIGHT = "#08142B";
const NAVY = "#0F2342";
const PANEL = "#0A1A33";
const GOLD = "#C5A059";
const GOLD_TEXT = "#8A6A1F";

const AREAS = [
  { icon: "⚖️", title: "Derecho Civil", desc: "Relaciones entre particulares, contratos, alquileres y daños.", to: "foro" as Target },
  { icon: "👷", title: "Derecho Laboral", desc: "Derechos del trabajador, despidos, teletrabajo e indemnizaciones.", to: "actualidad" as Target },
  { icon: "👨‍👩‍👧", title: "Familia y Sucesiones", desc: "Divorcios, filiación, herencias y vínculos familiares.", to: "cursos" as Target },
  { icon: "🏢", title: "Derecho Comercial", desc: "Actividad empresarial, sociedades y contratos comerciales.", to: "terminologia" as Target },
];

const MORE_AREAS = ["Penal", "Constitucional", "Procesal", "Administrativo", "Tributario", "Consumidor", "Ambiental", "Informativo"];

const TRUST = [
  { icon: "🛡️", title: "Contenido verificado", desc: "Fallos y fuentes revisadas" },
  { icon: "👤", title: "Pensado para vos", desc: "Lenguaje simple y claro" },
  { icon: "⚖️", title: "Jurisprudencia actual", desc: "Nacional y provincial" },
  { icon: "🔒", title: "Tus datos protegidos", desc: "Privacidad ante todo" },
];

const field: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: NAVY,
  border: "1px solid rgba(197,160,89,0.28)",
  borderRadius: 4,
  color: "white",
  fontSize: 13,
  outline: "none",
};

export default function Home({ navigate }: { navigate: (p: Target) => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* HERO */}
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

      {/* ÁREAS + FORMULARIO */}
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

          <aside aria-label="Reservar una consulta" style={{ backgroundColor: PANEL, padding: "28px 24px" }}>
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
                <input type="text" placeholder="Nombre completo" aria-label="Nombre completo" required style={field} />
                <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" required style={field} />
                <input type="tel" placeholder="Teléfono" aria-label="Teléfono" style={field} />
                <select aria-label="Área del derecho" defaultValue="" style={field}>
                  <option value="" disabled>Seleccioná un área</option>
                  <option>Civil</option>
                  <option>Laboral</option>
                  <option>Familia</option>
                  <option>Comercial</option>
                  <option>Otra</option>
                </select>
                <textarea placeholder="Tu mensaje" aria-label="Tu mensaje" rows={4} style={{ ...field, resize: "vertical" }} />
                <button type="submit" style={{ backgroundColor: GOLD, color: NIGHT, padding: "12px 0", borderRadius: 4, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                  Enviar consulta
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>

      {/* FRANJA DE CONFIANZA */}
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