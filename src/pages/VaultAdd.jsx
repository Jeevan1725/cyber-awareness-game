import { useState } from "react";
import VaultLayout from "./VaultLayout";
import SecurityQuestion from "../components/SecurityQuestion";
import { FaPlus, FaGlobe, FaKey } from "react-icons/fa";

export default function VaultAdd() {
  const [verified, setVerified] = useState(false);
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!verified) {
    return <SecurityQuestion userId={user._id} onSuccess={() => setVerified(true)} />;
  }

  const save = async () => {
    if (!site.trim() || !password.trim()) return;
    setSaving(true);
    await fetch(`${window.API_BASE_URL}/api/vault/add`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ site, password })
    });
    window.location = "/vault";
  };

  return (
    <VaultLayout title="Add Credential">
      <style>{`
        .vault-add-form {
          display: flex; flex-direction: column; flex: 1; min-height: 0;
        }
        .vault-input-label {
          font-size: 0.88rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #2563eb;
          margin-bottom: 0.55rem; display: flex; align-items: center; gap: 0.5rem;
        }
        .vault-input-group { margin-bottom: 1.3rem; }
      `}</style>

      <div className="vault-section-title">
        <FaPlus size={14} style={{ color: "#00E5A0" }} /> Add New Credential
      </div>

      <div className="vault-add-form">
        <div className="vault-input-group">
          <div className="vault-input-label"><FaGlobe size={10} /> Site / App Name</div>
          <input
            className="vault-input"
            placeholder="e.g. google.com"
            value={site}
            onChange={e => setSite(e.target.value)}
          />
        </div>

        <div className="vault-input-group">
          <div className="vault-input-label"><FaKey size={10} /> Password</div>
          <input
            className="vault-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem" }}>
          <button
            className="vault-btn primary"
            onClick={save}
            disabled={saving || !site.trim() || !password.trim()}
            style={{ opacity: (!site.trim() || !password.trim()) ? 0.5 : 1, flex: 1 }}
          >
            {saving ? "Saving..." : "Save Credential"}
          </button>
          <button className="vault-btn secondary" onClick={() => window.location = "/vault"}>
            Cancel
          </button>
        </div>
      </div>
    </VaultLayout>
  );
}