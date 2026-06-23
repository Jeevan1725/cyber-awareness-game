import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaBook,
  FaTrophy,
  FaFire,
  FaBrain,
  FaPlay,
  FaLock,
  FaSignOutAlt,
  FaChevronRight
} from "react-icons/fa";

const cards = [
  { icon: FaUser,   label: "Profile",        route: "/profile",  color: "#00E5A0", glow: "rgba(0,229,160,0.35)",   desc: "Your identity & stats" },
  { icon: FaTrophy, label: "Rank",            route: "/rank",     color: "#FFD700", glow: "rgba(255,215,0,0.35)",   desc: "Leaderboard standings" },
  { icon: FaFire,   label: "Streak",          route: "/streak",   color: "#FF6B35", glow: "rgba(255,107,53,0.35)",  desc: "Daily consistency" },
  { icon: FaPlay,   label: "Story Mode",      route: "/story",    color: "#BF5FFF", glow: "rgba(191,95,255,0.35)",  desc: "Narrative learning" },
  { icon: FaBrain,  label: "Weakness",        route: "/weakness", color: "#38B6FF", glow: "rgba(56,182,255,0.35)",  desc: "Target weak spots" },
  { icon: FaBook,   label: "Knowledge",       route: "/knowledge",color: "#FF9F43", glow: "rgba(255,159,67,0.35)",  desc: "Expand mastery" },
  { icon: FaLock,   label: "Password Vault",  route: "/vault",    color: "#FF4D6D", glow: "rgba(255,77,109,0.35)",  desc: "Secure credentials" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user?.username) navigate("/login");
    setTimeout(() => setMounted(true), 50);
  }, [navigate, user?.username]);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          overflow: hidden;
        }

        .dash-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          font-family: 'Inter', sans-serif;
          color: #1f2937;
          padding: 0 clamp(1rem, 3vw, 2.5rem);
        }

        /* ── Top Bar ── */
        .dash-topbar {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: clamp(0.75rem, 2vh, 1.5rem) 0 0;
        }

        .dash-logo {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 4rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #00E5A0, #38B6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(0,229,160,0.45));
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(45,27,78,0.08);
          border: 1px solid rgba(45,27,78,0.2);
          border-radius: 100px;
          padding: 0.6rem 1.4rem;
          color: rgba(45,27,78,0.7);
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .logout-btn:hover {
          background: rgba(255,77,109,0.15);
          border-color: rgba(255,77,109,0.4);
          color: #FF4D6D;
        }

        /* ── Hero ── */
        .dash-hero {
          flex-shrink: 0;
          padding: clamp(0.6rem, 2vh, 1.4rem) 0 clamp(0.4rem, 1.5vh, 1rem);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .dash-hero.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dash-greeting {
          font-size: clamp(1.2rem, 2.3vw, 1.6rem);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(45,27,78,0.7);
          margin-bottom: 0.3rem;
          text-shadow: none;
        }

        .dash-username {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(90deg, #00E5A0, #38B6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.01em;
        }

        .dash-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(45,27,78,0.15), transparent);
          margin-top: clamp(0.4rem, 1.2vh, 0.8rem);
        }

        /* ── Grid ── */
        .dash-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: clamp(0.5rem, 1.2vw, 1rem);
          padding-bottom: clamp(0.75rem, 2vh, 1.5rem);
          min-height: 0;
        }

        .dash-card:nth-child(5) { grid-column: 1; grid-row: 2; }
        .dash-card:nth-child(6) { grid-column: 2; grid-row: 2; }
        .dash-card:nth-child(7) { grid-column: 3 / 5; grid-row: 2; }

        /* ── Card ── */
        .dash-card {
          position: relative;
          background: rgba(45,27,78,0.08);
          border: 1px solid rgba(45,27,78,0.15);
          border-radius: clamp(0.75rem, 1.5vw, 1.25rem);
          padding: clamp(0.8rem, 1.8vh, 1.4rem) clamp(0.8rem, 1.5vw, 1.25rem);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: clamp(0.4rem, 1vh, 0.7rem);
          transition: transform 0.26s cubic-bezier(.22,.68,0,1.2),
                      border-color 0.26s ease,
                      box-shadow 0.26s ease,
                      background 0.26s ease;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          min-height: 0;
        }
        .dash-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .dash-card:hover {
          transform: translateY(-5px);
          background: rgba(45,27,78,0.12);
        }

        .card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 1.25rem 1.25rem 0 0;
          opacity: 0;
          transition: opacity 0.26s ease;
        }
        .dash-card:hover .card-top-line { opacity: 1; }

        .card-icon-wrap {
          width: clamp(2.5rem, 4vw, 3.2rem);
          height: clamp(2.5rem, 4vw, 3.2rem);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.26s ease;
        }
        .dash-card:hover .card-icon-wrap { transform: scale(1.1); }

        .card-label {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.3rem, 2.1vw, 1.8rem);
          font-weight: 700;
          color: #2d1b4e;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc {
          font-size: clamp(1rem, 1.5vw, 1.3rem);
          color: rgba(45,27,78,0.55);
          font-weight: 400;
          line-height: 1.3;
        }

        .card-arrow {
          position: absolute;
          bottom: 0.9rem;
          right: 0.9rem;
          opacity: 0;
          transform: translateX(-5px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          font-size: 0.65rem;
        }
        .dash-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 900px) {
          .dash-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
          }
          .dash-card:nth-child(5) { grid-column: auto; grid-row: auto; }
          .dash-card:nth-child(6) { grid-column: auto; grid-row: auto; }
          .dash-card:nth-child(7) { grid-column: 1 / 4; grid-row: auto; }
        }

        @media (max-width: 560px) {
          .dash-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 1fr);
          }
          .dash-card:nth-child(5) { grid-column: auto; grid-row: auto; }
          .dash-card:nth-child(6) { grid-column: auto; grid-row: auto; }
          .dash-card:nth-child(7) { grid-column: 1 / 3; grid-row: auto; }
          .card-desc { display: none; }
        }
      `}</style>

      <div className="dash-root">

        <div className="dash-topbar">
          <div className="dash-logo">Cyberverse</div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={11} />
            Sign out
          </button>
        </div>

        <div className={`dash-hero ${mounted ? "visible" : ""}`}>
          <p className="dash-greeting">Welcome back</p>
          <h1 className="dash-username">{user?.username || "Explorer"}</h1>
          <div className="dash-divider" />
        </div>

        <div className="dash-grid">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.route}
                className={`dash-card ${mounted ? "visible" : ""}`}
                style={{ transitionDelay: mounted ? `${i * 55 + 250}ms` : "0ms" }}
                onClick={() => navigate(card.route)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 6px 28px ${card.glow}, 0 0 0 1px ${card.color}22`;
                  e.currentTarget.style.borderColor = `${card.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div className="card-top-line" style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
                <div className="card-icon-wrap" style={{ background: `${card.color}18`, boxShadow: `0 0 0 1px ${card.color}28` }}>
                  <Icon size={22} style={{ color: card.color }} />
                </div>
                <div>
                  <div className="card-label">{card.label}</div>
                  <div className="card-desc">{card.desc}</div>
                </div>
                <FaChevronRight className="card-arrow" style={{ color: card.color }} />
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}