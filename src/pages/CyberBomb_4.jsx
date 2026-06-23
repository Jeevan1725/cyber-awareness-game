import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const threatsData = [

  {
    text: "paypal-security-alert.net",
    dangerous: true
  },

  {
    text: "paypal.com",
    dangerous: false
  },

  {
    text: "FreeRecharge.apk",
    dangerous: true
  },

  {
    text: "GooglePlayStore.apk",
    dangerous: false
  },

  {
    text: "Share OTP to claim reward",
    dangerous: true
  },

  {
    text: "Two-Factor Authentication Enabled",
    dangerous: false
  },

  {
    text: "bank-update-login.xyz",
    dangerous: true
  },

  {
    text: "sbi.co.in",
    dangerous: false
  },

  {
    text: "Unknown QR Payment Request",
    dangerous: true
  },

  {
    text: "Official Microsoft Login",
    dangerous: false
  },

  {
    text: "NetflixPremiumFree.apk",
    dangerous: true
  },

  {
    text: "windows-security-check.ru",
    dangerous: true
  },

  {
    text: "gmail.com",
    dangerous: false
  },

  {
    text: "Claim ₹10,000 Cashback Now",
    dangerous: true
  },

  {
    text: "Verified UPI Payment Received",
    dangerous: false
  },

  {
    text: "InstagramHelpCenter.net",
    dangerous: true
  },

  {
    text: "microsoft.com",
    dangerous: false
  },

  {
    text: "Fake KYC Verification Link",
    dangerous: true
  },

  {
    text: "Secure HTTPS Connection",
    dangerous: false
  },

  {
    text: "LotteryWinner2026.exe",
    dangerous: true
  },

  {
    text: "Official Zoom Meeting Invite",
    dangerous: false
  },

  {
    text: "CryptoDoubleMoney Scheme",
    dangerous: true
  },

  {
    text: "Authorized Software Update",
    dangerous: false
  },

  {
    text: "Your SIM Will Be Blocked Today",
    dangerous: true
  },

  {
    text: "Company VPN Connected",
    dangerous: false
  },

  {
    text: "PUBG_FREE_UC_GENERATOR.apk",
    dangerous: true
  },

  {
    text: "GitHub Official Repository",
    dangerous: false
  },

  {
    text: "Suspicious Browser Extension",
    dangerous: true
  },

  {
    text: "Password Manager Enabled",
    dangerous: false
  },

  {
    text: "verify-bank-fast-login.click",
    dangerous: true
  }

];

