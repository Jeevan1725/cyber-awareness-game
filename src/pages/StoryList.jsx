import { stories } from "../data/stories";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlay, FaArrowLeft, FaBookOpen, FaSignOutAlt } from "react-icons/fa";

export default function StoryList() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }
    setTimeout(() => setMounted(true), 60);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scrollbar-width: none; }
        html::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; }

        .story-root {
          min-height: 100vh; width: 100vw; overflow-x: hidden;
          background: #ffffff;
          display: flex; flex-direction: column; align-items: center;
          font-family: 'Outfit', sans-serif; color: #1f2937;
          padding: clamp(1.2rem, 3vh, 2rem) clamp(1.2rem, 3.5vw, 3rem) 7rem;
        }

        /* Top bar */
        .story-topbar {
          width: 100%; max-width: 1000px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: clamp(1.4rem, 3vh, 2.2rem);
          opacity: 0; transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .story-topbar.visible { opacity: 1; transform: translateY(0); }

        .back-btn {
          display: flex; align-items: center; gap: 0.6rem;
          background: rgba(15,23,42,0.05); border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px; padding: 0.85rem 1.5rem;
          color: #1f2937; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .back-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.3); color: #4f46e5; }

        .story-page-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 3.5vw, 2.4rem); font-weight: 800;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: flex; align-items: center; gap: 0.75rem;
        }

        .logout-btn {
          display: flex; align-items: center; gap: 0.6rem;
          background: rgba(15,23,42,0.05); border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px; padding: 0.85rem 1.5rem;
          color: #1f2937; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #dc2626; }

        /* Subtitle */
        .story-subtitle {
          width: 100%; max-width: 1000px;
          font-size: clamp(1.05rem, 1.2vw, 1.3rem); color: rgba(15,23,42,0.75);
          margin-bottom: clamp(1.4rem, 3.5vh, 2.4rem);
          letter-spacing: 0.02em;
          line-height: 1.9;
          opacity: 0; transition: opacity 0.5s ease 0.1s;
        }
        .story-subtitle.visible { opacity: 1; }

        /* Grid */
        .story-grid {
          width: 100%; max-width: 1000px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.2rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }
        .story-grid.visible { opacity: 1; transform: translateY(0); }

        /* Story card */
        .story-card {
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.1);
          border-radius: 1.2rem;
          padding: 1.8rem 1.6rem 1.4rem;
          display: flex; flex-direction: column; gap: 1rem;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          position: relative; overflow: hidden;
          opacity: 0; animation: cardIn 0.4s ease forwards;
          box-shadow: 0 16px 36px rgba(15,23,42,0.08);
        }
        @keyframes cardIn { to { opacity: 1; } }

        .story-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #BF5FFF, #38B6FF);
          opacity: 0; transition: opacity 0.25s ease;
        }
        .story-card:hover {
          transform: translateY(-5px);
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 12px 28px rgba(15,23,42,0.12);
        }
        .story-card:hover::before { opacity: 1; }

        /* Story number badge */
        .story-num {
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(79,70,229,0.12); border: 1px solid rgba(79,70,229,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 800;
          color: #4f46e5;
        }

        .story-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 700; color: #1f2937;
          line-height: 1.35; flex: 1;
        }

        .start-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          width: 100%; padding: 0.95rem;
          background: linear-gradient(135deg, rgba(79,70,229,0.16), rgba(59,130,246,0.16));
          border: 1px solid rgba(79,70,229,0.25);
          border-radius: 0.9rem;
          color: #4f46e5; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer;
          transition: all 0.22s ease; letter-spacing: 0.04em;
        }
        .start-btn:hover {
          background: linear-gradient(135deg, rgba(79,70,229,0.28), rgba(59,130,246,0.28));
          border-color: rgba(79,70,229,0.45);
          color: #1f2937;
          box-shadow: 0 4px 18px rgba(79,70,229,0.16);
        }

        /* Fixed bottom dashboard button */
        .bottom-bar {
          position: fixed; bottom: 0; left: 0; right: 0;
          display: flex; justify-content: center;
          padding: 1.25rem 1rem;
          background: rgba(255,255,255,0.95);
          border-top: 1px solid rgba(15,23,42,0.08);
          z-index: 50;
        }

        .dashboard-btn {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 1rem 2.75rem;
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          border: none; border-radius: 100px;
          color: #fff; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(79,70,229,0.3);
          transition: all 0.22s ease;
        }
        .dashboard-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(191,95,255,0.55);
        }
      `}</style>

      <div className="story-root">

        {/* Top bar */}
        <div className={`story-topbar ${mounted ? "visible" : ""}`}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft size={11} /> Dashboard
          </button>
          <div className="story-page-title">
            <FaBookOpen size={16} /> Story Mode
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={11} /> Sign out
          </button>
        </div>

        {/* Subtitle */}
        <div className={`story-subtitle ${mounted ? "visible" : ""}`}>
          Learn cybersecurity through interactive stories. Each story puts you in real-world scenarios to sharpen your awareness.
        </div>

        {/* Stories grid */}
        <div className={`story-grid ${mounted ? "visible" : ""}`}>
          {stories.map((story, i) => (
            <div
              key={story.id}
              className="story-card"
              style={{ animationDelay: `${i * 50 + 200}ms` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <div className="story-num">{i + 1}</div>
                <div className="story-title">{story.title?.en}</div>
              </div>
              <button
                className="start-btn"
                onClick={() => navigate(`/story/${story.id}`)}
              >
                <FaPlay size={11} /> Start Story
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Fixed bottom bar */}
      <div className="bottom-bar">
        <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft size={12} /> Back to Dashboard
        </button>
      </div>
    </>
  );
}