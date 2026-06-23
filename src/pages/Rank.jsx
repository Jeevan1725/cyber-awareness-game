import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaArrowLeft, FaMedal } from "react-icons/fa";

export default function Rank() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [mounted, setMounted] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }

    fetch(`${window.API_BASE_URL}/api/rank`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setTimeout(() => setMounted(true), 60);
      });
  }, [navigate]);

  const medals = ["🥇", "🥈", "🥉"];
  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const medalGlows = ["rgba(255,215,0,0.4)", "rgba(192,192,192,0.3)", "rgba(205,127,50,0.3)"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .rank-root {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Outfit', sans-serif;
          color: #1f2937;
          padding: clamp(0.8rem, 2vh, 1.5rem) clamp(1rem, 3vw, 2rem);
        }

        /* ── Top bar ── */
        .rank-topbar {
          width: 100%;
          max-width: 680px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: clamp(0.8rem, 2vh, 1.4rem);
          flex-shrink: 0;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .rank-topbar.visible { opacity: 1; transform: translateY(0); }

        .back-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(15,23,42,0.05);
          border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px;
          padding: 0.75rem 1.6rem;
          color: #1f2937;
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover { background: rgba(251,191,36,0.12); border-color: rgba(251,191,36,0.3); color: #b45309; }

        .rank-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex; align-items: center; gap: 0.5rem;
        }

        /* ── Top 3 podium ── */
        .podium {
          width: 100%;
          max-width: 680px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: clamp(0.5rem, 2vw, 1.2rem);
          margin-bottom: clamp(0.8rem, 2vh, 1.4rem);
          flex-shrink: 0;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }
        .podium.visible { opacity: 1; transform: translateY(0); }

        .podium-item {
          flex: 1;
          max-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .podium-medal { font-size: clamp(1.8rem, 3.5vw, 2.5rem); }

        .podium-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 700;
          color: #1f2937;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .podium-score {
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          color: rgba(15,23,42,0.65);
        }

        .podium-block {
          width: 100%;
          border-radius: 0.75rem 0.75rem 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 800;
        }

        /* ── Card ── */
        .rank-card {
          width: 100%;
          max-width: 680px;
          flex: 1;
          min-height: 0;
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1.25rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(15,23,42,0.08);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s;
        }
        .rank-card.visible { opacity: 1; transform: translateY(0); }

        .rank-card::before {
          content: '';
          position: absolute;
          display: none;
        }

        /* Table header */
        .rank-thead {
          display: grid;
          grid-template-columns: 60px 1fr 100px;
          padding: 1rem 1.2rem;
          background: rgba(15,23,42,0.04);
          border-bottom: 1px solid rgba(15,23,42,0.08);
          flex-shrink: 0;
        }

        .rank-th {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(15,23,42,0.65);
        }
        .rank-th:last-child { text-align: right; }

        /* Table body */
        .rank-tbody {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,215,0,0.2) transparent;
        }
        .rank-tbody::-webkit-scrollbar { width: 4px; }
        .rank-tbody::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.2); border-radius: 4px; }

        .rank-row {
          display: grid;
          grid-template-columns: 60px 1fr 100px;
          padding: clamp(0.75rem, 1.5vh, 1rem) 1.2rem;
          border-bottom: 1px solid rgba(15,23,42,0.08);
          align-items: center;
          transition: background 0.2s ease;
          opacity: 0;
          transform: translateX(-8px);
          animation: rowIn 0.4s ease forwards;
        }
        .rank-row:hover { background: rgba(15,23,42,0.04); }
        .rank-row.is-me { background: rgba(59,130,246,0.1); border-left: 2px solid rgba(59,130,246,0.5); }
        .rank-row:last-child { border-bottom: none; }

        @keyframes rowIn {
          to { opacity: 1; transform: translateX(0); }
        }

        .rank-pos {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 1.7vw, 1.15rem);
          font-weight: 700;
          color: rgba(15,23,42,0.7);
        }

        .rank-username {
          font-size: clamp(1rem, 1.7vw, 1.15rem);
          font-weight: 500;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rank-username.is-me { color: #2563eb; font-weight: 600; }

        .rank-score {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 1.7vw, 1.15rem);
          font-weight: 700;
          color: rgba(15,23,42,0.75);
          text-align: right;
        }
        .rank-score.is-me { color: #2563eb; }
      `}</style>

      <div className="rank-root">

        {/* Top bar */}
        <div className={`rank-topbar ${mounted ? "visible" : ""}`}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft size={11} /> Dashboard
          </button>
          <div className="rank-title">
            <FaTrophy size={18} /> Leaderboard
          </div>
          <div style={{ width: 90 }} />
        </div>

        {/* Podium — top 3 */}
        {users.length >= 3 && (
          <div className={`podium ${mounted ? "visible" : ""}`}>
            {[1, 0, 2].map((pos) => {
              const u = users[pos];
              if (!u) return null;
              const rankHeights = [110, 90, 70];
              const blockH = rankHeights[pos];
              return (
                <div key={pos} className="podium-item">
                  <div className="podium-medal">{medals[pos]}</div>
                  <div className="podium-name">{u.username}</div>
                  <div className="podium-score">{u.score} pts</div>
                  <div
                    className="podium-block"
                    style={{
                      height: blockH,
                      background: `linear-gradient(180deg, ${medalColors[pos]}22, ${medalColors[pos]}08)`,
                      border: `1px solid ${medalColors[pos]}44`,
                      boxShadow: `0 0 20px ${medalGlows[pos]}`,
                      color: medalColors[pos],
                    }}
                  >
                    {pos + 1}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        <div className={`rank-card ${mounted ? "visible" : ""}`}>
          <div className="rank-thead">
            <div className="rank-th">Rank</div>
            <div className="rank-th">Player</div>
            <div className="rank-th" style={{ textAlign: "right" }}>Score</div>
          </div>

          <div className="rank-tbody">
            {users.map((u, i) => {
              const isMe = u.username === currentUser?.username;
              return (
                <div
                  key={i}
                  className={`rank-row ${isMe ? "is-me" : ""}`}
                  style={{ animationDelay: `${i * 40 + 300}ms` }}
                >
                  <div className="rank-pos">
                    {i < 3 ? <span style={{ fontSize: "1.1rem" }}>{medals[i]}</span> : i + 1}
                  </div>
                  <div className={`rank-username ${isMe ? "is-me" : ""}`}>
                    {u.username} {isMe && <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>(you)</span>}
                  </div>
                  <div className={`rank-score ${isMe ? "is-me" : ""}`}>{u.score}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}