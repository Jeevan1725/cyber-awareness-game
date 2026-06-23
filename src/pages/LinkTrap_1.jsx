import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const linksData = [

  { text: "amazon.in", fake: false },
  { text: "amaz0n-.in", fake: true },

  { text: "paytm.com", fake: false },
  { text: "paytm-reward-bonus.xyz", fake: true },

  { text: "instagram.com", fake: false },
  { text: "instagrann.com", fake: true },

  { text: "sbi.co.in", fake: false },
  { text: "sbi.c0.1n", fake: true },

  { text: "netflix.com", fake: false },
  { text: "netflix.1ive", fake: true },

  { text: "flipkart.com", fake: false },
  { text: "flipkart-giftcard.click", fake: true },

  { text: "google.com", fake: false },
  { text: "g00gle-login-alert.xyz", fake: true },

  { text: "facebook.com", fake: false },
  { text: "faceb00k-security-check.net", fake: true },

  { text: "whatsapp.com", fake: false },
  { text: "whatsaapp-freecall.live", fake: true },

  { text: "myntra.com", fake: false },
  { text: "myntra-offer-spin.conn", fake: true },

  { text: "phonepe.com", fake: false },
  { text: "ph0nepe-cashback.xyz", fake: true },

  { text: "icicibank.com", fake: false },
  { text: "iciciibank.ncom", fake: true },

  { text: "hdfcbank.com", fake: false },
  { text: "hdfc-verification-alert.live", fake: true },

  { text: "telegram.org", fake: false },
  { text: "telegram-premium-free.net", fake: true },

  { text: "youtube.com", fake: false },
  { text: "youtube.con", fake: true },

  { text: "linkedin.com", fake: false },
  { text: "linkedln.com", fake: true },

  { text: "spotify.com", fake: false },
  { text: "spotify-freepremium.click", fake: true },

  { text: "swiggy.com", fake: false },
  { text: "swigyy.com", fake: true },
  { text: "steamcommunity.com", fake: false },
  { text: "steam-free-skins.live", fake: true },

];

