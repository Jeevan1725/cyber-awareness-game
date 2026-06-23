import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const chatsData = [

  {
    text: "Bro send OTP quickly, my phone got damaged.",
    scam: true,
    sender: "Rahul"
  },

  {
    text: "Your Swiggy order has been delivered.",
    scam: false,
    sender: "Swiggy"
  },

  {
    text: "Congratulations! You won iPhone 16. Claim now!",
    scam: true,
    sender: "Prize Center"
  },

  {
    text: "Can we meet tomorrow evening?",
    scam: false,
    sender: "Arun"
  },

  {
    text: "URGENT: Your bank account will be blocked today.",
    scam: true,
    sender: "SBI Support"
  },

  {
    text: "Hey bro, are you coming to college today?",
    scam: false,
    sender: "Karthik"
  },

  {
    text: "Your PAN card verification failed. Update immediately.",
    scam: true,
    sender: "Gov Alert"
  },

  {
    text: "Your Amazon package will arrive by 6 PM.",
    scam: false,
    sender: "Amazon"
  },

  {
    text: "Police complaint registered against your SIM card.",
    scam: true,
    sender: "Cyber Cell"
  },

  {
    text: "Can you send me today's notes?",
    scam: false,
    sender: "Priya"
  },

  {
    text: "Free recharge available! Click immediately.",
    scam: true,
    sender: "Recharge Bonus"
  },

  {
    text: "Meeting postponed to Monday.",
    scam: false,
    sender: "Manager"
  },

  {
    text: "Your Instagram account is under review. Login now.",
    scam: true,
    sender: "Instagram Help"
  },

  {
    text: "Happy Birthday 🎉",
    scam: false,
    sender: "Anu"
  },
  {
  text: "Hi Anna, I changed my number. Can you send ₹2000 urgently?",
  scam: true,
  sender: "Unknown Contact"
},

{
  text: "Your interview has been scheduled for tomorrow at 10 AM.",
  scam: false,
  sender: "HR Team"
},

{
  text: "Your Aadhaar will be suspended within 24 hours. Verify now.",
  scam: true,
  sender: "UIDAI Support"
},

{
  text: "Movie tickets booked successfully for tonight.",
  scam: false,
  sender: "BookMyShow"
},

{
  text: "Your electricity connection will be disconnected today unless payment is made immediately.",
  scam: true,
  sender: "EB Service"
},

{
  text: "Assignment submission deadline extended to Friday.",
  scam: false,
  sender: "Professor"
},

{
  text: "Click here to activate your free 5GB daily internet reward.",
  scam: true,
  sender: "Jio Bonus"
},

{
  text: "Cab driver has arrived at your pickup location.",
  scam: false,
  sender: "Uber"
},

{
  text: "You have received a tax refund of ₹48,500. Submit bank details now.",
  scam: true,
  sender: "Income Tax Dept"
},

{
  text: "Team lunch shifted to 1:30 PM.",
  scam: false,
  sender: "Office Group"
},

{
  text: "Dear customer, your ATM card has been blocked. Share OTP to reactivate.",
  scam: true,
  sender: "Bank Helpline"
},

{
  text: "Your train ticket RAC status has been confirmed.",
  scam: false,
  sender: "IRCTC"
},

{
  text: "Your parcel is waiting. Pay ₹35 customs fee immediately.",
  scam: true,
  sender: "Delivery Center"
},

{
  text: "Reminder: Dentist appointment tomorrow at 4 PM.",
  scam: false,
  sender: "Dental Clinic"
},

{
  text: "Your WhatsApp account will expire today unless verified.",
  scam: true,
  sender: "WhatsApp Team"
},

{
  text: "Project meeting link shared in the group.",
  scam: false,
  sender: "Teammate"
},

{
  text: "You were tagged in a private video. Login to watch now.",
  scam: true,
  sender: "Social Media Alert"
},

{
  text: "Semester exam timetable released officially.",
  scam: false,
  sender: "College Admin"
},

{
  text: "Your UPI account has been frozen due to suspicious activity.",
  scam: true,
  sender: "UPI Security"
},

{
  text: "Food order picked up and on the way.",
  scam: false,
  sender: "Zomato"
},

{
  text: "Final warning: Legal action will begin if KYC is not updated now.",
  scam: true,
  sender: "KYC Department"
},

{
  text: "Can you bring the charger tomorrow?",
  scam: false,
  sender: "Vijay"
},

{
  text: "Netflix Premium free for 1 year. Claim immediately.",
  scam: true,
  sender: "Netflix Rewards"
},

{
  text: "Class cancelled due to heavy rain today.",
  scam: false,
  sender: "Class Representative"
},

{
  text: "Your Google account password was leaked. Reset immediately here.",
  scam: true,
  sender: "Google Security"
},

{
  text: "Photos from yesterday's event uploaded in drive.",
  scam: false,
  sender: "Event Team"
},

{
  text: "Your loan of ₹5 lakh approved instantly without documents.",
  scam: true,
  sender: "Instant Finance"
},

{
  text: "Your package has reached the local hub.",
  scam: false,
  sender: "BlueDart"
},

];

