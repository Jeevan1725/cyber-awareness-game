import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBook, FaArrowLeft, FaShieldAlt, FaLightbulb, FaBrain, FaExclamationTriangle, FaRobot, FaYoutube } from "react-icons/fa";

const sections = [
  {
    title: "Basic Cyberattacks",
    icon: "🛡️",
    color: "#00E5A0",
    glow: "rgba(0,229,160,0.25)",
    topics: [
      { name: "Phishing (Email / SMS / WhatsApp)", explanation: "Phishing attacks use fake emails or messages that appear to come from trusted sources such as banks or companies. These messages contain malicious links that redirect victims to fake websites. Victims unknowingly enter passwords or banking information. Attackers then use the stolen information for fraud.", example: "An email claims your bank account is locked and asks you to verify your login details.", videoUrl: "https://www.youtube.com/embed/BnmneAjVrM4" },
      { name: "Urgency Trick", explanation: "Attackers create panic or urgency to force victims to act quickly. Messages often warn about account suspension or parcel cancellation. Because of the pressure victims do not verify the information. This leads to quick payments or sharing sensitive data.", example: "A message says your parcel will be returned unless you pay immediately." },
      { name: "Authority Pressure Scam", explanation: "Fraudsters pretend to be government officials, police officers, or tax authorities. They threaten victims with legal action if they do not follow instructions. The fear created by authority forces victims to comply quickly.", example: "A caller claims to be from the tax department demanding urgent payment." },
      { name: "Impersonation Scam", explanation: "In impersonation scams attackers pretend to be trusted individuals such as bank staff or company employees. They contact victims through phone calls or messages. Victims believe the person is genuine and follow instructions.", example: "Someone pretends to be your bank manager asking for OTP verification.", videoUrl: "https://www.youtube.com/embed/OgXHUnRAwiQ" },
      { name: "Fake Payment Screenshot Scam", explanation: "Attackers create edited screenshots showing fake payment confirmations. Victims believe the screenshot and deliver products or services. However the payment never actually happened. This scam is common in online marketplaces.", example: "A buyer sends a fake UPI screenshot claiming payment was completed." },
      { name: "Online Marketplace Scam", explanation: "Fraudsters exploit online buying and selling platforms to trick users. They may send fake payment confirmations or request advance payments. Victims either lose money or deliver products without receiving payment.", example: "A buyer sends a fake QR code claiming payment was sent." },
      { name: "Pretexting", explanation: "Pretexting is a social engineering attack where criminals create a fake story to obtain sensitive information. They may pretend to be bank staff or technical support. Victims believe the scenario and provide personal data.", example: "Someone claims to update bank records and asks for card details.", videoUrl: "https://www.youtube.com/embed/LZLuLBrPNVU" },
      { name: "Password Security", explanation: "Password security means protecting accounts with strong and unique passwords. Weak passwords can be guessed or cracked easily. Using letters, numbers, and symbols improves password strength. Two-factor authentication adds an extra layer of protection.", example: "Using a strong password like S@fe#Pass2026.", videoUrl: "https://www.youtube.com/embed/BoyeFozmAXk" },
      { name: "Quid Pro Quo", explanation: "Attackers promise rewards or benefits in exchange for sensitive information. Victims may be offered gifts or technical support. In return they are asked for passwords or OTPs. Once shared attackers misuse the information.", example: "A scammer promises a gift card if you share your OTP.", videoUrl: "https://www.youtube.com/embed/uWH36CSr2pY" },
      { name: "Shoulder Surfing", explanation: "Shoulder surfing occurs when attackers watch someone entering passwords or PIN numbers. This often happens in public places like ATMs or cafés. Attackers memorize the information. Later they use it to access accounts.", example: "Someone watches you entering your ATM PIN.", videoUrl: "https://www.youtube.com/embed/BkjE8dzhZKw" },
      { name: "Dumpster Diving", explanation: "Dumpster diving involves searching through discarded documents. Attackers look for sensitive information such as bank statements or login credentials. These details can be used for identity theft.", example: "Old bank statements found in trash are used for fraud." },
      { name: "Common Password Attack", explanation: "Attackers try commonly used passwords to break into accounts. Automated tools allow them to test thousands of combinations quickly. Weak passwords make accounts easy targets. Strong unique passwords reduce this risk.", example: "Passwords like '123456' are easily cracked." },
      { name: "Fake Investment / Double Money Scam", explanation: "Fraudsters promise extremely high profits to attract victims. They create fake investment platforms that appear legitimate. Victims invest money expecting quick returns. Eventually the scammers disappear with the funds.", example: "A message promises to double your investment in 24 hours." },
      { name: "Vishing (Voice Phishing)", explanation: "Vishing is phishing conducted through voice calls. Attackers pretend to be bank representatives or service agents. They request confidential information such as OTPs or passwords.", example: "A caller claims to be from your bank asking for OTP verification." },
      { name: "Physical Device Theft", explanation: "Physical device theft occurs when an unauthorized person steals a device such as a laptop or smartphone. This can lead to data loss, identity theft, and financial fraud.", example: "A thief steals your laptop from a public place." },
    ]
  },
  {
    title: "Intermediate & Advanced Cyberattacks",
    icon: "⚡",
    color: "#38B6FF",
    glow: "rgba(56,182,255,0.25)",
    topics: [
      { name: "UPI Collect Request Scam", explanation: "Attackers send a fake UPI collect request that looks like a payment confirmation. Victims think they are receiving money and approve the request. Instead of receiving funds, the approval transfers money to the attacker.", example: "A collect request appears in the payment app claiming to confirm a transaction." },
      { name: "QR Code Scam (Quishing)", explanation: "Attackers create malicious QR codes that redirect users to fake websites. These websites steal login credentials or banking details. QR codes may appear on posters, emails, or messages.", example: "A QR code claiming to offer a discount redirects to a fake payment page." },
      { name: "Customer Care Impersonation Scam", explanation: "Fraudsters pretend to be customer support agents from banks or companies. They contact victims claiming there is a problem with the account. Victims are asked to share OTPs or install apps for help.", example: "A scammer claims to fix a bank issue and asks for OTP verification." },
      { name: "Screen Sharing App Scam", explanation: "Attackers convince victims to install remote access or screen-sharing apps. Once installed, attackers can view and control the device. This allows them to access banking apps and perform transactions.", example: "A fraudster asks you to install a screen sharing app to solve a banking problem." },
      { name: "KYC Update Scam", explanation: "Victims receive messages claiming their KYC verification must be updated urgently. The message contains a link to a fake banking website. Victims enter login credentials believing it is legitimate.", example: "A message says your bank account will be blocked without KYC update." },
      { name: "UPI ID Spoofing Scam", explanation: "Attackers create UPI IDs that look very similar to legitimate accounts. Victims assume the ID belongs to a trusted person or company. Even a small spelling difference can redirect payment to the attacker.", example: "A fake UPI ID looks like an official company account." },
      { name: "Malvertising", explanation: "Malvertising uses malicious advertisements to spread malware or redirect users to scam websites. These ads may appear on legitimate websites. Clicking them installs malicious software silently.", example: "Clicking a fake software update advertisement installs malware." },
      { name: "Evil Twin Wi-Fi", explanation: "Attackers create fake Wi-Fi networks that appear identical to legitimate networks. Victims connect believing the network is safe. Once connected attackers can monitor internet activity.", example: "Connecting to a fake 'Free Airport WiFi' network." },
      { name: "Tailgating / Piggybacking", explanation: "Tailgating occurs when an unauthorized person follows someone into a restricted area. This allows attackers to bypass physical security systems. Once inside they may access confidential information or systems.", example: "Someone enters a secure office by following an employee." },
      { name: "Keylogger", explanation: "A keylogger is malware that records every keystroke typed on a device. Attackers secretly install it through malicious software. It captures passwords, banking information, and personal messages.", example: "A malicious program records login credentials." },
      { name: "Credential Stuffing", explanation: "Credential stuffing uses stolen username and password combinations from previous data breaches. Attackers try these credentials on different websites. If users reuse passwords across sites, multiple accounts may be compromised.", example: "A leaked password is used to access social media accounts." },
      { name: "Leaked Password List Attack", explanation: "Hackers use databases of leaked passwords from previous breaches. These lists contain thousands of email-password combinations. Attackers attempt to log in to multiple services using these credentials.", example: "A password leaked from one site is used to access other accounts." },
      { name: "Bot Login Attack", explanation: "Automated bots attempt thousands of login attempts within seconds. They try different password combinations rapidly. If the correct password is found attackers gain access.", example: "Bots repeatedly attempt to log into an online account." },
      { name: "Malicious APK / Fake App", explanation: "Fake mobile applications are designed to look like legitimate apps. Once installed they secretly collect sensitive data. Attackers may capture OTPs, passwords, or banking details.", example: "A fake banking app steals login credentials." },
      { name: "Banking Trojan", explanation: "Banking trojans are malware designed specifically to steal financial information. They infect devices through fake apps or downloads. The trojan monitors banking activity and captures credentials.", example: "Malware records banking transactions and passwords." },
      { name: "Ransomware", explanation: "Ransomware encrypts files or locks devices completely. Victims cannot access their data until a ransom is paid. Attackers demand payment in cryptocurrency.", example: "A message demands payment to unlock encrypted files." },
      { name: "SIM Swap Scam", explanation: "Attackers trick telecom providers into transferring the victim's phone number to another SIM card. Once transferred attackers receive OTP messages. They use these OTPs to access banking or financial accounts.", example: "The victim's phone stops receiving calls while attacker receives OTPs." },
      { name: "Watering Hole Attack", explanation: "Attackers compromise websites frequently visited by a specific group. When victims visit the infected site malware is installed. The malware collects sensitive information.", example: "Visiting a trusted news site installs spyware." },
      { name: "Brute Force Attack", explanation: "A brute force attack attempts every possible password combination. Automated tools test thousands of passwords rapidly. Weak passwords can be cracked easily.", example: "Millions of password combinations are tested automatically." },
      { name: "Account Takeover Attack", explanation: "Attackers gain access to a user account using stolen credentials. Once inside they change the password. This locks the real owner out of the account.", example: "Hackers access your email and reset other accounts." },
      { name: "Social Engineering", explanation: "Social engineering manipulates human psychology instead of technology. Attackers build trust with victims over time. They gather information gradually through communication. Eventually victims reveal sensitive data or provide system access.", example: "Someone posing as a coworker requests confidential information." },
    ]
  },
  {
    title: "AI-Powered Attacks",
    icon: "🤖",
    color: "#BF5FFF",
    glow: "rgba(191,95,255,0.25)",
    topics: [
      { name: "AI Voice Cloning Scam", explanation: "Attackers use artificial intelligence to replicate someone's voice. Victims believe the call is from a trusted person. The attacker requests urgent financial help. Victims send money believing the request is genuine.", example: "A cloned voice asks for emergency money." },
      { name: "AI Deepfake Scam", explanation: "Deepfake technology generates realistic fake images or videos. Attackers impersonate trusted individuals using AI. Victims believe the fake content and trust the message. This technique is often used in financial fraud.", example: "A fake video of a manager requesting money transfer." },
      { name: "Deepfake Video Scam", explanation: "Attackers create manipulated videos showing celebrities or executives promoting scams. The video appears authentic. Victims trust the person shown in the video.", example: "A fake celebrity video promoting an investment scheme." },
      { name: "Fake CEO Scam (AI)", explanation: "Attackers impersonate company executives using AI voice or email spoofing. Employees receive urgent payment instructions. Because the request appears to come from leadership, employees trust it.", example: "An employee receives a payment request from a 'CEO'." },
      { name: "Live Video Deepfake Scam", explanation: "Advanced AI can modify a person's face in real time during video calls. Attackers impersonate trusted individuals. Victims believe the video call is genuine. They follow instructions and transfer money.", example: "A fake video call appears to be from a colleague." },
    ]
  }
];

