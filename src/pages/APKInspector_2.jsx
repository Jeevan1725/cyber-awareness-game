import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const appsData = [

  {
    app: "WhatsApp",
    developer: "Meta",
    rating: "4.4",
    downloads: "5B+",
    permissions: [
      "Camera",
      "Contacts",
      "Microphone"
    ],
    malware: false
  },

  {
    app: "FreeFire Diamond Hack",
    developer: "Unknown Dev",
    rating: "2.1",
    downloads: "5K+",
    permissions: [
      "SMS",
      "Accessibility",
      "Device Admin",
      "Contacts"
    ],
    malware: true
  },

  {
    app: "Instagram",
    developer: "Meta",
    rating: "4.3",
    downloads: "1B+",
    permissions: [
      "Camera",
      "Storage",
      "Microphone"
    ],
    malware: false
  },

  {
    app: "WhatsApp Gold",
    developer: "WA Premium Team",
    rating: "2.8",
    downloads: "12K+",
    permissions: [
      "SMS",
      "Call Logs",
      "Accessibility",
      "Device Admin"
    ],
    malware: true
  },

  {
    app: "Spotify",
    developer: "Spotify AB",
    rating: "4.5",
    downloads: "1B+",
    permissions: [
      "Storage",
      "Microphone"
    ],
    malware: false
  },

  {
    app: "Netflix Premium Free",
    developer: "Movie Lab",
    rating: "1.9",
    downloads: "8K+",
    permissions: [
      "SMS",
      "Contacts",
      "Device Admin"
    ],
    malware: true
  },

  {
    app: "Google Maps",
    developer: "Google LLC",
    rating: "4.2",
    downloads: "10B+",
    permissions: [
      "Location",
      "Storage"
    ],
    malware: false
  },

  {
    app: "BGMI UC Generator",
    developer: "UC Rewards",
    rating: "2.0",
    downloads: "3K+",
    permissions: [
      "SMS",
      "Accessibility",
      "Device Admin",
      "Contacts"
    ],
    malware: true
  },

  {
    app: "Telegram",
    developer: "Telegram FZ LLC",
    rating: "4.3",
    downloads: "1B+",
    permissions: [
      "Contacts",
      "Storage",
      "Camera"
    ],
    malware: false
  },

  {
    app: "Cracked YouTube Premium",
    developer: "YT Mods",
    rating: "1.8",
    downloads: "7K+",
    permissions: [
      "SMS",
      "Accessibility",
      "Microphone",
      "Device Admin"
    ],
    malware: true
  }

];

