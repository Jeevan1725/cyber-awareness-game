import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaStar, FaFire, FaBrain, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !localUser) { navigate("/login"); return; }

    fetch(`${window.API_BASE_URL}/api/auth/user/${localUser._id}`)
      .then(async res => {
        if (!res.ok) { const msg = await res.text(); throw new Error(msg || "Failed to fetch user"); }
        return res.json();
      })
      .then(data => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => setMounted(true), 60);
      })
      .catch(err => setError(err.message));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (error) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06060f", color: "#FF4D6D", fontFamily: "Outfit, sans-serif", fontSize: "1rem" }}>
      ⚠ {error}
    </div>
  );

  if (!user) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06060f", color: "rgba(255,255,255,0.4)", fontFamily: "Outfit, sans-serif", fontSize: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(0,229,160,0.3)", borderTopColor: "#00E5A0", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        Loading profile...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const weaknesses = user?.weakness?.length === 0
    ? []
    : (user?.weakness || []).map(w => w.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()));

  const stats = [
    { icon: FaStar,  label: "Score",  value: user?.score ?? 0,  color: "#FFD700", glow: "rgba(255,215,0,0.3)" },
    { icon: FaFire,  label: "Streak", value: user?.streak ?? 0, color: "#FF6B35", glow: "rgba(255,107,53,0.3)" },
    { icon: FaBrain, label: "Weaknesses", value: weaknesses.length, color: "#38B6FF", glow: "rgba(56,182,255,0.3)" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .profile-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          color: #1f2937;
          padding: 1rem;
        }

        .profile-card {
          width: min(620px, 96vw);
          max-height: calc(100vh - 2rem);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 1.5rem;
          padding: clamp(1.75rem, 4.5vh, 3rem) clamp(1.75rem, 4.5vw, 3rem);
          box-shadow: 0 20px 60px rgba(15,23,42,0.08);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease, transform 0.65s ease;
          position: relative;
        }
        .profile-card::-webkit-scrollbar { display: none; }
        .profile-card.visible { opacity: 1; transform: translateY(0); }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #00E5A0, #38B6FF, transparent);
          border-radius: 1rem;
        }

        /* Top nav */
        .profile-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: clamp(1.2rem, 3vh, 2rem);
        }

        .back-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(15,23,42,0.05);
          border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px;
          padding: 0.75rem 1.6rem;
          color: #1f2937;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.3); color: #4f46e5; }

        .logout-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(15,23,42,0.05);
          border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px;
          padding: 0.75rem 1.6rem;
          color: #1f2937;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #dc2626; }

        /* Avatar */
        .profile-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: clamp(1.2rem, 3vh, 1.8rem);
        }

        .profile-avatar {
          width: clamp(72px, 14vw, 100px);
          height: clamp(72px, 14vw, 100px);
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(0,229,160,0.15), rgba(56,182,255,0.15));
          border: 2px solid rgba(0,229,160,0.35);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.8rem;
          box-shadow: 0 0 24px rgba(0,229,160,0.15);
        }

        .profile-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          background: linear-gradient(90deg, #00E5A0, #38B6FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.02em;
          margin-bottom: 0.2rem;
        }

        .profile-email {
          font-size: 0.95rem;
          color: rgba(15,23,42,0.75);
          display: flex; align-items: center; gap: 0.35rem;
        }

        /* Divider */
        .profile-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,160,0.18), transparent);
          margin-bottom: clamp(1rem, 2.5vh, 1.5rem);
        }

        /* Stats row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: clamp(1rem, 2.5vh, 1.5rem);
        }

        .stat-card {
          background: rgba(15,23,42,0.04);
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1rem;
          padding: clamp(0.7rem, 1.5vh, 1rem) 0.5rem;
          text-align: center;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .stat-card:hover {
          border-color: var(--stat-color-alpha);
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
        }

        .stat-icon {
          margin-bottom: 0.35rem;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 2.7vw, 1.9rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.2rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(15,23,42,0.65);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Info rows */
        .info-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(0,229,160,0.7);
          margin-bottom: 0.7rem;
        }

        .weakness-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .weakness-tag {
          background: rgba(56,182,255,0.1);
          border: 1px solid rgba(56,182,255,0.25);
          border-radius: 100px;
          padding: 0.4rem 1rem;
          font-size: 0.9rem;
          color: #38B6FF;
          font-weight: 500;
        }

        .no-weakness {
          font-size: 0.95rem;
          color: rgba(0,229,160,0.6);
          display: flex; align-items: center; gap: 0.4rem;
        }
      `}</style>

      <div className="profile-root">
        <div className={`profile-card ${mounted ? "visible" : ""}`}>

          {/* Nav */}
          <div className="profile-nav">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              <FaArrowLeft size={11} /> Dashboard
            </button>
            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt size={11} /> Sign out
            </button>
          </div>

          {/* Avatar + Name */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <FaUser size={28} style={{ color: "#00E5A0", opacity: 0.85 }} />
            </div>
            <div className="profile-name">{user?.username}</div>
            <div className="profile-email">
              <FaEnvelope size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
              {user?.email}
            </div>
          </div>

          <div className="profile-divider" />

          {/* Stats */}
          <div className="stats-row">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{ "--stat-glow": s.glow, "--stat-color-alpha": s.color + "44" }}
                >
                  <div className="stat-icon">
                    <Icon size={18} style={{ color: s.color, filter: `drop-shadow(0 0 6px ${s.glow})` }} />
                  </div>
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>

          <div className="profile-divider" />

          {/* Weaknesses */}
          <div className="info-section-title">🧠 Weakness Areas</div>
          <div className="weakness-wrap">
            {weaknesses.length === 0 ? (
              <div className="no-weakness">✅ No weaknesses detected — great work!</div>
            ) : (
              weaknesses.map((w, i) => (
                <span key={i} className="weakness-tag">{w}</span>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}