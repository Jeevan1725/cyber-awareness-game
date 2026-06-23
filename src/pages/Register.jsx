import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bulbOn from "../assets/bulb-on.png";
import bulbOff from "../assets/bulb-off.png";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswers, setSecurityAnswers] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [plugPosition, setPlugPosition] = useState({ x: 180, y: 200 });
  const [isLightOn, setIsLightOn] = useState(false);
  const [switchPosition, setSwitchPosition] = useState({ x: 30, y: 120 });
  const [mounted, setMounted] = useState(false);

  const switchboardRef = useRef(null);
  const plugRef = useRef(null);
  const bulbRef = useRef(null);

  useEffect(() => {
    randomizeSwitchPosition();
    setTimeout(() => setMounted(true), 80);
  }, []);

  const randomizeSwitchPosition = () => {
    const minX = 160, maxX = 240, minY = 100, maxY = 240;
    setSwitchPosition({
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY,
    });
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => { setIsDragging(false); checkCollision(); };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const plug = plugRef.current;
    const container = plug.parentElement;
    const newX = e.clientX - container.getBoundingClientRect().left - 25;
    const newY = e.clientY - container.getBoundingClientRect().top - 25;
    const newPosition = {
      x: Math.max(0, Math.min(newX, container.clientWidth - 50)),
      y: Math.max(0, Math.min(newY, container.clientHeight - 60)),
    };
    setPlugPosition(newPosition);
    if (switchboardRef.current) {
      const sw = switchboardRef.current.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      const dist = Math.sqrt(
        Math.pow((newPosition.x + 25) - (sw.left - cr.left + sw.width / 2), 2) +
        Math.pow((newPosition.y + 25) - (sw.top - cr.top + sw.height / 2), 2)
      );
      setIsLightOn(dist < 45);
    }
  };

  const checkCollision = () => {
    if (!switchboardRef.current || !plugRef.current) return;
    const plug = plugRef.current.getBoundingClientRect();
    const sw = switchboardRef.current.getBoundingClientRect();
    const cr = plugRef.current.parentElement.getBoundingClientRect();
    const swCX = sw.left - cr.left + sw.width / 2;
    const swCY = sw.top - cr.top + sw.height / 2;
    const dist = Math.sqrt(
      Math.pow((plug.left - cr.left + plug.width / 2) - swCX, 2) +
      Math.pow((plug.top - cr.top + plug.height / 2) - swCY, 2)
    );
    if (dist < 45) {
      setCaptchaVerified(true);
      setPlugPosition({ x: swCX - 25, y: swCY - 25 });
    } else {
      setIsLightOn(false);
    }
  };

  const resetCaptcha = () => {
    setCaptchaVerified(false);
    setIsLightOn(false);
    setPlugPosition({ x: 180, y: 200 });
  };

  const questions = [
    { key: "age", label: "Age" },
    { key: "fav_place", label: "Favourite Place" },
    { key: "roll", label: "Roll Number" },
    { key: "fav_color", label: "Favourite Colour" },
    { key: "fav_subject", label: "Favourite Subject" },
    { key: "native_place", label: "Native Place" },
    { key: "friend_name", label: "Friend Name" },
    { key: "favorite_movie", label: "Favourite Movie" },
  ];

  const handleAnswerChange = (key, value) => {
    setSecurityAnswers(prev => ({ ...prev, [key]: value }));
  };

  const register = async () => {
    if (!captchaVerified) { alert("Please complete the circuit verification first!"); return; }
    const filled = Object.entries(securityAnswers).filter(([, v]) => v?.trim());
    if (filled.length < 5) { alert("Please answer at least 5 security questions"); return; }
    try {
      await axios.post(`${window.API_BASE_URL}/api/auth/register`, {
        username, email, password,
        securityAnswers: Object.fromEntries(filled.slice(0, 5)),
      });
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .reg-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.8rem, 2vw, 1.5rem);
          padding: clamp(0.5rem, 1.5vh, 1rem) clamp(0.8rem, 2vw, 1.5rem);
          font-family: 'Outfit', sans-serif;
        }

        .reg-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #f7fafc 0%, #e3edf1 45%, #d6e3e8 100%);
          z-index: 0;
        }

        .reg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.22);
          z-index: 1;
        }

        /* ── Shared card base ── */
        .reg-card {
          position: relative;
          z-index: 2;
          height: calc(100vh - clamp(1rem, 3vh, 2rem));
          display: flex;
          flex-direction: column;
          overflow: clip;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 1.5rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 24px 80px rgba(15, 23, 42, 0.12),
            0 0 50px rgba(15, 23, 42, 0.08);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reg-card.visible { opacity: 1; transform: translateY(0); }

        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #00E5A0, #38B6FF, transparent);
          border-radius: 1rem;
          z-index: 5;
        }

        /* ── Form card ── */
        .reg-form-card {
          width: min(480px, 46vw);
          padding: clamp(0.8rem, 2vh, 1.4rem) clamp(1rem, 2.5vw, 1.6rem);
        }

        /* ── Captcha card ── */
        .reg-captcha-card {
          width: min(420px, 40vw);
          height: min(420px, 40vw) !important;
          padding: 0;
          cursor: default;
          align-self: center;
        }

        /* ── Header ── */
        .reg-header {
          text-align: center;
          margin-bottom: clamp(0.4rem, 1.2vh, 0.9rem);
          flex-shrink: 0;
        }

        .reg-logo {
          font-family: 'Syne', sans-serif;
          font-size: min(1.6rem, 4vw);
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #00E5A0, #38B6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(0,229,160,0.4));
        }

        .reg-subtitle {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(15,23,42,0.55);
          margin-top: 0.15rem;
        }

        .reg-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,160,0.2), transparent);
          margin-bottom: clamp(0.4rem, 1vh, 0.8rem);
          flex-shrink: 0;
        }

        /* ── Section title ── */
        .reg-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          font-weight: 700;
          line-height: 1.8;
          color: #0f172a;
          margin-bottom: clamp(0.3rem, 0.8vh, 0.6rem);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        /* ── Inputs ── */
        .reg-input {
          width: 100%;
          padding: clamp(0.5rem, 1.2vh, 0.75rem) 1rem;
          background: rgba(15, 23, 42, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 0.65rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.78rem, 1.2vw, 0.9rem);
          outline: none;
          margin-bottom: clamp(0.35rem, 0.9vh, 0.65rem);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .reg-input::placeholder { color: rgba(15, 23, 42, 0.45); }
        .reg-input:focus {
          border-color: rgba(56,182,255,0.55);
          background: rgba(255,255,255,0.92);
          box-shadow: 0 0 0 3px rgba(56,182,255,0.1);
        }

        /* ── Security Q label ── */
        .reg-q-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.8rem, 1.2vw, 0.95rem);
          font-weight: 700;
          color: rgba(0,229,160,0.85);
          margin-bottom: clamp(0.3rem, 0.8vh, 0.5rem);
          flex-shrink: 0;
        }

        /* ── Scrollable questions ── */
        .reg-questions {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,229,160,0.3) transparent;
          padding-right: 4px;
          margin-bottom: clamp(0.3rem, 0.8vh, 0.6rem);
        }
        .reg-questions::-webkit-scrollbar { width: 4px; }
        .reg-questions::-webkit-scrollbar-thumb { background: rgba(0,229,160,0.3); border-radius: 4px; }

        /* ── Register Button ── */
        .reg-btn {
          width: 100%;
          flex-shrink: 0;
          padding: clamp(0.55rem, 1.3vh, 0.8rem);
          border: none;
          border-radius: 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .reg-btn.active {
          background: linear-gradient(135deg, #00E5A0, #00c988);
          color: #021a11;
          box-shadow: 0 4px 20px rgba(0,229,160,0.35);
        }
        .reg-btn.active:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,160,0.5);
        }
        .reg-btn.inactive {
          background: rgba(15, 23, 42, 0.08);
          color: rgba(15, 23, 42, 0.55);
          cursor: not-allowed;
          border: 1px solid rgba(15, 23, 42, 0.12);
        }

        /* ── Captcha inner ── */
        .captcha-inner {
          position: relative;
          width: 100%;
          height: 100%;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          user-select: none;
        }

        .captcha-hdr {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 0.9rem 1.1rem 0.5rem;
          z-index: 10;
          background: linear-gradient(180deg, rgba(2,18,10,0.95) 70%, transparent);
        }

        .captcha-hdr-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.2rem;
        }

        .captcha-hdr-desc {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.38);
        }

        .verified-badge {
          position: absolute;
          bottom: 12px; left: 16px;
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 600;
          color: #00E5A0; z-index: 5;
          filter: drop-shadow(0 0 6px rgba(0,229,160,0.5));
        }

        .reset-btn {
          position: absolute;
          bottom: 10px; right: 14px;
          padding: 5px 12px;
          font-size: 0.72rem;
          font-family: 'Outfit', sans-serif;
          background: rgba(15, 23, 42, 0.08);
          color: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(15, 23, 42, 0.14);
          border-radius: 6px;
          cursor: pointer; z-index: 5;
          transition: all 0.2s;
        }
        .reset-btn:hover {
          background: rgba(255,77,109,0.15);
          color: #FF4D6D;
          border-color: rgba(255,77,109,0.3);
        }

        @keyframes plugGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(0,229,160,0.6); }
          50% { box-shadow: 0 0 20px rgba(0,229,160,0.9); }
        }

        @media (max-width: 700px) {
          .reg-root { flex-direction: column; overflow-y: auto; align-items: center; }
          .reg-form-card, .reg-captcha-card { width: min(480px, 96vw); height: auto; }
          .reg-card { height: auto; }
          .reg-questions { max-height: 200px; }
          .captcha-inner { height: 300px; }
        }
      `}</style>

      <div className="reg-root">
        <div className="reg-bg" />
        <div className="reg-overlay" />

        {/* ── Form Card ── */}
        <div className={`reg-card reg-form-card ${mounted ? "visible" : ""}`}>

          <div className="reg-header">
            <div className="reg-logo">Cyberverse</div>
            <div className="reg-subtitle">Cybersecurity Awareness Platform</div>
          </div>

          <div className="reg-divider" />

          <div className="reg-section-title">🛡️ Create Account</div>

          <input className="reg-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="reg-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="reg-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="reg-q-title">🔐 Answer any 5 Security Questions</div>

          <div className="reg-questions">
            {questions.map((q) => (
              <input
                key={q.key}
                className="reg-input"
                placeholder={q.label}
                onChange={(e) => handleAnswerChange(q.key, e.target.value)}
                style={{ marginBottom: "clamp(0.3rem, 0.8vh, 0.55rem)" }}
              />
            ))}
          </div>

          <button
            className={`reg-btn ${captchaVerified ? "active" : "inactive"}`}
            onClick={register}
            disabled={!captchaVerified}
          >
            Register
          </button>
        </div>

        {/* ── Captcha Card ── */}
        <div
          className={`reg-card reg-captcha-card ${mounted ? "visible" : ""}`}
          style={{ transitionDelay: "0.12s" }}
        >
          <div className="captcha-inner" onMouseMove={handleMouseMove}>

            <div className="captcha-hdr">
              <div className="captcha-hdr-title">🔐 Security Verification</div>
              <div className="captcha-hdr-desc">Drag the wire plug to the switch to turn on the bulb</div>
            </div>

            {/* Bulb */}
            <div ref={bulbRef} style={{ position: "absolute", left: 20, top: 65, width: 70, height: 100, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={isLightOn ? bulbOn : bulbOff}
                alt={isLightOn ? "On" : "Off"}
                style={{
                  width: 70, height: 100, objectFit: "contain", transition: "filter 0.3s",
                  filter: isLightOn ? "drop-shadow(0 0 20px #00E5A0) drop-shadow(0 0 36px rgba(0,229,160,0.5))" : "grayscale(0.6) brightness(0.7)"
                }}
              />
            </div>

            {/* Wire */}
            <svg style={{ position: "absolute", top: 55, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}>
              <path
                d={`M 72 105 Q 40 160, ${plugPosition.x + 22} ${plugPosition.y + 22}`}
                stroke={isLightOn ? "#00E5A0" : "rgba(0,229,160,0.5)"}
                strokeWidth="2.5" fill="none" strokeLinecap="round"
                style={{ transition: "stroke 0.3s", filter: isLightOn ? "drop-shadow(0 0 4px #00E5A0)" : "none" }}
              />
            </svg>

            {/* Plug */}
            <div
              ref={plugRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              style={{
                position: "absolute", left: plugPosition.x, top: plugPosition.y,
                width: 50, height: 50, cursor: "grab", userSelect: "none",
                transition: isDragging ? "none" : "all 0.15s ease", zIndex: 4
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #00E5A0, #009966)",
                border: "2px solid #00E5A0",
                boxShadow: isLightOn ? "0 0 14px rgba(0,229,160,0.8)" : "0 3px 8px rgba(0,0,0,0.5)",
                margin: "0 auto 6px",
                animation: isLightOn ? "plugGlow 0.8s ease-in-out infinite" : "none"
              }} />
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 5, paddingBottom: 2 }}>
                {[12, 15, 12].map((h, i) => (
                  <div key={i} style={{
                    width: 4, height: h,
                    background: isLightOn ? "linear-gradient(180deg, #00E5A0, #38B6FF)" : "linear-gradient(180deg, #00b377, #006644)",
                    borderRadius: 1, border: `1px solid ${isLightOn ? "#00E5A0" : "#00b377"}`,
                    boxShadow: isLightOn ? "0 0 6px rgba(0,229,160,0.7)" : "none"
                  }} />
                ))}
              </div>
            </div>

            {/* Switch */}
            <div
              ref={switchboardRef}
              style={{
                position: "absolute", left: switchPosition.x, top: switchPosition.y,
                width: 50, height: 50,
                background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(56,182,255,0.1))",
                borderRadius: 8,
                border: `2px solid ${isLightOn ? "rgba(0,229,160,0.85)" : "rgba(0,229,160,0.35)"}`,
                boxShadow: isLightOn ? "0 0 20px rgba(0,229,160,0.6), 0 0 40px rgba(0,229,160,0.3)" : "0 4px 14px rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 3, transition: "all 0.3s ease",
                animation: isLightOn ? "neonPulse 0.8s ease-in-out infinite" : "none"
              }}
            >
              <div style={{
                width: 32, height: 32,
                background: isLightOn ? "linear-gradient(135deg, #00E5A0, #00c988)" : "linear-gradient(135deg, rgba(0,229,160,0.25), rgba(0,229,160,0.08))",
                border: `2px solid ${isLightOn ? "#00E5A0" : "rgba(0,229,160,0.4)"}`,
                borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: "bold", color: isLightOn ? "#021a11" : "rgba(0,229,160,0.5)",
                boxShadow: isLightOn ? "0 0 12px rgba(0,229,160,0.7)" : "none"
              }}>
                {isLightOn ? "✓" : ""}
              </div>
              {isLightOn && <div style={{ position: "absolute", fontSize: 18, animation: "plugGlow 0.8s ease-in-out infinite" }}>⚡</div>}
            </div>

            {captchaVerified && <div className="verified-badge">✅ Circuit Complete!</div>}
            {captchaVerified && <button className="reset-btn" onClick={resetCaptcha}>Reset</button>}
          </div>
        </div>

      </div>
    </>
  );
}