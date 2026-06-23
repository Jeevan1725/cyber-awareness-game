import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { streakQuestions } from "../data/streakQuestions.js";
import { FaFire, FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Streak() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }

    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("streakDate");
    const savedQuestions = JSON.parse(localStorage.getItem("streakQuestions") || "[]");
    let used = JSON.parse(localStorage.getItem("usedStreakQuestions") || "[]");

    if (storedDate !== today || savedQuestions.length !== 5) {
      if (used.length >= streakQuestions.length) { used = []; localStorage.removeItem("usedStreakQuestions"); }
      const available = streakQuestions.filter(q => !used.includes(q.id));
      const selected = available.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(selected);
      localStorage.setItem("streakQuestions", JSON.stringify(selected));
      localStorage.setItem("streakDate", today);
      localStorage.setItem("usedStreakQuestions", JSON.stringify([...used, ...selected.map(q => q.id)]));
    } else {
      setQuestions(savedQuestions);
    }
    setTimeout(() => setMounted(true), 60);
  }, []);

  const handleAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const nextQuestion = async () => {
    console.log("nextQuestion called, currentQuestionIndex:", currentQuestionIndex, "questions.length:", questions.length);
    
    // Check authentication
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    console.log("Auth check - token exists:", !!token, "user exists:", !!userString);
    
    if (!token || !userString) {
      console.error("User not authenticated!");
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => { setCurrentQuestionIndex(prev => prev + 1); setAnimating(false); }, 250);
    } else {
      console.log("Quiz completed, checking answers...");
      const correctCount = questions.filter(q => q.options[selectedAnswers[q.id]] === q.answer).length;
      console.log("Correct answers:", correctCount, "out of", questions.length);
      setCorrectAnswers(correctCount);
      setCompleted(true);

      if (correctCount === 5) {
        try {
          const token = localStorage.getItem("token");
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          console.log("Token exists:", !!token);
          console.log("User object exists:", !!user);
          console.log("User object keys:", Object.keys(user));
          console.log("User object from localStorage:", user);
          
          if (!user || !user._id) {
            console.error("User not logged in or user object malformed");
            setStreak(0);
            return;
          }
          
          console.log("User ID:", user._id);
          let userId = user._id || user.id;
          if (userId && typeof userId === 'object' && userId.$oid) {
            userId = userId.$oid;
          }
          console.log("Using userId:", userId, typeof userId);
          console.log("Attempting to increment streak for user:", userId);
          const response = await fetch(`${window.API_BASE_URL}/api/streak/increment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId, date: new Date().toDateString() })
          });

          console.log("Streak API response status:", response.status);
          if (response.ok) {
            const data = await response.json();
            console.log("Streak API response data:", data);
            setStreak(data.streak);
          } else {
            const errorText = await response.text();
            console.error("Failed to update streak:", response.status, errorText);
            setStreak(0); // Fallback
          }
        } catch (error) {
          console.error("Error updating streak:", error);
          setStreak(0); // Fallback
        }
      } else {
        setStreak(0); // No streak increment for incomplete quizzes
      }
    }
  };

  const ABCD = ["A", "B", "C", "D"];

  if (questions.length === 0) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06060f", color: "rgba(255,255,255,0.4)", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(255,107,53,0.3)", borderTopColor: "#FF6B35", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        Loading questions...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  // ── Completed screen ──
  if (completed) {
    const perfect = streak === 5;
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body, #root { height: 100%; overflow: hidden; }
          @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        `}</style>
        <div style={{ height: "100vh", width: "100vw", background: "linear-gradient(160deg, #0a0a14 0%, #06060f 60%, #000 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif" }}>
          <div style={{ textAlign: "center", animation: "popIn 0.5s ease forwards" }}>
            <div style={{ fontSize: "clamp(3rem,10vw,5rem)", marginBottom: "1rem", animation: "float 2s ease-in-out infinite" }}>
              {perfect ? "🔥" : streak >= 3 ? "⚡" : "💪"}
            </div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, background: perfect ? "linear-gradient(90deg,#FF6B35,#FFD700)" : "linear-gradient(90deg,#38B6FF,#00E5A0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.6rem" }}>
              {perfect ? "Perfect Streak!" : "Streak Complete!"}
            </div>
            <div style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem" }}>
              You got <span style={{ color: perfect ? "#FFD700" : "#00E5A0", fontWeight: 700 }}>{correctAnswers} out of 5</span> correct
              {streak > 0 && <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                Current streak: <span style={{ color: "#FFD700", fontWeight: 700 }}>{streak}</span> days
              </div>}
            </div>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem" }}>
              {questions.map((q, i) => {
                const correct = q.options[selectedAnswers[q.id]] === q.answer;
                return correct
                  ? <FaCheckCircle key={i} size={28} style={{ color: "#00E5A0" }} />
                  : <FaTimesCircle key={i} size={28} style={{ color: "#FF4D6D" }} />;
              })}
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ padding: "0.75rem 2rem", background: "linear-gradient(135deg, #FF6B35, #ff9f43)", border: "none", borderRadius: "100px", color: "#fff", fontFamily: "Outfit, sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", boxShadow: "0 4px 20px rgba(255,107,53,0.4)" }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .streak-root {
          height: 100vh; width: 100vw; overflow: hidden;
          background: #ffffff;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; color: #1f2937;
          padding: clamp(1rem, 3vw, 2rem);
        }

        .streak-card {
          width: min(720px, 96vw);
          height: calc(100vh - clamp(2rem, 6vh, 4rem));
          display: flex; flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1.5rem;
          overflow: clip;
          box-shadow: 0 20px 60px rgba(15,23,42,0.08);
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          position: relative;
        }
        .streak-card.visible { opacity: 1; transform: translateY(0); }
        .streak-card::before {
          content: '';
          position: absolute; top: 0; left: 12%; right: 12%; height: 1.5px;
          background: linear-gradient(90deg, transparent, #FF6B35, #FFD700, transparent);
          border-radius: 1rem;
        }

        /* Top bar */
        .streak-topbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(0.9rem,2vh,1.4rem) clamp(1.2rem,3vw,2rem) 0;
          flex-shrink: 0;
        }

        .back-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(15,23,42,0.05);
          border: 1px solid rgba(15,23,42,0.12); border-radius: 100px;
          padding: 0.75rem 1.6rem;
          color: #1f2937;
          font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .back-btn:hover { background: rgba(59,130,246,0.12); border-color: rgba(59,130,246,0.3); color: #2563eb; }

        .streak-badge {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'Syne', sans-serif; font-size: clamp(1.1rem,1.9vw,1.4rem); font-weight: 800;
          color: #2563eb;
        }

        /* Progress bar */
        .progress-wrap {
          padding: clamp(0.8rem,1.8vh,1.2rem) clamp(1.2rem,3vw,2rem) 0;
          flex-shrink: 0;
        }
        .progress-info {
          display: flex; justify-content: space-between;
          font-size: 0.85rem; color: rgba(15,23,42,0.55);
          margin-bottom: 0.4rem; letter-spacing: 0.05em;
        }
        .progress-track {
          height: 6px; background: rgba(15,23,42,0.08); border-radius: 10px; overflow: hidden;
        }
        .progress-fill {
          height: 100%; border-radius: 10px;
          background: linear-gradient(90deg, #FF6B35, #FFD700);
          transition: width 0.4s ease;
          box-shadow: 0 0 10px rgba(255,107,53,0.5);
        }

        /* Question area */
        .question-area {
          flex: 1; min-height: 0;
          padding: clamp(1rem,2.5vh,1.8rem) clamp(1.2rem,3vw,2rem);
          display: flex; flex-direction: column;
          opacity: 1; transition: opacity 0.25s ease;
        }
        .question-area.fade { opacity: 0; }

        .question-num {
          font-size: 0.9rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(37,99,235,0.75);
          margin-bottom: 0.7rem;
        }

        .question-text {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.2rem,2.4vw,1.5rem); font-weight: 700;
          color: #1f2937; line-height: 1.5;
          margin-bottom: clamp(1.2rem,2.8vh,1.8rem);
          flex-shrink: 0;
        }

        /* Options */
        .options-grid {
          display: flex; flex-direction: column;
          gap: clamp(0.5rem,1.2vh,0.8rem);
          flex: 1; min-height: 0;
        }

        .option-btn {
          display: flex; align-items: center; gap: 1rem;
          width: 100%;
          padding: clamp(0.9rem,1.7vh,1.2rem) clamp(1.1rem,2.2vw,1.4rem);
          background: #f8fafc;
          border: 1px solid rgba(15,23,42,0.12);
          border-radius: 0.95rem; cursor: pointer; text-align: left;
          transition: all 0.2s ease; color: #1f2937;
          font-family: 'Outfit', sans-serif; font-size: clamp(1rem,1.5vw,1.1rem);
        }
        .option-btn:hover:not(.selected) {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.3);
        }
        .option-btn.selected {
          background: rgba(59,130,246,0.12);
          border-color: rgba(59,130,246,0.6);
          box-shadow: 0 0 16px rgba(59,130,246,0.15);
        }

        .option-letter {
          width: clamp(1.8rem,3.2vw,2.2rem); height: clamp(1.8rem,3.2vw,2.2rem);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 800;
          flex-shrink: 0;
          background: #e2e8f0; border: 1px solid rgba(15,23,42,0.1);
          color: #1f2937;
          transition: all 0.2s;
        }
        .option-btn.selected .option-letter {
          background: #2563eb; border-color: #2563eb; color: #fff;
        }

        /* Footer */
        .streak-footer {
          padding: 0 clamp(1.2rem,3vw,2rem) clamp(0.9rem,2vh,1.4rem);
          flex-shrink: 0;
        }

        .next-btn {
          width: 100%;
          padding: clamp(0.9rem,1.6vh,1.1rem);
          border: none; border-radius: 0.95rem;
          font-family: 'Outfit', sans-serif; font-size: clamp(1.05rem,1.6vw,1.1rem);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s ease;
        }
        .next-btn.enabled {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
          box-shadow: 0 4px 20px rgba(59,130,246,0.35);
        }
        .next-btn.enabled:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(59,130,246,0.45); }
        .next-btn.disabled {
          background: #f1f5f9;
          color: rgba(15,23,42,0.35);
          cursor: not-allowed;
          border: 1px solid rgba(15,23,42,0.08);
        }

        /* Dot indicators */
        .dot-row {
          display: flex; justify-content: center; gap: 0.5rem;
          padding: 0 0 clamp(0.5rem,1.2vh,0.9rem);
          flex-shrink: 0;
        }
        .dot {
          width: 10px; height: 10px; border-radius: 50%;
          transition: all 0.3s ease;
        }
        .dot.done { background: #2563eb; box-shadow: 0 0 6px rgba(59,130,246,0.35); }
        .dot.active { background: #7c3aed; width: 20px; border-radius: 4px; box-shadow: 0 0 8px rgba(124,58,237,0.35); }
        .dot.pending { background: rgba(15,23,42,0.08); }
      `}</style>

      <div className="streak-root">
        <div className={`streak-card ${mounted ? "visible" : ""}`}>

          {/* Top bar */}
          <div className="streak-topbar">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              <FaArrowLeft size={11} /> Dashboard
            </button>
            <div className="streak-badge">
              <FaFire size={16} /> Daily Streak
            </div>
            <div style={{ width: 110 }} />
          </div>

          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-info">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Dot indicators */}
          <div className="dot-row">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`dot ${i < currentQuestionIndex ? "done" : i === currentQuestionIndex ? "active" : "pending"}`}
              />
            ))}
          </div>

          {/* Question */}
          <div className={`question-area ${animating ? "fade" : ""}`}>
            <div className="question-num">Question {currentQuestionIndex + 1}</div>
            <div className="question-text">{currentQuestion.question}</div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswers[currentQuestion.id] === index ? "selected" : ""}`}
                  onClick={() => handleAnswer(currentQuestion.id, index)}
                >
                  <div className="option-letter">{ABCD[index]}</div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="streak-footer">
            <button
              className={`next-btn ${selectedAnswers[currentQuestion.id] !== undefined ? "enabled" : "disabled"}`}
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question →" : "Finish & Submit"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}