export default function LinkTrap_1() {
  const navigate = useNavigate();
  const location = useLocation();

  const storyId = location.state?.storyId || 1;
  const returnScene = location.state?.returnScene || 5;

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [links, setLinks] = useState([]);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("");

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  /* ---------------- GENERATE LINKS ---------------- */

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      createLink();
    }, 1200);

    return () => clearInterval(interval);
  }, [gameOver]);

  function createLink() {
    const random = linksData[Math.floor(Math.random() * linksData.length)];

    const newLink = {
      id: Date.now() + Math.random(),
      text: random.text,
      fake: random.fake,
      left: Math.random() * 75,
      top: -10,
    };

    setLinks((prev) => [...prev, newLink]);

    moveLink(newLink.id);
  }

  /* ---------------- MOVE LINKS ---------------- */

  function moveLink(id) {
    let position = -10;

    const interval = setInterval(() => {
      position += 0.75;

      setLinks((prev) =>
        prev.map((link) =>
          link.id === id ? { ...link, top: position } : link
        )
      );

      if (position > 100) {
        clearInterval(interval);

        setLinks((prev) => prev.filter((link) => link.id !== id));
      }
    }, 50);
  }

  /* ---------------- HANDLE TAP ---------------- */

  function handleClick(link) {
    setLinks((prev) => prev.filter((l) => l.id !== link.id));

    if (link.fake) {
      setScore((prev) => prev + 10);
      setCombo((prev) => prev + 1);

      setMessage("✅ Scam Detected!");

      setTimeout(() => {
        setMessage("");
      }, 800);
    } else {
      setScore((prev) => Math.max(prev - 5, 0));
      setCombo(0);

      setMessage("❌ Safe Link!");

      setTimeout(() => {
        setMessage("");
      }, 800);
    }
  }

  /* ---------------- FINISH GAME ---------------- */

  function finishGame() {
    navigate(`/story/${storyId}`, {
      state: {
        resumeScene: returnScene,
      },
    });
  }

  /* ---------------- RANK ---------------- */

  function getRank() {
    if (score >= 120) return "🏆 Cyber Detective";
    if (score >= 80) return "🛡 Scam Hunter";
    if (score >= 40) return "⚡ Alert User";

    return "🙂 Beginner";
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *{
          box-sizing:border-box;
          margin:0;
          padding:0;
        }

        body{
          overflow:hidden;
        }

        .game-container{
          width:100vw;
          height:100vh;
          overflow:hidden;
          position:relative;
          background:
            radial-gradient(circle at top,#1b0033 0%,#050816 45%,#000 100%);
          font-family:'Outfit',sans-serif;
          color:white;
        }

        .top-bar{
          position:absolute;
          top:0;
          left:0;
          width:100%;
          padding:18px 24px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          z-index:100;
          background:rgba(0,0,0,0.35);
          backdrop-filter:blur(10px);
        }

        .title{
          font-size:2rem;
          font-family:'Syne',sans-serif;
          font-weight:800;
          background:linear-gradient(90deg,#BF5FFF,#38B6FF);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .info{
          display:flex;
          gap:16px;
          font-size:1rem;
          font-weight:600;
        }

        .card{
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.12);
          padding:10px 18px;
          border-radius:14px;
        }

        .instructions{
          position:absolute;
          top:90px;
          left:50%;
          transform:translateX(-50%);
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);
          padding:14px 20px;
          border-radius:14px;
          font-size:1rem;
          z-index:50;
          backdrop-filter:blur(10px);
        }

        .link-box{
          position:absolute;
          min-width:260px;
          padding:14px 18px;
          border-radius:16px;
          background:rgba(10,20,40,0.95);
          border:1px solid rgba(191,95,255,0.35);
          box-shadow:
            0 8px 30px rgba(0,0,0,0.45),
            0 0 15px rgba(191,95,255,0.15);

          cursor:pointer;
          transition:0.2s;
          user-select:none;
        }

        .link-box:hover{
          transform:scale(1.05);
          border-color:#BF5FFF;
        }

        .url{
          font-size:1rem;
          font-weight:600;
          color:#fff;
          word-break:break-word;
        }

        .fake-tag{
          margin-top:8px;
          font-size:0.8rem;
          color:rgba(255,255,255,0.5);
        }

        .message{
          position:absolute;
          bottom:40px;
          left:50%;
          transform:translateX(-50%);
          font-size:1.4rem;
          font-weight:700;
          z-index:100;
        }

        .game-over{
          position:absolute;
          inset:0;
          background:rgba(0,0,0,0.8);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:200;
          backdrop-filter:blur(10px);
        }

        .game-over-card{
          width:420px;
          background:#08111f;
          border:1px solid rgba(191,95,255,0.35);
          border-radius:24px;
          padding:36px;
          text-align:center;
          box-shadow:0 20px 60px rgba(0,0,0,0.6);
        }

        .final-title{
          font-size:2rem;
          font-family:'Syne',sans-serif;
          margin-bottom:12px;
        }

        .score{
          font-size:1.4rem;
          margin-top:16px;
        }

        .rank{
          margin-top:12px;
          font-size:1.2rem;
          color:#BF5FFF;
          font-weight:700;
        }

        .tip{
          margin-top:18px;
          line-height:1.6;
          color:rgba(255,255,255,0.7);
          font-size:0.95rem;
        }

        .btn{
          margin-top:24px;
          padding:14px 24px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg,#BF5FFF,#38B6FF);
          color:white;
          font-size:1rem;
          font-weight:700;
          cursor:pointer;
          transition:0.2s;
        }

        .btn:hover{
          transform:translateY(-2px);
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
      `}</style>

      <div className="game-container">

        {/* TOP BAR */}
        <div className="top-bar">

          <div className="title">
            🛑 LINK TRAP
          </div>

          <div className="info">

            <div className="card">
              ⏳ {timeLeft}s
            </div>

            <div className="card">
              🎯 Score: {score}
            </div>

            <div className="card">
              ⚡ Combo: {combo}
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

        {/* INSTRUCTIONS */}
        <div className="instructions">
          Tap ONLY fake/suspicious links. Avoid real websites.
        </div>

        {/* LINKS */}
        {links.map((link) => (
          <div
            key={link.id}
            className="link-box"
            onClick={() => handleClick(link)}
            style={{
              left: `${link.left}%`,
              top: `${link.top}%`,
            }}
          >
            <div className="url">
              {link.text}
            </div>

            <div className="fake-tag">
              Tap if suspicious
            </div>
          </div>
        ))}

        {/* MESSAGE */}
        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* GAME OVER */}
        {gameOver && (
          <div className="game-over">

            <div className="game-over-card">

              <div className="final-title">
                🎮 Activity Complete
              </div>

              <div className="score">
                Final Score: <strong>{score}</strong>
              </div>

              <div className="rank">
                {getRank()}
              </div>

              <div className="tip">
                Cyber Tip:<br /><br />

                Scammers often replace letters with numbers
                like:
                <br /><br />

                <strong>amazon</strong> → <strong>amaz0n</strong>
                <br />
                <strong>google</strong> → <strong>g00gle</strong>
              </div>

              <button
                className="btn"
                onClick={finishGame}
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