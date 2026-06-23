import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const postsData = [

  {
    platform: "Instagram",
    username: "arun_2005",
    post:
      "Finally got my driving license 😍",
    exposed: [
      "DOB",
      "Address",
      "License Number"
    ],
    explanation:
      "Attackers can use DOB and ID details for identity theft and account recovery attacks."
  },

  {
    platform: "WhatsApp Status",
    username: "priya_clicks",
    post:
      "Vacation for 5 days 🏖 Goa trip starts now!",
    exposed: [
      "Empty House Information"
    ],
    explanation:
      "Public travel posts can reveal that nobody is at home."
  },

  {
    platform: "LinkedIn",
    username: "rahul_dev",
    post:
      "First day at my new company 🔥",
    exposed: [
      "Employee ID",
      "Company Badge"
    ],
    explanation:
      "Visible company badges and IDs help impersonation and phishing attacks."
  },

  {
    platform: "Instagram",
    username: "anu_foodie",
    post:
      "New debit card finally arrived 💳",
    exposed: [
      "Card Number",
      "Bank Name"
    ],
    explanation:
      "Sharing financial cards online is extremely dangerous."
  },

  {
    platform: "Facebook",
    username: "vikram_yt",
    post:
      "My setup is complete 😎",
    exposed: [
      "Sticky Note Password",
      "QR Code"
    ],
    explanation:
      "Passwords and QR codes in photos can expose accounts instantly."
  }

];

