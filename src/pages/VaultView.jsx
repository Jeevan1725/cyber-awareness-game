import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VaultLayout from "./VaultLayout";
import SecurityQuestion from "../components/SecurityQuestion";
import { FaCopy, FaEraser, FaKey, FaCheckCircle } from "react-icons/fa";

export default function VaultView() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [count, setCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (verified) {
      fetch(`${window.API_BASE_URL}/api/vault/password/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(data => setPassword(data.password));
    }
  }, [verified, id]);

  useEffect(() => {
    return () => { navigator.clipboard.writeText(""); };
  }, []);

  const showMsg = (text, type = "success") => {
    setMessage(text); setMsgType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCount(10);
      showMsg("Password copied to clipboard.");
      let timer = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) { clearInterval(timer); clearClipboardAuto(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch {
      showMsg("Clipboard copy failed.", "error");
    }
  };

  const clearClipboardAuto = async () => {
    try { await navigator.clipboard.writeText(""); showMsg("Clipboard cleared automatically."); }
    catch { showMsg("Unable to clear automatically.", "error"); }
  };

  const clearClipboardManual = async () => {
    try { await navigator.clipboard.writeText(""); showMsg("Clipboard cleared."); setCount(0); }
    catch { showMsg("Manual clear failed.", "error"); }
  };

  if (!verified) {
    return <SecurityQuestion userId={user._id} onSuccess={() => setVerified(true)} />;
  }

  return (
    <VaultLayout title="View Password">
      <style>{`
        .vault-view-info {
          background: rgba(56,182,255,0.12); border: 1px solid rgba(56,182,255,0.22);
          border-radius: 1rem; padding: 1rem 1.2rem; margin-bottom: 1.5rem;
          font-size: 0.95rem; color: rgba(15,23,42,0.8); line-height: 1.8;
        }
        .vault-view-info strong { color: #1d4ed8; }
        .vault-view-info ::selection {
          background: rgba(56,182,255,0.4);
          color: #0f172a;
        }
        .vault-timer {
          display: flex; align-items: center; gap: 0.6rem;
          background: rgba(255,215,0,0.08); border: 1px solid rgba(255,215,0,0.2);
          border-radius: 0.75rem; padding: 0.7rem 1rem;
          font-size: 0.88rem; color: #FFD700; font-weight: 600;
          margin-top: 1rem;
        }
        .timer-bar {
          flex: 1; height: 4px; background: rgba(255,215,0,0.15); border-radius: 2px; overflow: hidden;
        }
        .timer-fill {
          height: 100%; background: #FFD700; border-radius: 2px;
          transition: width 1s linear;
        }
        .vault-msg {
          margin-top: 0.8rem; padding: 0.6rem 1rem;
          border-radius: 0.65rem; font-size: 0.85rem; font-weight: 500;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .vault-msg.success { background: rgba(0,229,160,0.1); border: 1px solid rgba(0,229,160,0.25); color: #00E5A0; }
        .vault-msg.error { background: rgba(255,77,109,0.1); border: 1px solid rgba(255,77,109,0.25); color: #FF4D6D; }
        .vault-action-btns { display: flex; gap: 0.75rem; margin-top: auto; }
      `}</style>

      <div className="vault-section-title">
        <FaKey size={14} style={{ color: "#38B6FF" }} /> Retrieve Password
      </div>

      <div className="vault-view-info">
        <strong>🔒 Secure retrieval</strong><br />
        Your password will <strong>not be displayed</strong> on screen. Use the copy button to access it. The clipboard will be automatically cleared after 10 seconds.
      </div>

      {count > 0 && (
        <div className="vault-timer">
          <span>⏱ Clipboard clears in {count}s</span>
          <div className="timer-bar">
            <div className="timer-fill" style={{ width: `${(count / 10) * 100}%` }} />
          </div>
        </div>
      )}

      {message && (
        <div className={`vault-msg ${msgType}`}>
          <FaCheckCircle size={13} />
          {message}
        </div>
      )}

      <div className="vault-action-btns">
        <button className="vault-btn primary" onClick={copyPassword} style={{ flex: 1 }}>
          <FaCopy size={13} style={{ marginRight: 6 }} /> Copy Password
        </button>
        <button className="vault-btn ghost" onClick={clearClipboardManual}>
          <FaEraser size={13} style={{ marginRight: 6 }} /> Clear Clipboard
        </button>
      </div>
    </VaultLayout>
  );
}