export default function CyberBomb_1() {

  const navigate = useNavigate();

  const location = useLocation();

  const storyId =
    location.state?.storyId || 1;

  const returnScene =
    location.state?.returnScene || 5;

  const [items, setItems] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [bombTimer, setBombTimer] =
    useState(60);

  const [gameOver, setGameOver] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  const [breachLevel, setBreachLevel] =
    useState(0);

  /* ---------------- CREATE ITEM ---------------- */

  function createThreat() {

    const random =
      threatsData[
        Math.floor(
          Math.random() *
          threatsData.length
        )
      ];

    return {
      id: Date.now() + Math.random(),
      ...random
    };
  }

  /* ---------------- INITIAL ---------------- */

  useEffect(() => {

    const temp = [];

    for (let i = 0; i < 8; i++) {
      temp.push(createThreat());
    }

    setItems(temp);

  }, []);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {

    if (gameOver) return;

    const interval = setInterval(() => {

      setBombTimer((prev) => {

        if (prev <= 1) {

          setGameOver(true);

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(interval);

  }, [gameOver]);

  /* ---------------- CUT ---------------- */

  function cutThreat(item) {

    if (gameOver) return;

    if (item.dangerous) {

      setScore((prev) => prev + 10);

      setFeedback(
        "✅ Threat Neutralized"
      );

    } else {

      setBreachLevel((prev) =>
        prev + 20
      );

      setFeedback(
        "❌ Safe System Damaged"
      );
    }

    setTimeout(() => {
      setFeedback("");
    }, 1000);

    setItems((prev) =>

      prev.map((i) =>
        i.id === item.id
          ? createThreat()
          : i
      )

    );
  }

  /* ---------------- GAME OVER ---------------- */

  useEffect(() => {

    if (breachLevel >= 100) {

      setGameOver(true);
    }

  }, [breachLevel]);

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

    if (score >= 120)
      return "🏆 Cyber Bomb Expert";

    if (score >= 80)
      return "🛡 Threat Defender";

    if (score >= 40)
      return "⚡ Security Cadet";

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
            radial-gradient(circle at top,#120404 0%,#020617 60%,#000 100%);

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

          font-size:2.4rem;

          font-family:'Syne',sans-serif;

          font-weight:800;

          color:#ff4d4d;

          text-shadow:
            0 0 20px rgba(255,77,77,0.5);
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

        .warning{

          text-align:center;

          margin-bottom:26px;

          font-size:1.1rem;

          color:#f87171;

          font-weight:700;
        }

        .bomb{

          max-width:820px;

          margin:0 auto 30px;

          background:#111827;

          border-radius:28px;

          padding:30px;

          border:1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 0 40px rgba(255,0,0,0.2);
        }

        .timer-display{

          text-align:center;

          font-size:4rem;

          font-weight:800;

          color:#ff4d4d;

          margin-bottom:20px;

          animation:pulse 1s infinite;
        }

        @keyframes pulse{

          0%{
            opacity:1;
          }

          50%{
            opacity:0.5;
          }

          100%{
            opacity:1;
          }
        }

        .breach-label{

          margin-bottom:10px;

          font-weight:700;

          color:#f87171;
        }

        .breach-bar{

          width:100%;

          height:18px;

          background:#1e293b;

          border-radius:999px;

          overflow:hidden;

          margin-bottom:28px;
        }

        .breach-fill{

          height:100%;

          background:
            linear-gradient(90deg,#ef4444,#dc2626);

          transition:0.3s;
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

        .grid{

          display:grid;

          grid-template-columns:
            repeat(2,1fr);

          gap:18px;
        }

        .threat{

          background:#1e293b;

          border:2px solid rgba(255,255,255,0.08);

          border-radius:18px;

          padding:20px;

          text-align:center;

          cursor:pointer;

          transition:0.2s;

          min-height:120px;

          display:flex;

          align-items:center;

          justify-content:center;

          font-weight:700;

          line-height:1.6;
        }

        .threat:hover{

          transform:translateY(-3px);

          border-color:#ff4d4d;

          box-shadow:
            0 0 20px rgba(255,77,77,0.25);
        }

        .feedback{

          text-align:center;

          margin-top:24px;

          font-size:1.2rem;

          font-weight:800;
        }

        .overlay{

          position:fixed;

          inset:0;

          background:rgba(0,0,0,0.84);

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

          border:1px solid rgba(255,77,77,0.3);
        }

        .final-title{

          font-size:2rem;

          font-family:'Syne',sans-serif;

          margin-bottom:16px;

          color:#ff4d4d;
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
            linear-gradient(135deg,#ff4d4d,#dc2626);

          color:white;

          font-size:1rem;

          font-weight:700;

          cursor:pointer;
        }

        @media(max-width:700px){

          .grid{
            grid-template-columns:1fr;
          }

          .timer-display{
            font-size:3rem;
          }

        }

      `}</style>

      <div className="container">

        {/* TOPBAR */}
        <div className="topbar">

          <div>
            <div className="title">
              💣 CYBER BOMB
            </div>
            <div className="activity-label">
              🎮 Activity
            </div>
          </div>

          <div className="stats">

            <div className="stat">
              ⏳ {bombTimer}s
            </div>

            <div className="stat">
              🎯 {score}
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

        {/* WARNING */}
        <div className="warning">

          Cut ONLY dangerous cyber threats
          before the system explodes.

        </div>

        {/* BOMB */}
        <div className="bomb">

          <div className="timer-display">
            {bombTimer}
          </div>

          <div className="breach-label">
            SYSTEM BREACH LEVEL
          </div>

          <div className="breach-bar">

            <div
              className="breach-fill"
              style={{
                width:`${breachLevel}%`
              }}
            />

          </div>

          {/* THREATS */}
          <div className="grid">

            {items.map((item) => (

              <div
                key={item.id}
                className="threat"
                onClick={() =>
                  cutThreat(item)
                }
              >
                {item.text}
              </div>

            ))}

          </div>

          {feedback && (

            <div className="feedback">
              {feedback}
            </div>

          )}

        </div>

        {/* RESULT */}
        {gameOver && (

          <div className="overlay">

            <div className="result-card">

              <div className="final-title">

                {breachLevel >= 100
                  ? "💥 SYSTEM BREACHED"
                  : "🛡 BOMB DEFUSED"}

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

                Attackers often mix real and
                fake cyber elements together.
                Always verify links, files,
                QR requests, and login pages
                carefully before interacting.

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