import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VaultLayout from "./VaultLayout";
import { FaEye, FaPlus, FaTrash, FaShieldAlt } from "react-icons/fa";

export default function VaultHome() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }
    setTimeout(() => setMounted(true), 60);
  }, [navigate]);

  const actions = [
    { icon: FaEye,    label: "View Passwords",   desc: "Browse your stored credentials",  route: "/vault/list",             color: "#38B6FF", glow: "rgba(56,182,255,0.25)" },
    { icon: FaPlus,   label: "Add Password",      desc: "Save a new site credential",      route: "/vault/add",              color: "#00E5A0", glow: "rgba(0,229,160,0.25)"  },
    { icon: FaTrash,  label: "Delete Password",   desc: "Remove a stored credential",      route: "/vault/list?delete=true", color: "#FF4D6D", glow: "rgba(255,77,109,0.25)" },
  ];

  return (
    <VaultLayout title="Password Vault" backTo="/dashboard">
      <style>{`
        .vault-home-hero {
          text-align: center; margin-bottom: clamp(1.2rem,3vh,2rem); flex-shrink: 0;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .vault-home-hero.visible { opacity: 1; transform: translateY(0); }
        .vault-home-icon {
          width: 76px; height: 76px; border-radius: 50%;
          background: rgba(79,70,229,0.12); border: 2px solid rgba(79,70,229,0.22);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 0.9rem;
          box-shadow: 0 12px 30px rgba(79,70,229,0.06);
        }
        .vault-home-title {
          font-family: 'Syne', sans-serif; font-size: clamp(1.6rem,3.2vw,2.2rem);
          font-weight: 800; color: #0f172a; margin-bottom: 0.35rem;
        }
        .vault-home-sub { font-size: 1.12rem; color: rgba(15,23,42,0.72); }

        .vault-actions {
          display: flex; flex-direction: column; gap: 0.75rem; flex: 1; min-height: 0;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }
        .vault-actions.visible { opacity: 1; transform: translateY(0); }

        .vault-action-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.2rem;
          background: #ffffff; border: 1px solid rgba(15,23,42,0.06);
          border-radius: 1rem; cursor: pointer;
          transition: all 0.22s ease;
        }
        .vault-action-card:hover { transform: translateX(6px); box-shadow: 0 8px 24px rgba(15,23,42,0.04); }

        .vault-action-icon {
          width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.22s ease;
        }
        .vault-action-card:hover .vault-action-icon { transform: scale(1.1); }

        .vault-action-label {
          font-family: 'Syne', sans-serif; font-size: 1.12rem; font-weight: 700; color: #0f172a;
        }
        .vault-action-desc { font-size: 1rem; color: rgba(15,23,42,0.66); margin-top: 0.14rem; }
        .vault-action-arrow { margin-left: auto; color: rgba(15,23,42,0.38); font-size: 1.1rem; transition: all 0.22s ease; }
        .vault-action-card:hover .vault-action-arrow { color: rgba(15,23,42,0.7); transform: translateX(3px); }
      `}</style>

      <div className={`vault-home-hero ${mounted ? "visible" : ""}`}>
        <div className="vault-home-icon">
          <FaShieldAlt size={28} style={{ color: "#4f46e5" }} />
        </div>
        <div className="vault-home-title">Secure Vault</div>
        <div className="vault-home-sub">Your credentials are encrypted and protected</div>
      </div>

      <div className="vault-divider" />

      <div className={`vault-actions ${mounted ? "visible" : ""}`}>
        {actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="vault-action-card"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
              onClick={() => navigate(a.route)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}44`; e.currentTarget.style.boxShadow = `0 4px 20px ${a.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = ""; }}
            >
              <div className="vault-action-icon" style={{ background: `${a.color}18`, boxShadow: `0 0 0 1px ${a.color}30` }}>
                <Icon size={18} style={{ color: a.color }} />
              </div>
              <div>
                <div className="vault-action-label">{a.label}</div>
                <div className="vault-action-desc">{a.desc}</div>
              </div>
              <div className="vault-action-arrow">›</div>
            </div>
          );
        })}
      </div>
    </VaultLayout>
  );
}