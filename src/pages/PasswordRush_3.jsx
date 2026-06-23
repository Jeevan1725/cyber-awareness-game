import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const characters = [

  {
    name: "Arun",
    age: 19,
    hobby: "BGMI",
    pet: "Leo",
    birthYear: "2005",
    favoriteColor: "Blue",
    fatherName: "Suresh",
    motherName: "Lakshmi",
    favoriteMovie: "Leo",
    city: "Chennai"
  },

  {
    name: "Priya",
    age: 21,
    hobby: "Photography",
    pet: "Milo",
    birthYear: "2003",
    favoriteColor: "Purple",
    fatherName: "Ramesh",
    motherName: "Anitha",
    favoriteMovie: "Interstellar",
    city: "Coimbatore"
  },

  {
    name: "Rahul",
    age: 20,
    hobby: "Football",
    pet: "Tiger",
    birthYear: "2004",
    favoriteColor: "Red",
    fatherName: "Kumar",
    motherName: "Meena",
    favoriteMovie: "Jailer",
    city: "Madurai"
  }

];
export default function PasswordRush_1() {

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

  const [userPassword, setUserPassword] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  const [gameOver, setGameOver] =
    useState(false);

  

  const currentCharacter =
    characters[currentIndex];


  /* ---------------- PASSWORD STRENGTH ---------------- */

  function getStrength(password) {

    let points = 0;

    if (password.length >= 12)
      points++;

    if (/[A-Z]/.test(password))
      points++;

    if (/[0-9]/.test(password))
      points++;

    if (/[^A-Za-z0-9]/.test(password))
      points++;

    if (points <= 1)
      return "Weak";

    if (points === 2)
      return "Medium";

    if (points === 3)
      return "Strong";

    return "Very Strong";
  }

  /* ---------------- CRACK TIME ---------------- */

  function getCrackTime(password) {

    const strength =
      getStrength(password);

    if (strength === "Weak")
      return "2 seconds";

    if (strength === "Medium")
      return "3 weeks";

    if (strength === "Strong")
      return "24 years";

    return "500 centuries";
  }

  /* ---------------- FEEDBACK ---------------- */

  function getFeedback(password) {

    const suggestions = [];

    if (password.length < 12)
      suggestions.push(
        "Use at least 12 characters"
      );

    if (!/[A-Z]/.test(password))
      suggestions.push(
        "Add uppercase letters"
      );

    if (!/[0-9]/.test(password))
      suggestions.push(
        "Add numbers"
      );

    if (!/[^A-Za-z0-9]/.test(password))
      suggestions.push(
        "Add special symbols"
      );

    return suggestions;
  }

  /* ---------------- SUBMIT ---------------- */

  function submitPassword() {

  if (!userPassword.trim()) return;

  const strength =
    getStrength(userPassword);

  const crackTime =
    getCrackTime(userPassword);

  if (
    strength === "Strong" ||
    strength === "Very Strong"
  ) {

    setScore((prev) => prev + 20);

    setFeedback(
      `🛡 System Secure\nEstimated Breach Time: ${crackTime}`
    );

  } else {

    setScore((prev) =>
      Math.max(prev - 5, 0)
    );

    setFeedback(
      `⚠ Security Failure\nPassword Cracked In: ${crackTime}`
    );
  }

  setTimeout(() => {

    setFeedback("");

    setUserPassword("");

    if (
      currentIndex >=
      characters.length - 1
    ) {

      setGameOver(true);

    } else {

      setCurrentIndex((prev) =>
        prev + 1
      );
    }

  }, 2500);
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

    if (score >= 90)
      return "🏆 Password Guardian";

    if (score >= 60)
      return "🛡 Security Defender";

    if (score >= 30)
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
            radial-gradient(circle at top,#081225 0%,#020617 60%,#000 100%);

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

        .character-card{

          max-width:700px;

          margin:40px auto;

          background:#111827;

          border-radius:28px;

          padding:32px;

          border:1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35);
        }

        .character-title{

          font-size:2rem;

          font-weight:800;

          margin-bottom:24px;

          color:#38B6FF;
        }

        .character-info{

          line-height:2;

          margin-bottom:24px;

          font-size:1.08rem;

          color:white;
        }

        .instruction-box{

          margin-bottom:18px;

          color:#cbd5e1;

          line-height:1.7;
        }

        .password-input{

          width:100%;

          padding:16px;

          border:none;

          border-radius:16px;

          background:#1e293b;

          color:white;

          font-size:1rem;

          margin-bottom:20px;

          outline:none;
        }

        .live-analysis{

          line-height:2;

          margin-bottom:24px;

          font-size:1.05rem;
        }

        .strength{
          color:#22c55e;
          font-weight:700;
        }

        .crack{
          color:#f87171;
          font-weight:700;
        }

        .suggestions{

          margin-top:18px;

          background:#0f172a;

          padding:16px;

          border-radius:16px;

          border:1px solid rgba(255,255,255,0.08);
        }

        .suggestion-title{

          font-weight:700;

          margin-bottom:10px;

          color:#38B6FF;
        }

        .suggestion{

          margin-bottom:8px;

          color:#cbd5e1;
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

  text-align:center;

  margin-top:24px;

  font-size:1.15rem;

  font-weight:700;

  white-space:pre-line;

  line-height:1.8;

  background:#0f172a;

  padding:18px;

  border-radius:16px;

  border:1px solid rgba(255,255,255,0.08);
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

        @media(max-width:700px){

          .character-card{
            padding:22px;
          }

          .title{
            font-size:1.9rem;
          }

        }

      `}</style>

      <div className="container">

        {/* TOPBAR */}
        <div className="topbar">

          <div>
            <div className="title">
              🔐 PASSWORD FORGE
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
              👤 {currentIndex + 1}/{characters.length}
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
          Create a secure password for each character using strong password practices.
        </div>

        {/* CHARACTER CARD */}
        {!gameOver && (

          <div className="character-card">

            <div className="character-title">
              👤 Character Profile
            </div>

          <div className="character-info">

  <p>
    <strong>Name:</strong>
    {" "}
    {currentCharacter.name}
  </p>

  <p>
    <strong>Age:</strong>
    {" "}
    {currentCharacter.age}
  </p>

  <p>
    <strong>Hobby:</strong>
    {" "}
    {currentCharacter.hobby}
  </p>

  <p>
    <strong>Pet:</strong>
    {" "}
    {currentCharacter.pet}
  </p>

  <p>
    <strong>Birth Year:</strong>
    {" "}
    {currentCharacter.birthYear}
  </p>

  <p>
    <strong>Favorite Color:</strong>
    {" "}
    {currentCharacter.favoriteColor}
  </p>

  <p>
    <strong>Father Name:</strong>
    {" "}
    {currentCharacter.fatherName}
  </p>

  <p>
    <strong>Mother Name:</strong>
    {" "}
    {currentCharacter.motherName}
  </p>

  <p>
    <strong>Favorite Movie:</strong>
    {" "}
    {currentCharacter.favoriteMovie}
  </p>


  <p>
    <strong>City:</strong>
    {" "}
    {currentCharacter.city}
  </p>

</div>

            <div className="instruction-box">

              Create a strong password without directly using obvious personal details.

            </div>

            <input
              type="text"
              value={userPassword}
              onChange={(e) =>
                setUserPassword(
                  e.target.value
                )
              }
              placeholder="Create password..."
              className="password-input"
            />

          

            {/* SUGGESTIONS */}
            {userPassword && (

              <div className="suggestions">

                <div className="suggestion-title">
                  Suggestions
                </div>

                {getFeedback(userPassword)
                  .map((item, index) => (

                    <div
                      key={index}
                      className="suggestion"
                    >
                      • {item}
                    </div>

                  ))}

              </div>

            )}

            <br />

            <button
              className="submit-btn"
              onClick={submitPassword}
            >
              🔐 Submit Password
            </button>

            {feedback && (

              <div className="feedback">
                {feedback}
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

                Strong passwords should:
                use symbols, numbers,
                uppercase letters, and
                long unpredictable patterns.
                Avoid personal information.

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