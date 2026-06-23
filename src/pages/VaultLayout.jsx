import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";

export default function VaultLayout({ children, title = "Password Vault", showBack = true, backTo = "/vault" }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) navigate("/login");
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .vault-root {
          min-height: 100vh; width: 100vw; overflow-x: hidden;
          background: #f8fafc;
          display: flex; flex-direction: column; align-items: center;
          font-family: 'Outfit', sans-serif; color: #0f172a;
          font-size: 17px;
          padding: clamp(0.9rem,2.2vh,1.8rem) clamp(1.2rem,3.2vw,2.4rem);
        }

        .vault-topbar {
          width: 100%; max-width: 900px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: clamp(0.8rem,2vh,1.4rem); flex-shrink: 0;
        }

        .vault-logo {
          font-family: 'Syne', sans-serif; font-size: clamp(1.9rem,2.5vw,2.7rem);
          font-weight: 800; background: linear-gradient(90deg, #4f46e5, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: flex; align-items: center; gap: 0.9rem; line-height: 1;
        }

        .vault-back-btn {
          display: flex; align-items: center; gap: 0.6rem;
          background: rgba(15,23,42,0.06); border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px; padding: 0.75rem 1.6rem;
          color: #0f172a; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .vault-back-btn:hover { background: rgba(79,70,229,0.08); border-color: rgba(79,70,229,0.25); color: #4f46e5; }

        .vault-card {
          width: 100%; max-width: 900px; flex: 1; min-height: 0;
          background: #ffffff; border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1.2rem; padding: clamp(1.2rem,3vh,2rem) clamp(1.2rem,3vw,2rem);
          overflow-y: auto; overflow-x: hidden;
          box-shadow: 0 16px 32px rgba(15,23,42,0.05);
          display: flex; flex-direction: column;
          position: relative; scrollbar-width: none;
        }
        .vault-card::-webkit-scrollbar { display: none; }
        .vault-card::before {
          content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1.5px;
          background: linear-gradient(90deg, transparent, #4f46e5, #3b82f6, transparent);
          border-radius: 1rem; z-index: 1;
        }

        .vault-input {
          width: 100%; padding: 1rem 1.15rem;
          background: #fff; border: 1px solid rgba(15,23,42,0.08);
          border-radius: 0.85rem; color: #0f172a; font-family: 'Outfit', sans-serif;
          font-size: 1.05rem; outline: none; margin-bottom: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .vault-input::placeholder { color: rgba(15,23,42,0.35); }
        .vault-input:focus { border-color: rgba(79,70,229,0.45); background: rgba(79,70,229,0.03); box-shadow: 0 0 0 3px rgba(79,70,229,0.06); }

        .vault-btn {
          padding: 0.9rem 1.9rem; border: none; border-radius: 0.85rem;
          font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: all 0.22s ease;
        }
        .vault-btn.primary { background: linear-gradient(135deg, #4f46e5, #3b82f6); color: #fff; box-shadow: 0 4px 18px rgba(79,70,229,0.12); }
        .vault-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(79,70,229,0.15); }
        .vault-btn.secondary { background: rgba(15,23,42,0.04); color: #0f172a; border: 1px solid rgba(15,23,42,0.06); }
        .vault-btn.secondary:hover { background: rgba(15,23,42,0.06); }
        .vault-btn.danger { background: linear-gradient(135deg, #c0392b, #e74c3c); color: #fff; box-shadow: 0 4px 18px rgba(192,57,43,0.35); }
        .vault-btn.danger:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(192,57,43,0.5); }
        .vault-btn.ghost { background: rgba(255,77,109,0.08); color: #FF4D6D; border: 1px solid rgba(255,77,109,0.25); }
        .vault-btn.ghost:hover { background: rgba(255,77,109,0.16); border-color: rgba(255,77,109,0.5); }
        .vault-btn.green { background: linear-gradient(135deg, #00E5A0, #00c988); color: #021a11; box-shadow: 0 4px 18px rgba(0,229,160,0.3); }
        .vault-btn.green:hover { transform: translateY(-2px); }

        .vault-section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(1.3rem,2.4vw,1.6rem); font-weight: 800;
          color: #0f172a; margin-bottom: clamp(0.9rem,2.2vh,1.6rem); flex-shrink: 0;
          display: flex; align-items: center; gap: 0.6rem; line-height: 1.4;
          padding-bottom: 0.2rem;
        }

        .vault-divider {
          height: 1px; background: linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent);
          margin: 0.8rem 0;
        }
      `}</style>

      <div className="vault-root">
        <div className="vault-topbar">
          <button className="vault-back-btn" onClick={() => navigate(backTo)}>
            <FaArrowLeft size={11} /> {backTo === "/dashboard" ? "Dashboard" : "Vault"}
          </button>
          <div className="vault-logo">
            <FaLock size={16} /> {title}
          </div>
          <div style={{ width: 100 }} />
        </div>

        <div className="vault-card">
          {children}
        </div>
      </div>
    </>
  );
}