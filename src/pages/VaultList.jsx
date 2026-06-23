import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VaultLayout from "./VaultLayout";
import { FaGlobe, FaEye, FaTrash } from "react-icons/fa";

export default function VaultList() {
  const [sites, setSites] = useState([]);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const deleteMode = new URLSearchParams(location.search).get("delete");

  useEffect(() => {
    fetch(`${window.API_BASE_URL}/api/vault/list`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => { setSites(data); setTimeout(() => setMounted(true), 60); });
  }, []);

  return (
    <VaultLayout title={deleteMode ? "Delete Password" : "View Passwords"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .vault-list-root { font-family: 'Inter', sans-serif; }
        .vault-list-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: clamp(0.8rem,2vh,1.2rem); flex-shrink: 0;
        }
        .vault-list-count {
          font-family: 'Inter', sans-serif; font-size: 1rem; color: rgba(15,23,42,0.7);
          background: rgba(15,23,42,0.04); border: 1px solid rgba(15,23,42,0.08);
          border-radius: 100px; padding: 0.35rem 0.95rem;
        }
        .vault-list-scroll {
          flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .vault-list-scroll::-webkit-scrollbar { display: none; }

        .vault-site-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem 1.25rem;
          background: #ffffff; border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1rem; gap: 1rem;
          opacity: 0; animation: rowFade 0.35s ease forwards;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vault-site-row:hover { border-color: rgba(79,70,229,0.2); box-shadow: 0 10px 28px rgba(15,23,42,0.06); }
        @keyframes rowFade { to { opacity: 1; } }

        .vault-site-icon {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          background: rgba(79,70,229,0.08); border: 1px solid rgba(79,70,229,0.16);
          display: flex; align-items: center; justify-content: center;
        }
        .vault-site-name {
          font-family: 'Inter', sans-serif; font-size: 1.2rem; font-weight: 700; color: #0f172a;
          flex: 1; word-break: break-word;
        }
        .vault-row-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.05rem; border: none; border-radius: 0.75rem;
          font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .vault-row-btn.view { background: rgba(56,182,255,0.12); color: #38B6FF; border: 1px solid rgba(56,182,255,0.25); }
        .vault-row-btn.view:hover { background: rgba(56,182,255,0.22); border-color: rgba(56,182,255,0.5); }
        .vault-row-btn.del { background: rgba(255,77,109,0.08); color: #FF4D6D; border: 1px solid rgba(255,77,109,0.14); }
        .vault-row-btn.del:hover { background: rgba(255,77,109,0.12); border-color: rgba(255,77,109,0.28); }

        .vault-empty {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 0.75rem; text-align: center;
          color: rgba(15,23,42,0.55); font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
        }
        .vault-empty-icon { font-size: 3rem; }
      `}</style>

      <div className="vault-list-root">
      <div className="vault-list-header">
        <div className="vault-section-title">
          {deleteMode ? <><FaTrash size={14} style={{ color: "#FF4D6D" }} /> Select to Delete</> : <><FaEye size={14} style={{ color: "#38B6FF" }} /> Stored Credentials</>}
        </div>
        <div className="vault-list-count">{sites.length} saved</div>
      </div>
      </div>

      <div className="vault-list-scroll">
        {sites.length === 0 ? (
          <div className="vault-empty">
            <div className="vault-empty-icon">🔐</div>
            <div>No credentials saved yet</div>
          </div>
        ) : (
          sites.map((s, i) => (
            <div key={s._id} className="vault-site-row" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="vault-site-icon">
                <FaGlobe size={16} style={{ color: "#4f46e5" }} />
              </div>
              <div className="vault-site-name">{s.site}</div>
              {deleteMode ? (
                <button className="vault-row-btn del" onClick={() => navigate(`/vault/delete/${s._id}`)}>
                  <FaTrash size={11} /> Delete
                </button>
              ) : (
                <button className="vault-row-btn view" onClick={() => navigate(`/vault/view/${s._id}`)}>
                  <FaEye size={11} /> View
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </VaultLayout>
  );
}