export default function PrivacyDetective_1() {

  const navigate = useNavigate();

  const location = useLocation();

  const storyId =
    location.state?.storyId || 1;

  const returnScene =
    location.state?.returnScene || 5;

  function finishGame() {
    navigate(`/story/${storyId}`, {
      state: { resumeScene: returnScene }
    });
  }

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selected, setSelected] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState(null);

  const [gameOver, setGameOver] =
    useState(false);

  const currentPost =
    postsData[currentIndex];

  /* ---------------- OPTIONS ---------------- */

  const allOptions = [

    "DOB",
    "Address",
    "License Number",
    "Phone Number",
    "Employee ID",
    "Company Badge",
    "Card Number",
    "Bank Name",
    "Sticky Note Password",
    "QR Code",
    "Empty House Information"

  ];

  /* ---------------- TOGGLE ---------------- */

  function toggleOption(option) {

    if (feedback) return;

    if (selected.includes(option)) {

      setSelected(
        selected.filter(
          (item) => item !== option
        )
      );

    } else {

      setSelected([
        ...selected,
        option
      ]);

    }
  }

  /* ---------------- SUBMIT ---------------- */

  function submitAnswer() {

    const correctAnswers =
      currentPost.exposed;

    const found =
      selected.filter((item) =>
        correctAnswers.includes(item)
      );

    const missed =
      correctAnswers.filter(
        (item) => !selected.includes(item)
      );

    const extra =
      selected.filter(
        (item) =>
          !correctAnswers.includes(item)
      );

    const perfect =
      missed.length === 0 &&
      extra.length === 0;

    if (perfect) {

      setScore((prev) => prev + 20);

      setFeedback({
        type: "success",
        message:
          "✅ Excellent Investigation!\nYou identified all privacy leaks correctly.",
        missed: [],
        correct: correctAnswers
      });

    } else {

      setScore((prev) =>
        Math.max(prev - 5, 0)
      );

      setFeedback({
        type: "warning",
        message:
          `⚠ You found ${found.length} out of ${correctAnswers.length} privacy leaks.`,
        missed,
        correct: correctAnswers
      });
    }

    setTimeout(() => {

      setFeedback(null);

      setSelected([]);

      if (
        currentIndex >=
        postsData.length - 1
      ) {

        setGameOver(true);

      } else {

        setCurrentIndex((prev) =>
          prev + 1
        );
      }

    }, 5000);
  }

  /* ---------------- CONTINUE ---------------- */

  function continueStory() {

    navigate(`/story/${storyId}`, {
      state: {
        resumeScene: returnScene
      }
    });

  }

  /* ---------------- RANK ---------------- */

  function getRank() {

    if (score >= 80)
      return "🏆 Privacy Guardian";

    if (score >= 50)
      return "🛡 Data Protector";

    if (score >= 25)
      return "⚡ Aware User";

    return "🙂 Beginner";
  }

  return (
    <>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        .container{

          width:100%;

          min-height:100vh;

          padding:20px;

          background:
            radial-gradient(circle at top,#071226 0%,#020617 60%,#000 100%);

          font-family:'Outfit',sans-serif;

          color:white;
        }

        .topbar{

          display:flex;

          justify-content:space-between;

          align-items:center;

          flex-wrap:wrap;

          gap:20px;

          margin-bottom:30px;
        }

        .title{

          font-size:2.3rem;

          font-family:'Syne',sans-serif;

          font-weight:800;

          background:
            linear-gradient(90deg,#38B6FF,#BF5FFF);

          -webkit-background-clip:text;

          -webkit-text-fill-color:transparent;
        }

        .stats{

          display:flex;

          gap:14px;

          flex-wrap:wrap;
        }

        .stat{

          background:rgba(255,255,255,0.08);

          border:1px solid rgba(255,255,255,0.1);

          padding:12px 18px;

          border-radius:14px;

          font-weight:700;
        }

        .instruction{

          text-align:center;

          margin-bottom:28px;

          color:white;

          font-size:1.05rem;
        }

        .card{

          max-width:890px;
          max-height:750px;

          margin:30px auto;

          background:#111827;

          border-radius:28px;

          padding:32px;

          border:1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35);
        }

        .platform{

          font-size:1.1rem;

          color:#38B6FF;

          margin-bottom:12px;

          font-weight:700;

          text-align:center;
        }

        .username{

          font-size:2rem;

          font-weight:800;

          margin-bottom:24px;

          color:white;

          text-align:center;
        }

        .post{

          background:#1e293b;

          padding:28px;

          border-radius:22px;

          line-height:1.8;

          margin-bottom:34px;

          font-size:1.15rem;

          color:white;

          text-align:center;

          border:1px solid rgba(255,255,255,0.08);
        }

        .question{

          margin-bottom:24px;

          font-size:1.2rem;

          font-weight:800;

          color:white;

          text-align:center;

          line-height:1.8;
        }

        .options{

  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:12px;

  margin-bottom:24px;
}

       .option{

  padding:12px;

  border-radius:14px;

  background:#1e293b;

  border:2px solid rgba(255,255,255,0.08);

  cursor:pointer;

  transition:0.2s;

  color:white;

  font-weight:600;

  font-size:0.88rem;

  display:flex;

  align-items:center;

  justify-content:center;

  min-height:64px;

  text-align:center;
}

        .option:hover{

          transform:translateY(-2px);

          background:#334155;
        }

        .selected{

          border-color:#38B6FF;

          background:
            linear-gradient(135deg,#2563eb,#7c3aed);

          color:white;

          box-shadow:
            0 0 20px rgba(56,182,255,0.35);
        }

        .submit-btn{

          width:100%;

          padding:16px;

          border:none;

          border-radius:16px;

          background:
            linear-gradient(135deg,#38B6FF,#BF5FFF);

          color:white;

          font-size:1rem;

          font-weight:700;

          cursor:pointer;

          transition:0.2s;
        }

        .submit-btn:hover{
          transform:translateY(-2px);
        }

        .activity-label{
          font-size:0.8rem;
          color:rgba(255,255,255,0.6);
          margin-top:4px;
          font-weight:600;
          letter-spacing:0.5px;
        }

        .skip-btn{
          border:none;
          padding:10px 18px;
          border-radius:14px;
          cursor:pointer;
          font-weight:700;
          background:rgba(255,255,255,0.1);
          color:white;
          border:1px solid rgba(255,255,255,0.15);
          transition:0.2s;
        }

        .skip-btn:hover{
          background:rgba(255,255,255,0.18);
          transform:translateY(-1px);
        }

        .feedback{

          margin-top:28px;

          padding:24px;

          border-radius:22px;

          line-height:1.9;

          border:1px solid rgba(255,255,255,0.08);
        }

        .success-feedback{

          background:
            linear-gradient(
              135deg,
              rgba(34,197,94,0.18),
              rgba(22,163,74,0.12)
            );
        }

        .warning-feedback{

          background:
            linear-gradient(
              135deg,
              rgba(239,68,68,0.15),
              rgba(124,58,237,0.12)
            );
        }

        .feedback-message{

          font-size:1.15rem;

          font-weight:800;

          text-align:center;

          white-space:pre-line;
        }

        .correct-title,
        .missed-title{

          font-size:1rem;

          font-weight:700;

          margin-bottom:14px;
        }

        .answer-list{

          display:flex;

          flex-wrap:wrap;

          gap:12px;
        }

        .correct-item{

          padding:10px 16px;

          border-radius:12px;

          background:
            linear-gradient(135deg,#16a34a,#15803d);

          color:white;

          font-weight:700;
        }

        .missed-item{

          padding:10px 16px;

          border-radius:12px;

          background:
            linear-gradient(135deg,#ef4444,#dc2626);

          color:white;

          font-weight:700;
        }

        .explanation{

          color:#cbd5e1;

          line-height:1.8;
        }

        .overlay{

          position:fixed;

          inset:0;

          background:rgba(0,0,0,0.82);

          display:flex;

          align-items:center;

          justify-content:center;

          backdrop-filter:blur(10px);

          z-index:999;
        }

        .result-card{

          width:430px;

          background:#08111f;

          border-radius:24px;

          padding:36px;

          text-align:center;

          border:1px solid rgba(191,95,255,0.35);
        }

        .final-title{

          font-size:2rem;

          font-family:'Syne',sans-serif;

          margin-bottom:16px;
        }

        .score{

          font-size:1.4rem;

          margin-bottom:14px;
        }

        .rank{

          font-size:1.2rem;

          color:#38B6FF;

          font-weight:700;

          margin-bottom:20px;
        }

        .tip{

          color:rgba(255,255,255,0.85);

          line-height:1.8;

          margin-bottom:24px;
        }

        .continue-btn{

          padding:14px 26px;

          border:none;

          border-radius:14px;

          background:
            linear-gradient(135deg,#38B6FF,#BF5FFF);

          color:white;

          font-size:1rem;

          font-weight:700;

          cursor:pointer;
        }

      `}</style>

      <div className="container">

        {/* TOPBAR */}
        <div className="topbar">

          <div>
            <div className="title">
              🕵 PRIVACY DETECTIVE
            </div>
            <div className="activity-label">
              🎮 Activity
            </div>
          </div>

          <div className="stats">

            <div className="stat">
              🎯 {score}
            </div>

            <div className="stat">
              📄 {currentIndex + 1}/{postsData.length}
            </div>

            <button
              className="skip-btn"
              onClick={() => {
                if (window.confirm("Skip this activity?")) finishGame();
              }}
            >
              Skip →
            </button>

          </div>

        </div>

        {/* INSTRUCTION */}
        <div className="instruction">

          Identify what sensitive information
          is exposed publicly.

        </div>

        {/* CARD */}
        {!gameOver && (

          <div className="card">

            <div className="platform">
              {currentPost.platform}
            </div>

            <div className="username">
              @{currentPost.username}
            </div>

            <div className="post">
              {currentPost.post}
            </div>

            <div className="question">

              Attackers only need a few clues.

              <br /><br />

              🕵 Find ALL sensitive information
              that could be misused from this post.

            </div>

            <div className="options">

              {allOptions.map((option) => (

                <div
                  key={option}
                  className={`option ${
                    selected.includes(option)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    toggleOption(option)
                  }
                >
                  {option}
                </div>

              ))}

            </div>

            <button
              className="submit-btn"
              onClick={submitAnswer}
              disabled={feedback}
            >
              🔍 Analyze Privacy Leak
            </button>

            {feedback && (

              <div
                className={`feedback ${
                  feedback.type === "success"
                    ? "success-feedback"
                    : "warning-feedback"
                }`}
              >

                <div className="feedback-message">
                  {feedback.message}
                </div>

                <br />

                <div className="correct-title">
                  ✅ Correct Privacy Leaks
                </div>

                <div className="answer-list">

                  {feedback.correct.map((item) => (

                    <div
                      key={item}
                      className="correct-item"
                    >
                      {item}
                    </div>

                  ))}

                </div>

                {feedback.missed.length > 0 && (

                  <>

                    <br />

                    <div className="missed-title">
                      ❌ You Missed
                    </div>

                    <div className="answer-list">

                      {feedback.missed.map((item) => (

                        <div
                          key={item}
                          className="missed-item"
                        >
                          {item}
                        </div>

                      ))}

                    </div>

                  </>

                )}

                <br />

                <div className="explanation">

                  {currentPost.explanation}

                </div>

              </div>

            )}

          </div>

        )}

        {/* RESULT */}
        {gameOver && (

          <div className="overlay">

            <div className="result-card">

              <div className="final-title">
                🎮 Activity Complete
              </div>

              <div className="score">
                Final Score:
                <strong> {score}</strong>
              </div>

              <div className="rank">
                {getRank()}
              </div>

              <div className="tip">

                Cyber Tip:<br /><br />

                Oversharing personal details
                online can help attackers with
                phishing, impersonation,
                identity theft, and password
                recovery attacks.

              </div>

              <button
                className="continue-btn"
                onClick={continueStory}
              >
                Continue Story →
              </button>

            </div>

          </div>

        )}

      </div>

    </>
  );
}