export default function APKInspector_1() {

  const navigate = useNavigate();
  const location = useLocation();

  const storyId = location.state?.storyId || 1;
  const returnScene = location.state?.returnScene || 5;

  function finishGame() {
    navigate(`/story/${storyId}`, {
      state: { resumeScene: returnScene }
    });
  }

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [popup, setPopup] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(70);

  /* ---------------- TIMER ---------------- */

  function getTimerForApp(app) {

    const size =
      app.permissions.length +
      app.app.split(" ").length;

    let timer = size * 2;

    if (timer < 12)
      timer = 18;

    if (timer > 20)
      timer = 28;

    return timer;
  }

  /* ---------------- CREATE CARD ---------------- */

  function createCard() {

    const random =
      appsData[Math.floor(Math.random() * appsData.length)];

    return {
      id: Date.now() + Math.random(),
      ...random,
      timer: getTimerForApp(random),
      maxTimer: getTimerForApp(random)
    };
  }

  /* ---------------- INITIAL CARDS ---------------- */

  useEffect(() => {

    const initial = [];

    for (let i = 0; i < 4; i++) {
      initial.push(createCard());
    }

    setCards(initial);

  }, []);

  /* ---------------- GAME TIMER ---------------- */

  useEffect(() => {

    if (gameOver) return;

    const interval = setInterval(() => {

      setGameTime((prev) => {

        if (prev <= 1) {

          clearInterval(interval);
          setGameOver(true);

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(interval);

  }, [gameOver]);

  /* ---------------- CARD TIMERS ---------------- */

  useEffect(() => {

    if (gameOver) return;

    const interval = setInterval(() => {

      setCards((prev) =>

        prev.map((card) => {

          if (card.timer <= 1) {

            return createCard();
          }

          return {
            ...card,
            timer: card.timer - 1
          };

        })

      );

    }, 1000);

    return () => clearInterval(interval);

  }, [gameOver]);

  /* ---------------- ANSWER ---------------- */

  function handleAnswer(card, choice) {

    const correct =
      (choice === "malware" && card.malware) ||
      (choice === "safe" && !card.malware);

    if (correct) {

      setScore((prev) => prev + 10);
      setCombo((prev) => prev + 1);

      setPopup("✅ Correct Decision!");

    } else {

      setScore((prev) =>
        Math.max(prev - 5, 0)
      );

      setCombo(0);

      setPopup("❌ Wrong Decision!");

    }

    setTimeout(() => {
      setPopup("");
    }, 900);

    setCards((prev) =>

      prev.map((c) =>
        c.id === card.id
          ? createCard()
          : c
      )

    );
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

    if (score >= 150)
      return "🏆 Malware Analyst";

    if (score >= 100)
      return "🛡 Cyber Inspector";

    if (score >= 50)
      return "⚡ Secure User";

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
  overflow-y:auto;
}

          background:
            radial-gradient(circle at top,#0f172a 0%,#020617 60%,#000 100%);

          font-family:'Outfit',sans-serif;
          color:white;
        }

        .topbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
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
          gap:16px;
        }

        .stat{
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.12);
          padding:12px 18px;
          border-radius:14px;
          font-weight:700;
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

        .instruction{
          text-align:center;
          margin-bottom:28px;
          color:white;
          font-size:1.05rem;
        }

        .grid{
          display:grid;
          grid-template-columns:
repeat(auto-fit,minmax(420px,1fr));
          gap:24px;
          max-width:1200px;
          margin:auto;
        }

        .card{
          background:#111827;
          border-radius:24px;
          padding:24px;
          border:1px solid rgba(255,255,255,0.1);

          box-shadow:
            0 15px 40px rgba(0,0,0,0.35);

          min-height:280px;

          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }

        .app-name{
          font-size:1.5rem;
          font-weight:800;
          margin-bottom:10px;
        }

        .developer{
          color:#cbd5e1;
          margin-bottom:10px;
        }

        .meta{
  display:flex;
  gap:12px;
  margin-bottom:18px;
  flex-wrap:wrap;
}

        .meta-item{

  background:rgba(255,255,255,0.08);

  padding:10px 14px;

  border-radius:12px;

  font-size:0.95rem;

  color:white;

  font-weight:700;

  display:flex;

  align-items:center;

  gap:8px;

  min-width:90px;

  justify-content:center;

  border:1px solid rgba(255,255,255,0.08);
}
  .meta-item svg{
  color:white;
}

        .timer{
          color:#facc15;
          font-weight:700;
          margin-bottom:14px;
        }

        .progress{
          width:100%;
          height:8px;
          background:rgba(255,255,255,0.08);
          border-radius:999px;
          overflow:hidden;
          margin-bottom:18px;
        }

        .progress-fill{
          height:100%;
          transition:1s linear;

          background:
            linear-gradient(90deg,#38B6FF,#BF5FFF);
        }

        .permissions{
          margin-top:8px;
          margin-bottom:20px;
        }

        .permissions-title{
          margin-bottom:10px;
          font-weight:700;
        }

        .perm-list{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }

        .perm{
          padding:8px 12px;
          border-radius:12px;
          font-size:0.9rem;
          background:#1e293b;
        color:white;
        }

        .danger{
          background:#7f1d1d;
          color:#fecaca;
        }
          .app-name{
  color:white;
}

        .buttons{
          display:flex;
          gap:14px;
        }

        .btn{
          flex:1;
          padding:14px;
          border:none;
          border-radius:14px;
          font-size:1rem;
          font-weight:700;
          cursor:pointer;
          transition:0.2s;
        }

        .safe{
          background:#1e293b;
          color:white;
        }

        .safe:hover{
          background:#334155;
        }

        .malware{
          background:
            linear-gradient(135deg,#ef4444,#dc2626);

          color:white;
        }

        .malware:hover{
          transform:translateY(-2px);
        }

        .popup{
          position:fixed;
          bottom:30px;
          left:50%;
          transform:translateX(-50%);
          font-size:1.4rem;
          font-weight:700;
        }

        .overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.82);

          display:flex;
          align-items:center;
          justify-content:center;

          backdrop-filter:blur(10px);
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
          color:rgba(255,255,255,0.75);
          line-height:1.7;
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

        @media(max-width:900px){

          .grid{
            grid-template-columns:1fr;
          }

          .topbar{
            flex-direction:column;
            gap:18px;
          }

          .stats{
            flex-wrap:wrap;
            justify-content:center;
          }

        }

      `}</style>

      <div className="container">

        {/* TOPBAR */}
        <div className="topbar">

          <div>
            <div className="title">
              📲 APK INSPECTOR
            </div>
            <div className="activity-label">
              🎮 Activity
            </div>
          </div>

          <div className="stats">

            <div className="stat">
              ⏳ {gameTime}s
            </div>

            <div className="stat">
              🎯 {score}
            </div>

            <div className="stat">
              ⚡ {combo}
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
          Inspect apps carefully and decide whether they are SAFE or MALWARE.
        </div>

        {/* GRID */}
        <div className="grid">

          {cards.map((card) => (

            <div
              key={card.id}
              className="card"
            >

              <div>

                <div className="app-name">
                  {card.app}
                </div>

                <div className="developer">
                  👨‍💻 {card.developer}
                </div>

                <div className="meta">

                  <div className="meta-item">
                    ⭐ {card.rating}
                  </div>

                  <div className="meta-item">
                    📥 {card.downloads}
                  </div>

                  <div className="meta-item">
                    ⏳ {card.timer}s
                  </div>

                </div>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{
                      width:
                        `${(card.timer / card.maxTimer) * 100}%`
                    }}
                  />

                </div>

                <div className="permissions">

                  <div className="permissions-title">
                    Permissions
                  </div>

                  <div className="perm-list">

                    {card.permissions.map((perm, index) => (

                      <div
                        key={index}
                        className={`perm ${
                          perm === "SMS" ||
                          perm === "Accessibility" ||
                          perm === "Device Admin" ||
                          perm === "Call Logs"
                            ? "danger"
                            : ""
                        }`}
                      >
                        {perm}
                      </div>

                    ))}

                  </div>

                </div>

              </div>

              <div className="buttons">

                <button
                  className="btn safe"
                  onClick={() =>
                    handleAnswer(card, "safe")
                  }
                >
                  ✅ SAFE
                </button>

                <button
                  className="btn malware"
                  onClick={() =>
                    handleAnswer(card, "malware")
                  }
                >
                  🚨 MALWARE
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* POPUP */}
        {popup && (
          <div className="popup">
            {popup}
          </div>
        )}

        {/* GAME OVER */}
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

                Malware apps often request
                dangerous permissions like:
                SMS access, Device Admin,
                Accessibility control, or
                Call Logs access.

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