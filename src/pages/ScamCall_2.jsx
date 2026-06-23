import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const callsData = [

  {
    caller: "Bank Support",
    scenario:
      "Sir, your bank account will be blocked within 30 minutes. Please share the OTP sent to your phone immediately.",
    correct: "disconnect",
    explanation:
      "Real banks never ask for OTP over calls.",
  },

  {
    caller: "Courier Service",
    scenario:
      "Your parcel is stuck due to address mismatch. Pay ₹25 immediately to avoid cancellation.",
    correct: "ask",
    explanation:
      "Small payment scams are commonly used to steal banking details.",
  },

  {
    caller: "Cyber Crime Department",
    scenario:
      "Your SIM card is linked to illegal activity. Your number will be suspended unless verified immediately.",
    correct: "report",
    explanation:
      "Scammers create fear using fake authority calls.",
  },

  {
    caller: "Friend (Unknown Number)",
    scenario:
      "Bro this is my new number. I urgently need ₹5000 for hospital expenses. Send quickly.",
    correct: "verify",
    explanation:
      "Always verify identity before sending money.",
  },

  {
    caller: "UPI Support",
    scenario:
      "To receive your refund, approve the collect request sent to your app now.",
    correct: "disconnect",
    explanation:
      "Receiving money never requires approving collect requests.",
  },

  {
    caller: "Job Recruiter",
    scenario:
      "Congratulations! You are selected for work-from-home job. Pay registration fee ₹999 immediately.",
    correct: "report",
    explanation:
      "Legitimate companies do not demand registration payments for jobs.",
  }

];

