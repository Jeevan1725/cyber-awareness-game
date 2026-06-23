import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bulbOn from "../assets/bulb-on.png";
import bulbOff from "../assets/bulb-off.png";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [plugPosition, setPlugPosition] = useState({ x: 280, y: 220 });
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
    const containerWidth = 560;
    const containerHeight = 360;
    const switchSize = 50;
    const minX = 140;
    const maxX = containerWidth - switchSize - 30;
    const minY = 90;
    const maxY = containerHeight - switchSize - 30;
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
    setSwitchPosition({ x: randomX, y: randomY });
  };

  const loginUser = async () => {
    if (!captchaVerified) {
      alert("Please plug the wire into the switchboard first!");
      return;
    }
    try {
      const res = await axios.post(`${window.API_BASE_URL}/api/auth/login`, { login, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
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
      const switchElement = switchboardRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const switchCenterX = switchElement.left - containerRect.left + switchElement.width / 2;
      const switchCenterY = switchElement.top - containerRect.top + switchElement.height / 2;
      const plugCenterX = newPosition.x + 25;
      const plugCenterY = newPosition.y + 25;
      const distance = Math.sqrt(Math.pow(plugCenterX - switchCenterX, 2) + Math.pow(plugCenterY - switchCenterY, 2));
      setIsLightOn(distance < 30);
    }
  };

  const checkCollision = () => {
    if (!switchboardRef.current || !plugRef.current) return;
    const plug = plugRef.current.getBoundingClientRect();
    const switchboard = switchboardRef.current.getBoundingClientRect();
    const container = plugRef.current.parentElement.getBoundingClientRect();
    const plugCenterX = plug.left - container.left + plug.width / 2;
    const plugCenterY = plug.top - container.top + plug.height / 2;
    const switchboardCenterX = switchboard.left - container.left + switchboard.width / 2;
    const switchboardCenterY = switchboard.top - container.top + switchboard.height / 2;
    const distance = Math.sqrt(Math.pow(plugCenterX - switchboardCenterX, 2) + Math.pow(plugCenterY - switchboardCenterY, 2));
    if (distance < 30) {
      setCaptchaVerified(true);
      setPlugPosition({ x: switchboardCenterX - 25, y: switchboardCenterY - 25 });
    } else {
      setIsLightOn(false);
    }
  };

  const resetCaptcha = () => {
    setCaptchaVerified(false);
    setIsLightOn(false);
    setPlugPosition({ x: 280, y: 220 });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .login-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #f7fafc 0%, #e3edf1 45%, #d6e3e8 100%);
          z-index: 0;
        }

        .login-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.22);
          z-index: 1;
        }

        /* ── Card ── */
        .login-card {
          position: relative;
          z-index: 2;
          width: min(560px, 96vw);
          height: calc(100vh - clamp(1rem, 3vh, 2rem));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 1.5rem;
          padding: clamp(1rem, 2.5vh, 1.75rem) clamp(1.2rem, 3vw, 2rem);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 24px 80px rgba(15, 23, 42, 0.12),
            0 0 50px rgba(15, 23, 42, 0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .login-card.visible { opacity: 1; transform: translateY(0); }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #38B6FF, #00E5A0, transparent);
          border-radius: 1rem;
        }

        /* ── Header ── */
        .login-header {
          text-align: center;
          margin-bottom: clamp(0.5rem, 1.5vh, 1rem);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s;
        }
        .login-card.visible .login-header { opacity: 1; transform: translateY(0); }

        .login-logo {
          font-family: 'Syne', sans-serif;
          font-size: min(1.8rem, 9vw);
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #38B6FF, #00E5A0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 14px rgba(56,182,255,0.4));
          margin-bottom: 0.2rem;
        }

        .login-subtitle {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(15, 23, 42, 0.65);
        }

        .login-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.15), transparent);
          margin-bottom: clamp(0.4rem, 1.2vh, 0.9rem);
        }

        /* ── Title ── */
        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.1;
          color: #0f172a;
          margin-bottom: clamp(0.4rem, 1vh, 0.8rem);
          padding-bottom: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.55s ease 0.3s;
        }
        .login-card.visible .login-title { opacity: 1; }

        /* ── Inputs ── */
        .login-input-wrap {
          position: relative;
          margin-bottom: clamp(0.4rem, 1vh, 0.75rem);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s;
        }
        .login-input-wrap:nth-child(2) { transition-delay: 0.42s; }
        .login-card.visible .login-input-wrap { opacity: 1; transform: translateY(0); }

        .login-input {
          width: 100%;
          padding: 0.85rem 1.1rem;
          background: rgba(15, 23, 42, 0.06);
          border: 1px solid rgba(15, 23, 42, 0.12);
          border-radius: 0.75rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .login-input::placeholder { color: rgba(15, 23, 42, 0.45); }
        .login-input:focus {
          border-color: rgba(56,182,255,0.55);
          background: rgba(255,255,255,0.92);
          box-shadow: 0 0 0 3px rgba(56,182,255,0.1);
        }

        /* ── CAPTCHA Box ── */
        .captcha-box {
          border: 1px solid rgba(15,23,42,0.12);
          border-radius: 1rem;
          padding: 0;
          margin-bottom: clamp(0.4rem, 1vh, 0.8rem);
          background: rgba(226, 242, 255, 0.78);
          position: relative;
          flex: 1;
          min-height: 0;
          user-select: none;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.5s ease 0.5s;
        }
        .login-card.visible .captcha-box { opacity: 1; }

        .captcha-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 0.9rem 1.1rem 0.5rem;
          z-index: 10;
          background: linear-gradient(180deg, rgba(2,10,28,0.9) 70%, transparent);
        }

        .captcha-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.2rem;
        }

        .captcha-desc {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.01em;
        }

        /* ── Login Button ── */
        .login-btn {
          width: 100%;
          flex-shrink: 0;
          margin-top: clamp(0.4rem, 1vh, 0.8rem);
          padding: clamp(0.6rem, 1.5vh, 0.9rem);
          border: none;
          border-radius: 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 0;
          transition: opacity 0.5s ease 0.6s, transform 0.22s ease, box-shadow 0.22s ease;
        }
        .login-card.visible .login-btn { opacity: 1; }

        .login-btn.active {
          background: linear-gradient(135deg, #38B6FF, #00c8ff);
          color: #020a1c;
          box-shadow: 0 4px 20px rgba(56,182,255,0.35);
        }
        .login-btn.active:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(56,182,255,0.5);
        }
        .login-btn.inactive {
          background: rgba(15,23,42,0.08);
          color: rgba(15,23,42,0.55);
          cursor: not-allowed;
          border: 1px solid rgba(15,23,42,0.12);
        }

        /* ── Verified badge ── */
        .verified-badge {
          position: absolute;
          bottom: 12px;
          left: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #00E5A0;
          z-index: 5;
          filter: drop-shadow(0 0 6px rgba(0,229,160,0.5));
        }

        .reset-btn {
          position: absolute;
          bottom: 10px;
          right: 14px;
          padding: 5px 12px;
          font-size: 0.75rem;
          font-family: 'Outfit', sans-serif;
          background: rgba(15,23,42,0.08);
          color: rgba(15,23,42,0.85);
          border: 1px solid rgba(15,23,42,0.14);
          border-radius: 6px;
          cursor: pointer;
          z-index: 5;
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
      `}</style>

      <div className="login-root">
        <div className="login-bg" />
        <div className="login-overlay" />

        <div className={`login-card ${mounted ? "visible" : ""}`}>

          {/* Header */}
          <div className="login-header">
            <div className="login-logo">Cyberverse</div>
            <div className="login-subtitle">Cybersecurity Awareness Platform</div>
          </div>

          <div className="login-divider" />

          <div className="login-title">
            <span>🔒</span> Secure Login
          </div>

          {/* Inputs */}
          <div className="login-input-wrap">
            <input
              className="login-input"
              placeholder="Email or Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="login-input-wrap">
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CAPTCHA */}
          <div
            className="captcha-box"
            onMouseMove={handleMouseMove}
          >
            <div className="captcha-header">
              <div className="captcha-title">
                <span>🔐</span> Security Verification
              </div>
              <div className="captcha-desc">Drag the wire plug to the switch to turn on the bulb</div>
            </div>

            {/* Bulb */}
            <div ref={bulbRef} style={{ position: "absolute", left: "40px", top: "70px", width: "90px", height: "130px", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={isLightOn ? bulbOn : bulbOff}
                alt={isLightOn ? "Bulb On" : "Bulb Off"}
                style={{
                  width: "90px", height: "130px", objectFit: "contain",
                  transition: "filter 0.3s",
                  filter: isLightOn ? "drop-shadow(0 0 24px #00E5A0) drop-shadow(0 0 40px rgba(0,229,160,0.5))" : "grayscale(0.6) brightness(0.7)"
                }}
              />
            </div>

            {/* Wire SVG */}
            <svg style={{ position: "absolute", top: "60px", left: "0", width: "100%", height: "300px", pointerEvents: "none", zIndex: 2 }}>
              <path
                d={`M 86 128 Q 0 200, ${plugPosition.x + 22} ${plugPosition.y - 1}`}
                stroke={isLightOn ? "#00E5A0" : "rgba(56,182,255,0.6)"}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                style={{ transition: "stroke 0.3s ease", filter: isLightOn ? "drop-shadow(0 0 4px #00E5A0)" : "none" }}
              />
            </svg>

            {/* Plug */}
            <div
              ref={plugRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              style={{
                position: "absolute", left: `${plugPosition.x}px`, top: `${plugPosition.y}px`,
                width: "50px", height: "50px", cursor: "grab", userSelect: "none",
                transition: isDragging ? "none" : "all 0.15s ease", zIndex: 4
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #4a9eff, #2060cc)",
                border: "2px solid #38B6FF",
                boxShadow: isLightOn ? "0 0 15px rgba(56,182,255,0.8)" : "0 3px 8px rgba(0,0,0,0.5)",
                margin: "0 auto 6px",
                animation: isLightOn ? "plugGlow 0.8s ease-in-out infinite" : "none"
              }} />
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "5px", paddingBottom: "2px" }}>
                {[12, 15, 12].map((h, i) => (
                  <div key={i} style={{
                    width: "4px", height: `${h}px`,
                    background: isLightOn ? "linear-gradient(180deg, #00E5A0, #38B6FF)" : "linear-gradient(180deg, #4a9eff, #2060cc)",
                    borderRadius: "1px", border: `1px solid ${isLightOn ? "#00E5A0" : "#38B6FF"}`,
                    boxShadow: isLightOn ? "0 0 6px rgba(0,229,160,0.7)" : "0 1px 3px rgba(0,0,0,0.5)"
                  }} />
                ))}
              </div>
            </div>

            {/* Switch */}
            <div
              ref={switchboardRef}
              style={{
                position: "absolute", left: `${switchPosition.x}px`, top: `${switchPosition.y}px`,
                width: "50px", height: "50px",
                background: "linear-gradient(135deg, rgba(56,182,255,0.15), rgba(0,229,160,0.1))",
                borderRadius: "8px",
                boxShadow: isLightOn ? "0 0 20px rgba(0,229,160,0.6), 0 0 40px rgba(0,229,160,0.3)" : "0 4px 14px rgba(0,0,0,0.5)",
                border: `2px solid ${isLightOn ? "rgba(0,229,160,0.8)" : "rgba(56,182,255,0.4)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 3,
                transition: "all 0.3s ease",
                animation: isLightOn ? "neonPulse 0.8s ease-in-out infinite" : "none"
              }}
            >
              <div style={{
                width: "32px", height: "32px",
                background: isLightOn ? "linear-gradient(135deg, #00E5A0, #00c988)" : "linear-gradient(135deg, rgba(56,182,255,0.3), rgba(56,182,255,0.1))",
                border: `2px solid ${isLightOn ? "#00E5A0" : "rgba(56,182,255,0.5)"}`,
                borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: "bold", color: isLightOn ? "#020a1c" : "rgba(56,182,255,0.6)",
                boxShadow: isLightOn ? "0 0 12px rgba(0,229,160,0.7)" : "none"
              }}>
                {isLightOn ? "✓" : ""}
              </div>
              {isLightOn && (
                <div style={{ position: "absolute", fontSize: "18px", animation: "plugGlow 0.8s ease-in-out infinite" }}>⚡</div>
              )}
            </div>

            {captchaVerified && (
              <div className="verified-badge">✅ Circuit Complete!</div>
            )}
            {captchaVerified && (
              <button className="reset-btn" onClick={resetCaptcha}>Reset</button>
            )}
          </div>

          {/* Login Button */}
          <button
            className={`login-btn ${captchaVerified ? "active" : "inactive"}`}
            onClick={loginUser}
          >
            Login
          </button>

        </div>
      </div>
    </>
  );
}