export default function Knowledge() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showVideo, setShowVideo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }
    setTimeout(() => setMounted(true), 60);
  }, [navigate]);

  const toggleExpand = (key) => setExpanded(prev => prev === key ? null : key);
  const toggleVideo = (key) => setShowVideo(prev => prev === key ? null : key);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        .know-root {
          min-height: 100vh; width: 100vw; overflow-x: hidden;
          background: #f8fafc;
          display: flex; flex-direction: column; align-items: center;
          font-family: 'Outfit', sans-serif; color: #0f172a;
          padding: clamp(1rem,2.5vh,2rem) clamp(1.2rem,3.5vw,2.5rem);
        }

        .know-topbar {
          width: 100%; max-width: 900px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: clamp(1rem,2.5vh,1.8rem); flex-shrink: 0;
          opacity: 0; transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .know-topbar.visible { opacity: 1; transform: translateY(0); }

        .back-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(15,23,42,0.06); border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px; padding: 0.65rem 1.4rem;
          color: #0f172a; font-family: 'Outfit', sans-serif;
          font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .back-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.35); color: #4338ca; }

        .know-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.2rem,2.5vw,1.8rem); font-weight: 800;
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: flex; align-items: center; gap: 0.65rem;
        }

        .helpline {
          width: 100%; max-width: 900px; flex-shrink: 0;
          display: flex; align-items: center; gap: 0.9rem;
          background: rgba(255,255,255,0.95); border: 1px solid rgba(15,23,42,0.06);
          border-radius: 0.9rem; padding: 0.75rem 1rem;
          margin-bottom: clamp(0.8rem,2vh,1.2rem);
          opacity: 0; transition: opacity 0.5s ease 0.1s;
          font-size: 1.12rem;
        }
        .helpline.visible { opacity: 1; }
        .helpline-emoji { font-size: 1.4rem; }
        .helpline-badge {
          background: rgba(79,70,229,0.14); border: 1px solid rgba(79,70,229,0.28);
          border-radius: 6px; padding: 0.28rem 0.7rem;
          font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 700;
          color: #4f46e5; white-space: nowrap;
        }
        .helpline-text { font-size: 1.18rem; color: #4f46e5; font-weight: 700; }
        .helpline-sep { color: rgba(15,23,42,0.55); font-size: 1.12rem; }
        .helpline-link { color: rgba(79,70,229,0.9); text-decoration: none; font-size: 1.12rem; }
        .helpline-link:hover { color: #4f46e5; text-decoration: underline; }

        .know-intro {
          width: 100%; max-width: 900px; flex-shrink: 0;
          font-size: 1.12rem; color: rgba(15,23,42,0.72);
          line-height: 1.9; margin-bottom: clamp(0.9rem,2vh,1.4rem);
          opacity: 0; transition: opacity 0.5s ease 0.15s;
        }
        .know-intro.visible { opacity: 1; }

        .section-tabs {
          width: 100%; max-width: 900px; flex-shrink: 0;
          display: flex; gap: 0.6rem; flex-wrap: wrap;
          margin-bottom: clamp(0.75rem,1.8vh,1.2rem);
          opacity: 0; transition: opacity 0.5s ease 0.2s;
        }
        .section-tabs.visible { opacity: 1; }

        .tab-btn {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.65rem 1.1rem; border-radius: 100px; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 600;
          border: 1px solid rgba(15,23,42,0.06); transition: all 0.2s;
          white-space: nowrap;
          background: rgba(255,255,255,0.9);
          color: rgba(15,23,42,0.75);
        }

        .know-list {
          width: 100%; max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-bottom: 3rem;
        }

        .topic-card {
          border-radius: 1.2rem; overflow: hidden;
          border: 1px solid rgba(15,23,42,0.1);
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
          opacity: 0; animation: fadeUp 0.35s ease forwards;
          box-shadow: 0 16px 32px rgba(15,23,42,0.05);
        }
        @keyframes fadeUp { to { opacity: 1; } }

        .topic-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.85rem 1.1rem;
          cursor: pointer; gap: 0.75rem;
        }

        .topic-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem; font-weight: 700; color: #0f172a;
          flex: 1;
        }

        .topic-chevron {
          font-size: 0.85rem; color: rgba(15,23,42,0.45);
          transition: transform 0.25s ease; flex-shrink: 0;
        }
        .topic-card.open .topic-chevron { transform: rotate(180deg); }

        .topic-body {
          max-height: 0; overflow: hidden;
          padding: 0 1rem;
          transition: max-height 0.35s ease, padding 0.3s ease;
        }
        .topic-card.open .topic-body {
          max-height: 900px;
          overflow-y: auto;
          padding: 0 1rem 1rem;
        }

        .topic-divider { height: 1px; background: rgba(15,23,42,0.08); margin-bottom: 0.9rem; }

        .topic-row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
        .topic-row:last-child { margin-bottom: 0; }
        .topic-row-label {
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; margin-bottom: 0.24rem;
          color: #475569;
        }
        .topic-row-text { font-size: 1rem; color: rgba(15,23,42,0.78); line-height: 1.8; }

        .video-section {
          margin-top: 1rem; 
          border-radius: 0.8rem;
          background: rgba(255,0,0,0.05); 
          border: 1px solid rgba(255,0,0,0.15);
          overflow: hidden;
        }

        .video-toggle {
          width: 100%;
          padding: 0.8rem;
          display: flex; align-items: center; gap: 0.75rem;
          background: none; border: none;
          cursor: pointer;
          color: #dc2626; 
          font-weight: 600;
          font-size: 0.95rem;
          font-family: 'Outfit', sans-serif;
          transition: all 0.2s;
        }

        .video-toggle:hover {
          background: rgba(220,38,38,0.05);
        }

        .video-iframe-container {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .video-iframe-container.open {
          max-height: 400px;
        }

        .video-iframe-container iframe {
          width: 100%;
          height: 315px;
          border: none;
          display: block;
        }
      `}</style>

      <div className="know-root">
        {/* Top bar */}
        <div className={`know-topbar ${mounted ? "visible" : ""}`}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft size={11} /> Dashboard
          </button>
          <div className="know-title">
            <FaBook size={15} /> Knowledge Center
          </div>
          <div style={{ width: 120 }} />
        </div>

        {/* Helpline */}
        <div className={`helpline ${mounted ? "visible" : ""}`}>
          <span className="helpline-emoji">📞</span>
          <span className="helpline-badge">1930</span>
          <span className="helpline-text">Cyber Crime Helpline</span>
          <span className="helpline-sep">|</span>
          <a className="helpline-link" href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">cybercrime.gov.in</a>
        </div>

        {/* Intro */}
        <div className={`know-intro ${mounted ? "visible" : ""}`}>
          A cyberattack is a malicious attempt to gain unauthorized access to systems, devices, or personal information through digital means. Understanding cyber threats helps users recognize suspicious activity and protect their digital life.
        </div>

        {/* Section tabs */}
        <div className={`section-tabs ${mounted ? "visible" : ""}`}>
          {sections.map((s, i) => (
            <button
              key={i}
              className="tab-btn"
              onClick={() => { setActiveSection(i); setExpanded(null); setShowVideo(null); }}
              style={{
                background: activeSection === i ? `${s.color}20` : undefined,
                borderColor: activeSection === i ? `${s.color}55` : undefined,
                color: activeSection === i ? s.color : 'rgba(15,23,42,0.7)',
                boxShadow: activeSection === i ? `0 6px 20px ${s.glow}` : 'none',
                transform: activeSection === i ? 'translateY(-2px)' : 'none'
              }}
            >
              <span>{s.icon}</span> {s.title}
            </button>
          ))}
        </div>

        {/* Topic list */}
        <div className="know-list">
          {sections[activeSection].topics.map((topic, i) => {
            const key = `${activeSection}-${i}`;
            const isOpen = expanded === key;
            const isVideoOpen = showVideo === key;
            const col = sections[activeSection].color;
            return (
              <div
                key={key}
                className={`topic-card ${isOpen ? "open" : ""}`}
                style={{
                  borderColor: isOpen ? `${col}44` : undefined,
                  boxShadow: isOpen ? `0 4px 18px ${sections[activeSection].glow}` : undefined,
                  animationDelay: `${i * 30}ms`,
                }}
              >
                <div className="topic-header" onClick={() => toggleExpand(key)}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: col, flexShrink: 0, boxShadow: `0 0 6px ${col}` }} />
                  <div className="topic-name">{topic.name}</div>
                  <div className="topic-chevron">▼</div>
                </div>
                <div className="topic-body">
                  <div className="topic-divider" />
                  <div className="topic-row">
                    <FaBrain size={11} style={{ color: col, marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <div className="topic-row-label" style={{ color: `${col}99` }}>Explanation</div>
                      <div className="topic-row-text">{topic.explanation}</div>
                    </div>
                  </div>
                  <div className="topic-row">
                    <FaLightbulb size={11} style={{ color: "#FFD700", marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <div className="topic-row-label" style={{ color: "rgba(255,215,0,0.65)" }}>Example</div>
                      <div className="topic-row-text">{topic.example}</div>
                    </div>
                  </div>
                  {topic.videoUrl && (
                    <div className="video-section">
                      <button 
                        className="video-toggle" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideo(key);
                        }}
                      >
                        <FaYoutube size={18} />
                        {isVideoOpen ? "Close Video" : "Watch Video"}
                      </button>
                      <div className={`video-iframe-container ${isVideoOpen ? "open" : ""}`}>
                        <iframe
                          src={topic.videoUrl}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}