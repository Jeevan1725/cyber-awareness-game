import { useParams } from "react-router-dom";
import { useState } from "react";
import VaultLayout from "./VaultLayout";
import SecurityQuestion from "../components/SecurityQuestion";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

export default function VaultDelete() {
  const { id } = useParams();
  const [verified, setVerified] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const remove = async () => {
    setDeleting(true);
    await fetch(`${window.API_BASE_URL}/api/vault/delete/${id}`, { 
      method: "DELETE",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    window.location = "/vault";
  };

  if (!verified) {
    return <SecurityQuestion userId={user._id} onSuccess={() => setVerified(true)} />;
  }

  return (
    <VaultLayout title="Delete Credential">
      <style>{`
        .vault-delete-warning {
          display: flex; align-items: flex-start; gap: 0.9rem;
          background: rgba(255,77,109,0.08); border: 1px solid rgba(255,77,109,0.2);
          border-radius: 1rem; padding: 1.1rem 1.2rem;
          margin-bottom: 1.5rem;
        }
        .vault-delete-warning-text { font-size: 0.9rem; color: rgba(255,255,255,0.65); line-height: 1.6; }
        .vault-delete-warning-text strong { color: #FF4D6D; }
      `}</style>

      <div className="vault-section-title">
        <FaTrash size={14} style={{ color: "#FF4D6D" }} /> Confirm Deletion
      </div>

      <div className="vault-delete-warning">
        <FaExclamationTriangle size={18} style={{ color: "#FF4D6D", flexShrink: 0, marginTop: 2 }} />
        <div className="vault-delete-warning-text">
          <strong>This action cannot be undone.</strong><br />
          Are you sure you want to permanently delete this password from your vault?
        </div>
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem" }}>
        <button
          className="vault-btn danger"
          onClick={remove}
          disabled={deleting}
          style={{ flex: 1 }}
        >
          <FaTrash size={12} style={{ marginRight: 6 }} />
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>
        <button className="vault-btn secondary" onClick={() => window.location = "/vault"}>
          Cancel
        </button>
      </div>
    </VaultLayout>
  );
}