export default function ScamChat_1() {

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
  const [gameOver, setGameOver] = useState(false);
  const [popup, setPopup] = useState("");
  const [gameTime, setGameTime] = useState(60);

  /* ---------------- TIMER BASED ON MESSAGE SIZE ---------------- */

  function getTimerForMessage(text) {

    const wordCount =
      text.split(" ").length;

    let timer = Math.floor(wordCount * 1.5);

    if (timer < 12)
      timer = 12;

    if (timer > 20)
      timer = 20;

    return timer;
  }

  /* ---------------- CREATE CARD ---------------- */

  function createCard() {

    const random =
      chatsData[Math.floor(Math.random() * chatsData.length)];

    return {
      id: Date.now() + Math.random(),
      ...random,
      timer: getTimerForMessage(random.text),
      maxTimer: getTimerForMessage(random.text)
    };
  }

  /* ---------------- INITIAL 4 CARDS ---------------- */

  useEffect(() => {

    const initialCards = [];

    for (let i = 0; i < 4; i++) {
      initialCards.push(createCard());
    }

    setCards(initialCards);

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

  /* ---------------- HANDLE ANSWER ---------------- */

  function handleAnswer(card, choice) {

    const correct =
      (choice === "scam" && card.scam) ||
      (choice === "safe" && !card.scam);

    if (correct) {

      setScore((prev) => prev + 10);
      setCombo((prev) => prev + 1);

      setPopup("✅ Correct!");

    } else {

      setScore((prev) =>
        Math.max(prev - 5, 0)
      );

      setCombo(0);

      setPopup("❌ Wrong!");

    }

    setTimeout(() => {
      setPopup("");
    }, 800);

    setCards((prev) =>

      prev.map((c) =>
        c.id === card.id
          ? createCard()
          : c
      )

    );
  }

  /* ---------------- CONTINUE STORY ---------------- */

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
      return "🏆 Cyber Detective";

    if (score >= 100)
      return "🛡 Scam Hunter";

    if (score >= 50)
      return "⚡ Alert User";

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

        body{
          overflow:hidden;
        }

        .container{
          width:100vw;
          min-height:100vh;
          background:
            radial-gradient(circle at top,#003049 0%,#020617 55%,#000 100%);
          font-family:'Outfit',sans-serif;
          color:white;
          padding:30px;
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
          font-size:1.05rem;
          color:rgba(255,255,255,0.8);
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:24px;
          max-width:1200px;
          margin:auto;
        }

        .card{
          background:#0f172a;
          border-radius:24px;
          padding:24px;
          border:1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 15px 40px rgba(0,0,0,0.35);

          min-height:260px;

          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }

        .sender{
          color:#38B6FF;
          font-weight:700;
          margin-bottom:12px;
          font-size:1rem;
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

        .message{
          font-size:1.08rem;
          line-height:1.7;
          color:white;
          margin-bottom:24px;
          flex:1;
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
          font-weight:700;
          cursor:pointer;
          transition:0.2s;
          font-size:1rem;
        }

        .safe{
          background:#1e293b;
          color:white;
        }

        .safe:hover{
          background:#334155;
        }

        .scam{
          background:
            linear-gradient(135deg,#ef4444,#dc2626);

          color:white;
        }

        .scam:hover{
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
          background:rgba(0,0,0,0.8);

          display:flex;
          align-items:center;
          justify-content:center;

          backdrop-filter:blur(10px);
        }

        .result-card{
          width:420px;
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
              📱 SCAM CHAT
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
          Decide whether each message is SAFE or a SCAM before time runs out.
        </div>

        {/* GRID */}
        <div className="grid">

          {cards.map((card) => (

            <div
              key={card.id}
              className="card"
            >

              <div>

                <div className="sender">
                  {card.sender}
                </div>

                <div className="timer">
                  ⏳ {card.timer}s
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

                <div className="message">
                  {card.text}
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
                  className="btn scam"
                  onClick={() =>
                    handleAnswer(card, "scam")
                  }
                >
                  🚨 SCAM
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

                Scammers often create urgency,
                emotional pressure, fake rewards,
                or fear to manipulate victims.

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