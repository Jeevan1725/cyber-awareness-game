import { useEffect, useState } from "react";
import axios from "axios";
import { FaShieldAlt, FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SecurityQuestion({ userId, onSuccess }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${window.API_BASE_URL}/api/question/generate/${userId}`)
      .then(res => {
        setQuestion(res.data.question);
        setLoading(false);
        setTimeout(() => setMounted(true), 60);
      })
      .catch(() => {
        setError("Failed to load security question.");
        setLoading(false);
      });
  }, [userId]);

  const verify = async () => {
    if (!answer.trim()) { setError("Please enter your answer."); return; }
    setError("");
    setVerifying(true);
    try {
      await axios.post(`${window.API_BASE_URL}/api/question/verify`, { userId, answer });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Wrong answer. Please try again.");
      setVerifying(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") verify(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .sq-root {
          height: 100vh; width: 100vw; overflow: hidden;
          background: #f8fafc;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; color: #0f172a;
          padding: 1rem;
        }

        .sq-card {
          width: min(560px, 96vw);
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1.5rem;
          padding: clamp(2rem,4vh,3rem) clamp(1.5rem,4vw,2.5rem);
          box-shadow: 0 18px 48px rgba(15,23,42,0.08);
          position: relative;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sq-card.visible { opacity: 1; transform: translateY(0); }

        .sq-card::before {
          content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1.5px;
          background: linear-gradient(90deg, transparent, #4f46e5, #3b82f6, transparent);
          border-radius: 1rem;
        }

        .sq-icon-wrap {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(79,70,229,0.12); border: 2px solid rgba(79,70,229,0.28);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.4rem;
          box-shadow: 0 0 26px rgba(79,70,229,0.16);
        }

        .sq-title {
          font-family: 'Syne', sans-serif; font-size: clamp(1.8rem,3.5vw,2.4rem); font-weight: 800;
          text-align: center; margin-bottom: 0.4rem;
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .sq-subtitle {
          text-align: center; font-size: 1rem; color: rgba(15,23,42,0.65);
          margin-bottom: 1.6rem; letter-spacing: 0.02em;
        }

        .sq-divider {
          height: 1px; background: linear-gradient(90deg, transparent, rgba(255,77,109,0.18), transparent);
          margin-bottom: 1.4rem;
        }

        .sq-question-label {
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #4f46e5;
          margin-bottom: 0.45rem;
        }

        .sq-question {
          font-family: 'Syne', sans-serif; font-size: clamp(1rem,2vw,1.15rem);
          font-weight: 700; color: #0f172a; margin-bottom: 1.2rem; line-height: 1.5;
          padding: 1rem 1.1rem;
          background: rgba(79,70,229,0.06); border: 1px solid rgba(79,70,229,0.16);
          border-radius: 0.85rem;
        }

        .sq-input {
          width: 100%; padding: 0.95rem 1.15rem;
          background: rgba(15,23,42,0.04); border: 1px solid rgba(79,70,229,0.18);
          border-radius: 0.85rem; color: #0f172a; font-family: 'Outfit', sans-serif;
          font-size: 1rem; outline: none; margin-bottom: 0.8rem;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .sq-input::placeholder { color: rgba(15,23,42,0.45); }
        .sq-input:focus {
          border-color: rgba(79,70,229,0.5); background: rgba(79,70,229,0.08);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }

        .sq-error {
          font-size: 0.88rem; color: #dc2626; margin-bottom: 0.9rem;
          padding: 0.6rem 0.85rem;
          background: rgba(248,113,113,0.12); border: 1px solid rgba(248,113,113,0.2);
          border-radius: 0.75rem; display: flex; align-items: center; gap: 0.4rem;
        }

        .sq-btn {
          width: 100%; padding: 0.95rem;
          background: linear-gradient(135deg, #4f46e5, #3b82f6); border: none;
          border-radius: 0.85rem; color: #fff; font-family: 'Outfit', sans-serif;
          font-size: 1.02rem; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 8px 26px rgba(79,70,229,0.16);
        }
        .sq-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(79,70,229,0.22); }
        .sq-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .sq-back {
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          margin-top: 1rem; color: rgba(255,255,255,0.3); font-size: 0.82rem;
          cursor: pointer; background: none; border: none; width: 100%;
          transition: color 0.2s; font-family: 'Outfit', sans-serif;
        }
        .sq-back:hover { color: rgba(255,255,255,0.65); }

        @keyframes spin { to { transform: rotate(360deg); } }
        .sq-spinner {
          width: 28px; height: 28px;
          border: 3px solid rgba(255,77,109,0.2); border-top-color: #FF4D6D;
          border-radius: 50%; animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
      `}</style>

      <div className="sq-root">
        <div className={`sq-card ${mounted ? "visible" : ""}`}>

          <div className="sq-icon-wrap">
            {loading ? <div className="sq-spinner" /> : <FaShieldAlt size={26} style={{ color: "#FF4D6D" }} />}
          </div>

          <div className="sq-title">Security Verification</div>
          <div className="sq-subtitle">Prove your identity to access the vault</div>

          <div className="sq-divider" />

          {loading ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
              Loading your security question...
            </div>
          ) : (
            <>
              <div className="sq-question-label">Your security question</div>
              <div className="sq-question">{question}</div>

              {error && (
                <div className="sq-error">⚠ {error}</div>
              )}

              <input
                className="sq-input"
                placeholder="Enter your answer"
                value={answer}
                onChange={e => { setAnswer(e.target.value); setError(""); }}
                onKeyDown={handleKey}
                autoFocus
              />

              <button className="sq-btn" onClick={verify} disabled={verifying}>
                {verifying ? "Verifying..." : "Verify Identity"}
              </button>

              <button className="sq-back" onClick={() => navigate("/vault")}>
                <FaArrowLeft size={10} /> Back to Vault
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}