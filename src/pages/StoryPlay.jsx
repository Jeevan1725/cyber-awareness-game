import { useParams, useNavigate, useLocation } from "react-router-dom";
import { stories } from "../data/stories";
import { useState, useEffect, useRef } from "react";


export default function StoryPlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) navigate("/login");
  }, [navigate]);

  const story = stories.find(s => s.id === Number(id));
  if (!story) return <div style={{ color: "#fff", padding: 40 }}>Story not found</div>;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(50);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [previousAnswer, setPreviousAnswer] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Map());
  const [reviewMode, setReviewMode] = useState(false);
  const [language,setLanguage]=useState("en");
  const [darkTheme, setDarkTheme] = useState(false);
  const audioRef = useRef(null);
  const answerAudioRef = useRef(null);
  const sceneChangeAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const safeIndex = Math.min(sceneIndex, story.scenes.length - 1);
  const scene = story.scenes?.[safeIndex] ?? {};
  const frames = scene.characterFrames || [];
  const isAnimationScene = frames.length > 0;
  const hasQuestion = !!scene.question;

  /* ── Progress ── */
  const saveProgress = async (sceneIdx) => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser._id) {
      await fetch(`${window.API_BASE_URL}/api/auth/user/${localUser._id}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: id, sceneIndex: sceneIdx })
      });
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (localUser._id) {
        const userRes = await fetch(`${window.API_BASE_URL}/api/auth/user/${localUser._id}`);
        const user = await userRes.json();
        const progress = user.storyProgress?.[id] || 0;
        if (location.state?.resumeScene !== undefined) {
  setSceneIndex(location.state.resumeScene);
  return;
}

setSceneIndex(progress);
        const answersRes = await fetch(`${window.API_BASE_URL}/api/answer/user/${localUser._id}/story/${id}`);
        const answers = await answersRes.json();
        const map = new Map();
        answers.forEach(ans => map.set(ans.sceneId, ans.selected));
        setUserAnswers(map);
      }
    };
    loadProgress();
  }, [id]);

  useEffect(() => {
    if (userAnswers.has(scene.sceneId)) {
      const ans = userAnswers.get(scene.sceneId);
      setPreviousAnswer({ selected: ans, correct: scene.question?.correct === ans });
      setAnswered(true);
      setIsCorrect(scene.question?.correct === ans);
    } else {
      setPreviousAnswer(null);
      setAnswered(false);
      setIsCorrect(null);
    }
  }, [sceneIndex, userAnswers, scene.sceneId, scene.question]);

  /* ── Typewriter ── */
  useEffect(() => {
    if (!scene.text?.[language]) return;
    if (paused) return;
    const typing = setInterval(() => {
      setTypingIndex(prev => {
        const next = prev + 1;
        if(next<=scene.text[language].length) { setDisplayText(scene.text[language].slice(0,next)); return next; }
        clearInterval(typing); return prev;
      });
    }, 50);
    return () => clearInterval(typing);
  },[sceneIndex,paused,scene.text,language]);

  /* ── Walk animation ── */
  useEffect(() => {
    if (paused || frames.length === 0) return;
    const interval = setInterval(() => setFrame(prev => (prev + 1) % frames.length),
      scene.sceneId === "hostel_walk" ? 110 : 160);
    return () => clearInterval(interval);
  }, [frames.length, paused]);

  /* ── Character move ── */
  useEffect(() => {
    if (paused || frames.length === 0) return;
    const move = setInterval(() => {
      setPosition(prev => {
        if (scene.sceneId === "hostel_walk") {
          if (prev < window.innerWidth * 0.65) return prev + window.innerWidth * 0.0025;
          nextScene(); return prev;
        }
        if (prev < window.innerWidth - 200) return prev + 6;
        nextScene(); return prev;
      });
    }, 60);
    return () => clearInterval(move);
  }, [paused, frames.length]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (paused) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.paused && audioRef.current.currentTime > 0 && audioRef.current.currentTime < audioRef.current.duration) {
        audioRef.current.play().catch(error => console.error("Audio resume failed:", error));
      }
    }
    if (answerAudioRef.current) {
      if (paused) answerAudioRef.current.pause();
    }
  }, [paused]);

  /* ── Next / Prev ── */
  function nextScene() {
    if (scene.question && !answered && !reviewMode) return;
    // stop any ongoing voice/answer audio before scene change
    if (audioRef.current) {
      try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch (e) { /* ignore */ }
    }
    if (answerAudioRef.current) {
      try { answerAudioRef.current.pause(); answerAudioRef.current.currentTime = 0; } catch (e) { /* ignore */ }
    }
    playSceneChangeSound();
    // Dynamic activity launcher
if (scene.activity && !reviewMode) {

  if (scene.activity && !reviewMode) {

  const activityRoutes = {
    "link-trap": "/link-trap",
    "scam-chat": "/scam-chat",
    "apk-inspector": "/apk-inspector",
    "scam-call": "/scam-call",
    "password-rush": "/password-rush",
    "privacy-detective": "/privacy-detective",
    "cyber-bomb": "/cyber-bomb"
  };

  const route =
    activityRoutes[scene.activity.type];

  if (route) {

    navigate(route, {
      state: {
        storyId: id,
        returnScene: sceneIndex + 1,
        activityId: scene.activity.id
      }
    });

    return;
  }
}


}
    setSceneIndex(prev => {
      if (prev >= story.scenes.length - 1) return prev;
      const newIndex = prev + 1;
      saveProgress(newIndex);
      return newIndex;
    });
    setPosition(50); setFrame(0); setTypingIndex(0); setDisplayText("");
  }

  function prevScene() {
    if (sceneIndex > 0) {
      // stop any ongoing voice/answer audio before scene change
      if (audioRef.current) {
        try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch (e) { /* ignore */ }
      }
      if (answerAudioRef.current) {
        try { answerAudioRef.current.pause(); answerAudioRef.current.currentTime = 0; } catch (e) { /* ignore */ }
      }
      playSceneChangeSound();
      setFade(false);
      setTimeout(() => {
        setSceneIndex(prev => prev - 1);
        setPosition(50); setFrame(0); setTypingIndex(0); setDisplayText(""); setFade(true);
      }, 300);
    }
  }

  const playAnswerSound = (correct) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (answerAudioRef.current) {
      answerAudioRef.current.pause();
      answerAudioRef.current.currentTime = 0;
    }
    const audio = new Audio(correct ? "/sounds/correct.mp3" : "/sounds/wrong.mp3");
    answerAudioRef.current = audio;
    audio.play().catch(error => console.error("Answer sound play failed:", error));
  };

  const playSceneChangeSound = () => {
    if (sceneChangeAudioRef.current) {
      sceneChangeAudioRef.current.pause();
      sceneChangeAudioRef.current.currentTime = 0;
    }
    const audio = new Audio("/sounds/scene_change.wav");
    sceneChangeAudioRef.current = audio;
    audio.play().catch(error => console.error("Scene change sound failed:", error));
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.pause();
      clickAudioRef.current.currentTime = 0;
    }
    const audio = new Audio("/sounds/click.wav");
    clickAudioRef.current = audio;
    audio.play().catch(error => console.error("Click sound play failed:", error));
  };

  /* ── Answer ── */
  async function handleAnswer(choice) {
    if (previousAnswer || reviewMode) return;
    const correct = scene.question.correct;
    const result = choice === correct;
    setAnswered(true); setIsCorrect(result);
    playAnswerSound(result);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: id, sceneId: scene.sceneId, selected: choice, correct: result, userId: user._id || null, topic: scene.question?.topic })
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      setUserAnswers(prev => new Map(prev).set(scene.sceneId, choice));
      setPreviousAnswer({ selected: choice, correct: result });
      setTimeout(() => { setAnswered(false); setIsCorrect(null); nextScene(); }, 5000);
    } catch (error) {
      console.error("Failed to save answer:", error);
      setAnswered(false); setIsCorrect(null);
      alert("Failed to save answer. Please try again.");
    }
  }




const handleSpeak = async () => {

try{

if(audioRef.current){

audioRef.current.pause();

audioRef.current.currentTime = 0;

}

const speakText =
scene.text?.[language] || "";

const response = await fetch(
`${window.API_BASE_URL}/speak`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:speakText,
language
})
}
);

if(!response.ok){
console.log("TTS Failed");
return;
}
const blob = await response.blob();
const audioUrl =
URL.createObjectURL(blob);

const audio =
new Audio(audioUrl);

audioRef.current = audio;
audio.play();
}
catch(error){
console.log(error);
}
};






  const progress = ((sceneIndex + 1) / story.scenes.length) * 100;

  const textLength = scene.text?.[language]?.length || 0;
  const questionVisible = hasQuestion && (!scene.text?.[language] || typingIndex >= textLength);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { animation: blink 1s step-end infinite; color: #BF5FFF; }

        /* ── Controls bar ── */
        .ctrl-bar {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 1rem;
          background: ${darkTheme ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)'};
          border-bottom: 1px solid ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};
          z-index: 20; gap: 0.5rem;
        }

        .ctrl-left { display: flex; align-items: center; gap: 0.5rem; }
        .ctrl-right { display: flex; align-items: center; gap: 0.5rem; }

        .ctrl-btn {
          display: flex; align-items: center; gap: 0.35rem;
          background: ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.05)'}; 
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'};
          border-radius: 100px; padding: 0.5rem 1rem;
          color: ${darkTheme ? '#e5e7eb' : '#1f2937'}; font-family: 'Outfit', sans-serif;
          font-size: 0.92rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .ctrl-btn:hover:not(:disabled) { background: rgba(79,70,229,0.14); border-color: rgba(79,70,229,0.35); color: #4f46e5; }
        .ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .ctrl-btn.pause { border-color: rgba(59,130,246,0.35); color: #2563eb; }
        .ctrl-btn.next-btn-active { background: rgba(79,70,229,0.14); border-color: rgba(79,70,229,0.35); color: #4f46e5; }

        .theme-btn {
          display: flex; align-items: center; justify-content: center;
          background: ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)'}; 
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'};
          border-radius: 8px; padding: 0.5rem 0.6rem;
          color: ${darkTheme ? '#fbbf24' : '#f59e0b'}; font-size: 1rem; cursor: pointer; 
          transition: all 0.2s;
        }
        .theme-btn:hover { background: ${darkTheme ? 'rgba(251,191,36,0.15)' : 'rgba(245,158,11,0.15)'}; }

        .language-select{
background: ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)'};
border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'};
color: ${darkTheme ? '#e5e7eb' : '#1f2937'};
padding:0.45rem 0.8rem;
border-radius:8px;
font-family:'Outfit',sans-serif;
font-size:0.9rem;
outline:none;
cursor:pointer;
}

.language-select option{
background: ${darkTheme ? '#1f2937' : '#ffffff'};
color: ${darkTheme ? '#e5e7eb' : '#1f2937'};
}


        /* ── Progress bar ── */
        .progress-bar-wrap {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 25;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #BF5FFF, #38B6FF);
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(191,95,255,0.6);
        }

        /* ── Scene counter ── */
        .scene-counter {
          position: absolute; bottom: 1rem; left: 1rem;
          background: ${darkTheme ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)'}; 
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};
          color: ${darkTheme ? '#e5e7eb' : '#1f2937'}; padding: 0.35rem 0.75rem;
          border-radius: 100px; font-family: 'Outfit', sans-serif;
          font-size: 0.78rem; font-weight: 600; z-index: 20;
        }

        /* ── Story text box ── */
        .story-textbox {
          font-family: 'Outfit', sans-serif;
          background: ${darkTheme ? '#1f2937' : '#f8fafc'};
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};
          border-radius: 12px;
          line-height: 1.65;
          box-shadow: 0 8px 24px ${darkTheme ? 'rgba(0,0,0,0.3)' : 'rgba(15,23,42,0.08)'};
          color: ${darkTheme ? '#e5e7eb' : '#1f2937'};
        }

        /* ── Question panel ── */
        .question-panel {
          position: absolute; top: 25%; right: 0;
          width: 35%; min-width: 340px; z-index: 15;
          background: ${darkTheme ? '#111827' : '#ffffff'};
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};
          border-radius: 0 0 0 16px;
          padding: 1.2rem;
          box-shadow: -8px 8px 32px ${darkTheme ? 'rgba(0,0,0,0.3)' : 'rgba(15,23,42,0.08)'};
          opacity: 0; transform: translateY(8px); transition: opacity 600ms ease-out, transform 600ms ease-out; pointer-events: none;
        }

        .question-panel.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .question-panel.hidden { opacity: 0; transform: translateY(8px); pointer-events: none; }

        .question-title {
          font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
          color: ${darkTheme ? '#e5e7eb' : '#1f2937'}; margin-bottom: 0.8rem; line-height: 1.4;
        }

        .option-btn {
          display: block; width: 100%; margin-top: 0.5rem;
          padding: 0.75rem 1rem; border-radius: 10px;
          font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; text-align: left;
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)'};
          background: ${darkTheme ? '#1f2937' : '#f8fafc'}; 
          color: ${darkTheme ? '#e5e7eb' : '#1f2937'};
        }
        .option-btn:hover:not(:disabled) { background: rgba(79,70,229,0.12); border-color: rgba(79,70,229,0.3); color: ${darkTheme ? '#e5e7eb' : '#1f2937'}; }
        .option-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        .option-btn.correct { 
          background: rgba(16,185,129,0.12); 
          border-color: #10B981; 
          color: ${darkTheme ? '#10B981' : '#064E3B'}; 
        }
        .option-btn.wrong { 
          background: rgba(239,68,68,0.15); 
          border-color: #ef4444; 
          color: ${darkTheme ? '#FF6B9D' : '#0f172a'}; 
        }

        .answer-result {
          margin-top: 0.9rem; padding: 0.75rem;
          border-radius: 10px; font-family: 'Outfit', sans-serif;
          font-size: 0.95rem; line-height: 1.5;
        }
        .answer-result.correct { 
          background: ${darkTheme ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.08)'}; 
          border: 1px solid rgba(16,185,129,0.25); 
          color: ${darkTheme ? '#10B981' : '#065F46'}; 
        }
        .answer-result.wrong { 
          background: ${darkTheme ? 'rgba(255,77,109,0.15)' : 'rgba(255,77,109,0.1)'}; 
          border: 1px solid rgba(255,77,109,0.3); 
          color: ${darkTheme ? '#FF6B9D' : '#FF4D6D'}; 
        }
        .answer-result .explanation { 
          color: ${darkTheme ? 'rgba(229,231,235,0.85)' : 'rgba(15,23,42,0.72)'}; 
          margin-top: 0.4rem; font-size: 0.82rem; 
        }
        .answer-result.correct .explanation { 
          color: ${darkTheme ? 'rgba(229,231,235,0.85)' : 'rgba(15,23,42,0.72)'}; 
        }
        .answer-result.wrong .explanation { 
          color: ${darkTheme ? 'rgba(229,231,235,0.85)' : 'rgba(15,23,42,0.72)'}; 
        }

        /* ── Completion overlay ── */
        .complete-overlay {
          position: absolute; inset: 0; z-index: 30;
          background: ${darkTheme ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)'};
          display: flex; align-items: center; justify-content: center;
        }
        .complete-card {
          background: ${darkTheme ? '#111827' : '#ffffff'};
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};
          border-radius: 1.5rem; padding: 2.5rem;
          text-align: center; max-width: 480px; width: 90%;
          box-shadow: 0 24px 60px ${darkTheme ? 'rgba(0,0,0,0.3)' : 'rgba(15,23,42,0.12)'};
          position: relative;
        }
        .complete-card::before {
          content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 1.5px;
          background: linear-gradient(90deg, transparent, #BF5FFF, #38B6FF, transparent);
        }
        .complete-title {
          font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 0.5rem;
        }
        .complete-sub {
          font-size: 0.95rem; color: ${darkTheme ? 'rgba(229,231,235,0.7)' : 'rgba(15,23,42,0.7)'}; margin-bottom: 1.5rem; line-height: 1.6;
        }
        .complete-btn {
          display: block; width: 100%; padding: 0.75rem 1.2rem;
          border: none; border-radius: 0.75rem; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 700;
          margin-top: 0.6rem; transition: all 0.22s ease;
        }
        .complete-btn.primary {
          background: linear-gradient(135deg, #BF5FFF, #38B6FF); color: #fff;
          box-shadow: 0 4px 18px rgba(191,95,255,0.35);
        }
        .complete-btn.secondary {
          background: ${darkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.05)'}; 
          color: ${darkTheme ? 'rgba(229,231,235,0.85)' : 'rgba(15,23,42,0.85)'};
          border: 1px solid ${darkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'};
        }
        .complete-btn.green {
          background: linear-gradient(135deg, #10b981, #14b8a6); color: #021a11;
          box-shadow: 0 4px 18px rgba(16,185,129,0.25);
        }
        .complete-btn:hover { transform: translateY(-2px); }
        .complete-btn.review {
          background: rgba(255,215,0,0.12); color: #FFD700;
          border: 1px solid rgba(255,215,0,0.35);
          box-shadow: 0 4px 14px rgba(255,215,0,0.15);
        }

      `}</style>

      <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden", background: darkTheme ? "#0f172a" : "#ffffff", fontFamily: "Outfit, sans-serif" }}>

        {/* Progress bar */}
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }} />
        </div>

        {/* Background */}
        {scene.background && (
          Array.isArray(scene.background) ? (
            <div style={{ position: "absolute", top: 44, left: 0, width: "100%", height: "97%", display: "flex", zIndex: 1 }}>
              <img src={scene.background[0]} alt="left" style={{ width: "50%", height: "100%", objectFit: "cover" }} />
              <img src={scene.background[1]} alt="right" style={{ width: "50%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : (
            <img src={scene.background} alt="background" style={{
              position: "absolute", top: 0, left: 0,
              width: scene.sceneId === "complete" ? "100%" : (frames.length > 0 ? "100%" : "65%"),
              height: "100%", objectFit: "cover", zIndex: 1
            }} />
          )
        )}

        {/* Animation scene text */}
        {isAnimationScene && scene.text && (
          <div className="story-textbox" style={{ position: "absolute", top: "8%", left: "3%", padding: "14px 18px", maxWidth: "480px", fontSize: "1.4rem", zIndex: 8, color: darkTheme ? "#e5e7eb" : "#1f2937", fontWeight: "700" }}>
            {displayText}<span className="cursor">▌</span>
          </div>
        )}

        {/* Normal story text (right side) */}
        {!isAnimationScene && !Array.isArray(scene.background) && scene.text && (
          <div className="story-textbox" style={{
            position: "absolute",
            top: hasQuestion ? "5.5%" : "50%",
            left: "65%",
            transform: hasQuestion ? "none" : "translateY(-50%)",
            padding: "20px 22px",
            width: hasQuestion ? "34%" : "32%",
            maxWidth: hasQuestion ? "520px" : "480px",
            fontSize: hasQuestion ? "1.2rem" : "1.6rem",
            zIndex: 7,
            color: darkTheme ? "#e5e7eb" : "#1f2937",
            fontWeight: "700"
          }}>
            {displayText}<span className="cursor">▌</span>
          </div>
        )}

        {/* Split scene text */}
        {scene.text && Array.isArray(scene.background) && (
          <div className="story-textbox" style={{
            position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
            padding: "14px 22px", maxWidth: "600px", textAlign: "center", fontSize: "1.5rem", zIndex: 8,
            color: darkTheme ? "#e5e7eb" : "#1f2937", fontWeight: "700"
          }}>
            {displayText}<span className="cursor">▌</span>
          </div>
        )}

        {/* Question panel (show only after story text finishes) */}
        {hasQuestion && (
          <div className={`question-panel ${questionVisible ? "show" : "hidden"}`}>
            <div className="question-title">
{scene.question.q?.[language]}
</div>
            {scene.question?.options?.map((opt,i)=>{
              let cls = "option-btn";
              if (reviewMode) {
                // In review: highlight the previously saved answer
                const saved = userAnswers.get(scene.sceneId);
                if (saved !== undefined) {
                  if (i === saved) cls += saved === scene.question.correct ? " correct" : " wrong";
                  else if (i === scene.question.correct) cls += " correct";
                }
              } else if (previousAnswer) {
                if (previousAnswer.selected === i) cls += previousAnswer.correct ? " correct" : " wrong";
              }
              return (
                <button key={i} className={`${cls} hover-btn`} disabled={answered || !!previousAnswer || reviewMode} onClick={() => handleAnswer(i)}>
                  {opt.text?.[language]}
                </button>
              );
            })}
            {reviewMode && (() => {
              const saved = userAnswers.get(scene.sceneId);
              if (saved === undefined) return null;
              const correct = saved === scene.question.correct;
              return (
                <div className={`answer-result ${correct ? "correct" : "wrong"}`}>
                  <strong>{correct ? "✔ You answered correctly!" : "✖ You answered incorrectly"}</strong>
                  {!correct && <div style={{ marginTop: 4, color: darkTheme ? "rgba(229,231,235,0.72)" : "rgba(15,23,42,0.72)", fontSize: "0.82rem" }}>Correct: {scene.question.options[scene.question.correct].text?.[language]}</div>}
                  <div className="explanation">{scene.question.explanation?.[language]}</div>
                </div>
              );
            })()}
            {!reviewMode && answered && (
              <div className={`answer-result ${isCorrect ? "correct" : "wrong"}`}>
                <strong>{isCorrect ? "✔ Correct!" : "✖ Incorrect"}</strong>
                {!isCorrect && <div style={{ marginTop: 4, color: darkTheme ? "rgba(229,231,235,0.72)" : "rgba(15,23,42,0.72)", fontSize: "0.82rem" }}>Correct: {scene.question.options[scene.question.correct].text?.[language]}</div>}
                <div className="explanation">{scene.question.explanation?.[language]}</div>
              </div>
            )}
          </div>
        )}

        {/* Character */}
        {frames.length > 0 && (
          <div style={{ position: "absolute", bottom: "2vh", left: position + "px", width: "10vw", height: "22vh", zIndex: 4 }}>
            <img src={frames[frame]} alt="character" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}

        {/* Controls bar */}
        <div className="ctrl-bar">
          <div className="ctrl-left">
            <button className="ctrl-btn" onClick={() => { playClickSound(); navigate("/story"); }}>📖 Stories</button>
            <button className="ctrl-btn" onClick={prevScene}>◀ Prev</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "0.82rem", fontWeight: 700, color: darkTheme ? "rgba(229,231,235,0.4)" : "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
              {story.title?.[language]}
            </div>
          </div>

          <div className="ctrl-right">

            <button 
              className="theme-btn" 
              onClick={() => { playClickSound(); setDarkTheme(!darkTheme); }}
              title={darkTheme ? "Light Mode" : "Dark Mode"}
            >
              {darkTheme ? "☀️" : "🌙"}
            </button>

            <select
value={language}
onChange={(e)=>{ playClickSound(); setLanguage(e.target.value); }}
className="language-select"
>
<option value="en">English</option>
<option value="ta">Tamil</option>
<option value="hi">Hindi</option>
</select>

<button
className="ctrl-btn"
onClick={() => { playClickSound(); handleSpeak(); }}
>
🔊 Speak
</button>

            <button className={`ctrl-btn pause`} onClick={() => { playClickSound(); setPaused(!paused); }}>
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button
              className={`ctrl-btn ${!scene.question || answered ? "next-btn-active" : ""}`}
              onClick={nextScene}
              disabled={scene.question && !answered && !reviewMode}
            >
              Next ▶
            </button>
          </div>
        </div>

        {/* Scene counter */}
        <div className="scene-counter">
          <span style={{ color: darkTheme ? "#e5e7eb" : "#1f2937" }}>Scene {Math.min(sceneIndex + 1, story.scenes.length)} / {story.scenes.length}</span>
        </div>

        {/* Completion */}
        {scene.sceneId === "complete" && (
          <div className="complete-overlay">
            <div className="complete-card">
              <img src={scene.background} alt="Congratulations" style={{ width: "100%", maxWidth: 220, borderRadius: 12, marginBottom: "1.2rem" }} />
              <div className="complete-title">🎉 Congratulations!</div>
              <div className="complete-sub">
                You completed <strong style={{ color: "#BF5FFF" }}>"{story.title?.[language]}"</strong>!<br />
                Great job on your cybersecurity journey 🚀
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {stories.find(s => s.id === story.id + 1) && (
                  <button className="complete-btn primary" onClick={() => { playClickSound(); navigate(`/story/${story.id + 1}`); }}>
                    ▶ Next: {stories.find(s=>s.id===story.id+1).title?.[language]}
                  </button>
                )}
                <button className="complete-btn review" onClick={() => { playClickSound(); setReviewMode(true); setSceneIndex(0); setPosition(50); setFrame(0); setTypingIndex(0); setDisplayText(""); setPaused(true); }}>🔍 Review Lesson</button>
                <button className="complete-btn secondary" onClick={() => { playClickSound(); navigate("/story"); }}>📖 Back to Story List</button>
                <button className="complete-btn green" onClick={() => { playClickSound(); navigate("/dashboard"); }}>🏠 Dashboard</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}