import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        .landing-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
        }

        /* Background color */
        .landing-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #eaf6f0 0%, #c5dbd1 45%, #66dfab 100%);
          z-index: 0;
        }

        /* Transparent overlay */
        .landing-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
          z-index: 1;
        }

        /* ── Card ── */
        .landing-card {
          position: relative;
          z-index: 2;
          width: min(760px, 96vw);
          max-width: 860px;
          background: rgba(7, 34, 33, 0.88);
          border: 1px solid rgba(0, 229, 160, 0.22);
          border-radius: 1.8rem;
          container-type: inline-size;
          padding: clamp(3rem, 6vh, 5rem) clamp(3rem, 5.5vw, 5rem);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            0 0 0 1px rgba(0,229,160,0.08),
            0 32px 80px rgba(0,0,0,0.28),
            0 0 90px rgba(0,229,160,0.08) inset;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .landing-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Thin top accent line */
        .landing-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #00E5A0, #38B6FF, transparent);
          border-radius: 1rem;
        }

        /* ── Logo / Brand ── */
        .landing-brand {
          text-align: center;
          margin-bottom: clamp(1.4rem, 3vh, 2rem);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .landing-card.visible .landing-brand {
          opacity: 1;
          transform: translateY(0);
        }

        .landing-logo {
          font-family: 'Syne', sans-serif;
          font-size: min(3rem, 7vw);
          font-weight: 800;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #00E5A0, #38B6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 18px rgba(0,229,160,0.4));
          line-height: 1;
          margin-bottom: 0.4rem;
          width: 100%;
          display: block;
        }

        .landing-tagline {
          font-size: clamp(0.8rem, 1.5vw, 0.95rem);
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* ── Divider ── */
        .landing-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,160,0.2), transparent);
          margin-bottom: clamp(1.4rem, 3vh, 2rem);
        }

        /* ── Heading ── */
        .landing-heading {
          text-align: center;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          margin-bottom: clamp(1.5rem, 3.5vh, 2.2rem);
          line-height: 1.5;
          letter-spacing: 0.01em;
          opacity: 0;
          transition: opacity 0.6s ease 0.35s;
        }
        .landing-card.visible .landing-heading {
          opacity: 1;
        }

        /* ── Buttons ── */
        .landing-btns {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }
        .landing-card.visible .landing-btns {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-primary {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #00E5A0, #00c988);
          border: none;
          border-radius: 0.75rem;
          color: #021a11;
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 4px 20px rgba(0,229,160,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,160,0.45);
          background: linear-gradient(135deg, #00f0aa, #00E5A0);
        }
        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 0.75rem;
          color: rgba(255,255,255,0.85);
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .btn-secondary:hover {
          background: rgba(56,182,255,0.1);
          border-color: rgba(56,182,255,0.45);
          color: #38B6FF;
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(56,182,255,0.2);
        }
        .btn-secondary:active {
          transform: translateY(0);
        }

        /* ── Footer note ── */
        .landing-footer {
          text-align: center;
          margin-top: clamp(1rem, 2.5vh, 1.5rem);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.6s ease 0.6s;
        }
        .landing-card.visible .landing-footer {
          opacity: 1;
        }
      `}</style>

      <div className="landing-root">
        {/* Background */}
        <div className="landing-bg" />
        <div className="landing-overlay" />

        {/* Card */}
        <div className={`landing-card ${mounted ? "visible" : ""}`}>

          {/* Brand */}
          <div className="landing-brand">
            <div className="landing-logo">Cyberverse</div>
            <div className="landing-tagline">Cybersecurity Awareness Platform</div>
          </div>

          <div className="landing-divider" />

          <p className="landing-heading">
            Learn. Defend. Stay Secure — login or register to start your cybersecurity journey.
          </p>

          <div className="landing-btns">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-secondary" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>

          <div className="landing-footer">Awareness · Defense · Empowerment</div>
        </div>
      </div>
    </>
  );
}