export default function ScamCall_1() {

  const navigate = useNavigate();
  const location = useLocation();

  const storyId = location.state?.storyId || 1;
  const returnScene = location.state?.returnScene || 5;

  function finishGame() {
    navigate(`/story/${storyId}`, {
      state: { resumeScene: returnScene }
    });
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [popup, setPopup] = useState("");

  const [timeLeft, setTimeLeft] = useState(20);

  const [gameOver, setGameOver] = useState(false);

  const currentCall =
    callsData[currentIndex];

  /* ---------------- TIMER ---------------- */

  useEffect(() => {

    if (gameOver) return;

    const interval = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          handleChoice("timeout");

          return 20;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(interval);

  }, [currentIndex, gameOver]);

  /* ---------------- HANDLE CHOICE ---------------- */

  function handleChoice(choice) {

    if (gameOver) return;

    const correct =
      choice === currentCall.correct;

    if (correct) {

      setScore((prev) => prev + 15);

      setPopup("✅ Smart Decision!");

    } else {

      setScore((prev) =>
        Math.max(prev - 5, 0)
      );

      setPopup("❌ Scam Succeeded!");
    }

    setTimeout(() => {

      setPopup("");

      if (
        currentIndex >=
        callsData.length - 1
      ) {

        setGameOver(true);

      } else {

        setCurrentIndex((prev) => prev + 1);

        setTimeLeft(20);
      }

    }, 1800);
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

    if (score >= 75)
      return "🏆 Scam Survivor";

    if (score >= 50)
      return "🛡 Call Defender";

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

          background:
            radial-gradient(circle at top,#07122b 0%,#020617 60%,#000 100%);

          display:flex;

          align-items:center;

          justify-content:center;

          padding:20px;

          font-family:'Outfit',sans-serif;

          color:white;
        }

        .phone{

          width:100%;

          max-width:500px;

          background:#0f172a;

          border-radius:36px;

          padding:28px;

          border:1px solid rgba(255,255,255,0.1);

          box-shadow:
            0 20px 60px rgba(0,0,0,0.45);
        }

        .title{

          text-align:center;

          font-size:2rem;

          font-family:'Syne',sans-serif;

          margin-bottom:24px;

          background:
            linear-gradient(90deg,#38B6FF,#BF5FFF);

          -webkit-background-clip:text;

          -webkit-text-fill-color:transparent;
        }

        .caller{

          text-align:center;

          margin-bottom:20px;
        }

        .avatar{

          width:100px;

          height:100px;

          border-radius:50%;

          margin:auto;

          display:flex;

          align-items:center;

          justify-content:center;

          font-size:3rem;

          background:
            linear-gradient(135deg,#38B6FF,#BF5FFF);

          margin-bottom:16px;
        }

        .caller-name{

          font-size:1.5rem;

          font-weight:800;

          margin-bottom:8px;
        }

        .incoming{

          color:#22c55e;

          font-weight:700;

          font-size:1rem;
        }

        .timer{

          margin-top:16px;

          text-align:center;

          color:#facc15;

          font-weight:700;
        }

        .progress{

          width:100%;

          height:10px;

          background:rgba(255,255,255,0.08);

          border-radius:999px;

          overflow:hidden;

          margin-top:12px;

          margin-bottom:24px;
        }

        .progress-fill{

          height:100%;

          background:
            linear-gradient(90deg,#38B6FF,#BF5FFF);

          transition:1s linear;
        }

        .scenario{

          background:#111827;

          border-radius:20px;

          padding:22px;

          line-height:1.8;

          font-size:1.05rem;

          margin-bottom:24px;

          border:1px solid rgba(255,255,255,0.08);
        }

        .buttons{

          display:grid;

          grid-template-columns:1fr 1fr;

          gap:14px;
        }

        .btn{

          padding:14px;

          border:none;

          border-radius:16px;

          font-size:1rem;

          font-weight:700;

          cursor:pointer;

          transition:0.2s;

          color:white;
        }

        .disconnect{
          background:#ef4444;
        }

        .disconnect:hover{
          transform:translateY(-2px);
        }

        .ask{
          background:#2563eb;
        }

        .ask:hover{
          transform:translateY(-2px);
        }

        .report{
          background:#7c3aed;
        }

        .report:hover{
          transform:translateY(-2px);
        }

        .verify{
          background:#16a34a;
        }

        .verify:hover{
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
          margin-top:20px;
          display:block;
          margin-left:auto;
          margin-right:auto;
        }

        .skip-btn:hover{
          background:rgba(255,255,255,0.18);
          transform:translateY(-1px);
        }

        .popup{

          position:fixed;

          bottom:40px;

          left:50%;

          transform:translateX(-50%);

          font-size:1.4rem;

          font-weight:800;

          z-index:999;
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

          color:rgba(255,255,255,0.8);

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

        @media(max-width:600px){

          .buttons{
            grid-template-columns:1fr;
          }

          .phone{
            padding:22px;
          }

        }

      `}</style>

      <div className="container">

        <div className="phone">

          <div>
            <div className="title">
              📞 SCAM CALL
            </div>
            <div className="activity-label">
              🎮 Activity
            </div>
          </div>

          <button
            className="skip-btn"
            onClick={() => {
              if (window.confirm("Skip this activity?")) finishGame();
            }}
          >
            Skip →
          </button>

          <div className="caller">

            <div className="avatar">
              📱
            </div>

            <div className="caller-name">
              {currentCall.caller}
            </div>

            <div className="incoming">
              Incoming Call...
            </div>

          </div>

          <div className="timer">
            ⏳ {timeLeft}s
          </div>

          <div className="progress">

            <div
              className="progress-fill"
              style={{
                width: `${(timeLeft / 20) * 100}%`
              }}
            />

          </div>

          <div className="scenario">
            {currentCall.scenario}
          </div>

          <div className="buttons">

            <button
              className="btn disconnect"
              onClick={() =>
                handleChoice("disconnect")
              }
            >
              📴 Disconnect
            </button>

            <button
              className="btn ask"
              onClick={() =>
                handleChoice("ask")
              }
            >
              ❓ Ask Questions
            </button>

            <button
              className="btn report"
              onClick={() =>
                handleChoice("report")
              }
            >
              🚨 Report
            </button>

            <button
              className="btn verify"
              onClick={() =>
                handleChoice("verify")
              }
            >
              ✅ Verify Identity
            </button>

          </div>

        </div>

        {/* POPUP */}
        {popup && (
          <div className="popup">
            {popup}
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

                Scammers create panic,
                urgency, and fear during
                calls to pressure victims
                into revealing sensitive
                information quickly.

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