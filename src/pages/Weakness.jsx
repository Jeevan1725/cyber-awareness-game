import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaArrowLeft, FaShieldAlt, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";

const attacks = {
  "Phishing (Email / SMS / WhatsApp)": { explanation: "Phishing attacks use fake emails or messages that appear to come from trusted sources such as banks or companies. These messages contain malicious links that redirect victims to fake websites. Victims unknowingly enter passwords or banking information. Attackers then use the stolen information for fraud.", example: "An email claims your bank account is locked and asks you to verify your login details." },
  "Urgency Trick": { explanation: "Attackers create panic or urgency to force victims to act quickly. Messages often warn about account suspension or parcel cancellation. Because of the pressure victims do not verify the information. This leads to quick payments or sharing sensitive data.", example: "A message says your parcel will be returned unless you pay immediately." },
  "Authority Pressure Scam": { explanation: "Fraudsters pretend to be government officials, police officers, or tax authorities. They threaten victims with legal action if they do not follow instructions. The fear created by authority forces victims to comply quickly. Victims may transfer money or reveal confidential information.", example: "A caller claims to be from the tax department demanding urgent payment." },
  "Impersonation Scam": { explanation: "In impersonation scams attackers pretend to be trusted individuals such as bank staff or company employees. They contact victims through phone calls or messages. Victims believe the person is genuine and follow instructions. This leads to sharing OTPs, passwords, or financial transfers.", example: "Someone pretends to be your bank manager asking for OTP verification." },
  "Fake Payment Screenshot Scam": { explanation: "Attackers create edited screenshots showing fake payment confirmations. Victims believe the screenshot and deliver products or services. However the payment never actually happened. This scam is common in online marketplaces.", example: "A buyer sends a fake UPI screenshot claiming payment was completed." },
  "Online Marketplace Scam": { explanation: "Fraudsters exploit online buying and selling platforms to trick users. They may send fake payment confirmations or request advance payments. Victims either lose money or deliver products without receiving payment. Attackers disappear after the transaction.", example: "A buyer sends a fake QR code claiming payment was sent." },
  "Pretexting": { explanation: "Pretexting is a social engineering attack where criminals create a fake story to obtain sensitive information. They may pretend to be bank staff or technical support. Victims believe the scenario and provide personal data. The attacker then misuses the information.", example: "Someone claims to update bank records and asks for card details." },
  "Password Security": { explanation: "Password security means protecting accounts with strong and unique passwords. Weak passwords can be guessed or cracked easily. Using letters, numbers, and symbols improves password strength. Two-factor authentication adds an extra layer of protection.", example: "Using a strong password like S@fe#Pass2026." },
  "Quid Pro Quo": { explanation: "Attackers promise rewards or benefits in exchange for sensitive information. Victims may be offered gifts or technical support. In return they are asked for passwords or OTPs. Once shared attackers misuse the information.", example: "A scammer promises a gift card if you share your OTP." },
  "Shoulder Surfing": { explanation: "Shoulder surfing occurs when attackers watch someone entering passwords or PIN numbers. This often happens in public places like ATMs or cafés. Attackers memorize the information. Later they use it to access accounts.", example: "Someone watches you entering your ATM PIN." },
  "Dumpster Diving": { explanation: "Dumpster diving involves searching through discarded documents. Attackers look for sensitive information such as bank statements or login credentials. These details can be used for identity theft. Proper document disposal helps prevent this attack.", example: "Old bank statements found in trash are used for fraud." },
  "Common Password Attack": { explanation: "Attackers try commonly used passwords to break into accounts. Automated tools allow them to test thousands of combinations quickly. Weak passwords make accounts easy targets. Strong unique passwords reduce this risk.", example: "Passwords like '123456' are easily cracked." },
  "Fake Investment / Double Money Scam": { explanation: "Fraudsters promise extremely high profits to attract victims. They create fake investment platforms that appear legitimate. Victims invest money expecting quick returns. Eventually the scammers disappear with the funds.", example: "A message promises to double your investment in 24 hours." },
  "Vishing (Voice Phishing)": { explanation: "Vishing is phishing conducted through voice calls. Attackers pretend to be bank representatives or service agents. They request confidential information such as OTPs or passwords. Victims unknowingly provide details that allow fraud.", example: "A caller claims to be from your bank asking for OTP verification." },
  "UPI Collect Request Scam": { explanation: "Attackers send a fake UPI collect request that looks like a payment confirmation. Victims think they are receiving money and approve the request. Instead of receiving funds, the approval transfers money to the attacker.", example: "A collect request appears in the payment app claiming to confirm a transaction." },
  "QR Code Scam (Quishing)": { explanation: "Attackers create malicious QR codes that redirect users to fake websites. These websites steal login credentials or banking details. QR codes may appear on posters, emails, or messages. Victims scanning them unknowingly expose sensitive data.", example: "A QR code claiming to offer a discount redirects to a fake payment page." },
  "Customer Care Impersonation Scam": { explanation: "Fraudsters pretend to be customer support agents from banks or companies. They contact victims claiming there is a problem with the account. Victims are asked to share OTPs or install apps for help. This gives attackers access to the victim's bank account.", example: "A scammer claims to fix a bank issue and asks for OTP verification." },
  "Screen Sharing App Scam": { explanation: "Attackers convince victims to install remote access or screen-sharing apps. Once installed, attackers can view and control the device. This allows them to access banking apps and perform transactions.", example: "A fraudster asks you to install a screen sharing app to solve a banking problem." },
  "KYC Update Scam": { explanation: "Victims receive messages claiming their KYC verification must be updated urgently. The message contains a link to a fake banking website. Victims enter login credentials believing it is legitimate.", example: "A message says your bank account will be blocked without KYC update." },
  "UPI ID Spoofing Scam": { explanation: "Attackers create UPI IDs that look very similar to legitimate accounts. Victims assume the ID belongs to a trusted person or company. Even a small spelling difference can redirect payment to the attacker.", example: "A fake UPI ID looks like an official company account." },
  "Malvertising": { explanation: "Malvertising uses malicious advertisements to spread malware or redirect users to scam websites. These ads may appear on legitimate websites. Clicking them installs malicious software silently.", example: "Clicking a fake software update advertisement installs malware." },
  "Evil Twin Wi-Fi": { explanation: "Attackers create fake Wi-Fi networks that appear identical to legitimate networks. Victims connect believing the network is safe. Once connected attackers can monitor internet activity.", example: "Connecting to a fake 'Free Airport WiFi' network." },
  "Tailgating / Piggybacking": { explanation: "Tailgating occurs when an unauthorized person follows someone into a restricted area. This allows attackers to bypass physical security systems. Once inside they may access confidential information or systems.", example: "Someone enters a secure office by following an employee." },
  "Keylogger": { explanation: "A keylogger is malware that records every keystroke typed on a device. Attackers secretly install it through malicious software. It captures passwords, banking information, and personal messages.", example: "A malicious program records login credentials." },
  "Credential Stuffing": { explanation: "Credential stuffing uses stolen username and password combinations from previous data breaches. Attackers try these credentials on different websites. If users reuse passwords across sites, multiple accounts may be compromised.", example: "A leaked password is used to access social media accounts." },
  "Leaked Password List Attack": { explanation: "Hackers use databases of leaked passwords from previous breaches. These lists contain thousands of email-password combinations. Attackers attempt to log in to multiple services using these credentials.", example: "A password leaked from one site is used to access other accounts." },
  "Bot Login Attack": { explanation: "Automated bots attempt thousands of login attempts within seconds. They try different password combinations rapidly. If the correct password is found attackers gain access.", example: "Bots repeatedly attempt to log into an online account." },
  "Malicious APK / Fake App": { explanation: "Fake mobile applications are designed to look like legitimate apps. Once installed they secretly collect sensitive data. Attackers may capture OTPs, passwords, or banking details.", example: "A fake banking app steals login credentials." },
  "Banking Trojan": { explanation: "Banking trojans are malware designed specifically to steal financial information. They infect devices through fake apps or downloads. The trojan monitors banking activity and captures credentials.", example: "Malware records banking transactions and passwords." },
  "Ransomware": { explanation: "Ransomware encrypts files or locks devices completely. Victims cannot access their data until a ransom is paid. Attackers demand payment in cryptocurrency.", example: "A message demands payment to unlock encrypted files." },
  "SIM Swap Scam": { explanation: "Attackers trick telecom providers into transferring the victim's phone number to another SIM card. Once transferred attackers receive OTP messages. They use these OTPs to access banking or financial accounts.", example: "The victim's phone stops receiving calls while attacker receives OTPs." },
  "Watering Hole Attack": { explanation: "Attackers compromise websites frequently visited by a specific group. When victims visit the infected site malware is installed. The malware collects sensitive information.", example: "Visiting a trusted news site installs spyware." },
  "Brute Force Attack": { explanation: "A brute force attack attempts every possible password combination. Automated tools test thousands of passwords rapidly. Weak passwords can be cracked easily.", example: "Millions of password combinations are tested automatically." },
  "Account Takeover Attack": { explanation: "Attackers gain access to a user account using stolen credentials. Once inside they change the password. This locks the real owner out of the account.", example: "Hackers access your email and reset other accounts." },
  "AI Voice Cloning Scam": { explanation: "Attackers use artificial intelligence to replicate someone's voice. Victims believe the call is from a trusted person. The attacker requests urgent financial help.", example: "A cloned voice asks for emergency money." },
  "AI Deepfake Scam": { explanation: "Deepfake technology generates realistic fake images or videos. Attackers impersonate trusted individuals using AI. Victims believe the fake content and trust the message.", example: "A fake video of a manager requesting money transfer." },
  "Deepfake Video Scam": { explanation: "Attackers create manipulated videos showing celebrities or executives promoting scams. The video appears authentic. Victims trust the person shown in the video.", example: "A fake celebrity video promoting an investment scheme." },
  "Fake CEO Scam (AI)": { explanation: "Attackers impersonate company executives using AI voice or email spoofing. Employees receive urgent payment instructions. Because the request appears to come from leadership, employees trust it.", example: "An employee receives a payment request from a 'CEO'." },
  "Live Video Deepfake Scam": { explanation: "Advanced AI can modify a person's face in real time during video calls. Attackers impersonate trusted individuals. Victims believe the video call is genuine.", example: "A fake video call appears to be from a colleague." },
  "Social Engineering": { explanation: "Social engineering manipulates human psychology instead of technology. Attackers build trust with victims over time. They gather information gradually through communication. Eventually victims reveal sensitive data or provide system access.", example: "Someone posing as a coworker requests confidential information." },
  "Physical Device Theft": { explanation: "Attackers steal physical devices like smartphones, laptops, or USB drives containing sensitive information. Victims lose access to their data and potential financial losses.", example: "A stolen laptop contains confidential business data." }

};

export default function Weakness() {
  const navigate = useNavigate();
  const [weakTopics, setWeakTopics] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) { navigate("/login"); return; }
    const localUser = JSON.parse(user);
    if (!localUser) return;
    fetch(`${window.API_BASE_URL}/api/auth/user/${localUser._id}`)
      .then(res => res.json())
      .then(data => {
        setWeakTopics([...new Set(data?.weakness || [])]);
        setTimeout(() => setMounted(true), 60);
      });
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; overflow: hidden; }

        .weak-root {
          min-height: 100vh; width: 100vw; overflow: hidden;
          background: #f8fafc;
          display: flex; flex-direction: column; align-items: center;
          font-family: 'Inter', sans-serif; color: #0f172a;
          padding: clamp(0.85rem, 1.8vh, 1.4rem) clamp(0.95rem, 2.5vw, 1.8rem);
        }

        /* Top bar */
        .weak-topbar {
          width: 100%; max-width: 840px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: clamp(0.9rem, 2vh, 1.2rem); flex-shrink: 0;
          opacity: 0; transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .weak-topbar.visible { opacity: 1; transform: translateY(0); }

        .back-btn {
          display: flex; align-items: center; gap: 0.45rem;
          background: rgba(15,23,42,0.06); border: 1px solid rgba(15,23,42,0.12);
          border-radius: 100px; padding: 0.7rem 1.1rem;
          color: #0f172a; font-family: 'Inter', sans-serif;
          font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .back-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.35); color: #4338ca; }

        .weak-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.2rem, 2.2vw, 1.7rem); font-weight: 800;
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: flex; align-items: center; gap: 0.55rem;
        }

        /* Content area */
        .weak-content {
          width: 100%; max-width: 840px; flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }
        .weak-content.visible { opacity: 1; transform: translateY(0); }

        /* Stats bar */
        .weak-stats {
          display: flex; align-items: center; gap: 0.65rem;
          margin-bottom: clamp(0.45rem, 1vh, 0.7rem); flex-shrink: 0;
          flex-wrap: wrap;
        }

        .weak-count-badge {
          display: flex; align-items: center; gap: 0.4rem;
          background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.3);
          border-radius: 100px; padding: 0.4rem 0.8rem;
          font-size: 0.88rem; font-weight: 700; color: #1d4ed8;
        }
        .weak-hint { font-size: 0.95rem; color: rgba(15,23,42,0.6); }

        /* Scrollable list */
        .weak-list {
          flex: 1; min-height: 0; overflow-y: auto;
          scrollbar-width: thin; scrollbar-color: rgba(100,116,139,0.2) transparent;
          display: flex; flex-direction: column; gap: 0.7rem;
          padding-right: 4px;
        }
        .weak-list::-webkit-scrollbar { width: 4px; }
        .weak-list::-webkit-scrollbar-thumb { background: rgba(56,182,255,0.2); border-radius: 4px; }

        /* Topic card */
        .topic-card {
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 1.1rem; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
          opacity: 0; animation: cardIn 0.4s ease forwards;
          box-shadow: 0 8px 16px rgba(15,23,42,0.05);
        }
        .topic-card:hover { border-color: rgba(99,102,241,0.3); box-shadow: 0 16px 30px rgba(15,23,42,0.08); }
        .topic-card.open { border-color: rgba(99,102,241,0.35); }

        @keyframes cardIn { to { opacity: 1; } }

        .topic-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: clamp(0.7rem,1.2vh,0.9rem) clamp(0.95rem,1.8vw,1.1rem);
          cursor: pointer; gap: 0.7rem;
        }

        .topic-header-left { display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0; }

        .topic-icon {
          width: 34px; height: 34px; border-radius: 12px; flex-shrink: 0;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.24);
          display: flex; align-items: center; justify-content: center;
        }

        .topic-name {
          font-family: 'Inter', sans-serif; font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .topic-chevron {
          color: rgba(15,23,42,0.45); font-size: 0.9rem; flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .topic-card.open .topic-chevron { transform: rotate(180deg); }

        /* Expanded body */
        .topic-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 clamp(1rem,2vw,1.3rem);
        }
        .topic-card.open .topic-body {
          max-height: 300px;
          padding: 0 clamp(1rem,2vw,1.3rem) clamp(0.8rem,1.8vh,1.1rem);
        }

        .topic-divider { height: 1px; background: rgba(15,23,42,0.08); margin-bottom: 0.9rem; }

        .topic-section { display: flex; gap: 0.6rem; margin-bottom: 0.75rem; }
        .topic-section:last-child { margin-bottom: 0; }

        .topic-section-icon { flex-shrink: 0; margin-top: 2px; }

        .topic-section-label {
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; margin-bottom: 0.32rem; color: #334155;
        }

        .topic-section-text { font-size: clamp(0.9rem, 1.1vw, 0.97rem); color: rgba(15,23,42,0.82); line-height: 1.75; }
      `}</style>

      <div className="weak-root">

        {/* Top bar */}
        <div className={`weak-topbar ${mounted ? "visible" : ""}`}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft size={11} /> Dashboard
          </button>
          <div className="weak-title">
            <FaBrain size={16} /> Weakness Areas
          </div>
          <div style={{ width: 110 }} />
        </div>

        {/* Content */}
        <div className={`weak-content ${mounted ? "visible" : ""}`}>
          {weakTopics.length === 0 ? (
            <div className="weak-empty">
              <div className="weak-empty-icon">🛡️</div>
              <div className="weak-empty-title">No Weaknesses Detected!</div>
              <div className="weak-empty-sub">You're performing great. Keep answering questions to get personalized insights.</div>
            </div>
          ) : (
            <>
              <div className="weak-stats">
                <div className="weak-count-badge">
                  <FaExclamationTriangle size={11} />
                  {weakTopics.length} weak area{weakTopics.length > 1 ? "s" : ""} identified
                </div>
                <div className="weak-hint">Click a topic to learn more</div>
              </div>

              <div className="weak-list">
                {weakTopics.map((topic, i) => {
                  const attack = attacks[topic];
                  if (!attack) return null;
                  const isOpen = expanded === i;
                  return (
                    <div
                      key={i}
                      className={`topic-card ${isOpen ? "open" : ""}`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="topic-header" onClick={() => setExpanded(isOpen ? null : i)}>
                        <div className="topic-header-left">
                          <div className="topic-icon">
                            <FaShieldAlt size={13} style={{ color: "#38B6FF" }} />
                          </div>
                          <div className="topic-name">{topic}</div>
                        </div>
                        <div className="topic-chevron">▼</div>
                      </div>

                      <div className="topic-body">
                        <div className="topic-divider" />
                        <div className="topic-section">
                          <div className="topic-section-icon">
                            <FaBrain size={12} style={{ color: "#38B6FF" }} />
                          </div>
                          <div>
                            <div className="topic-section-label" style={{ color: "rgba(56,182,255,0.7)" }}>Explanation</div>
                            <div className="topic-section-text">{attack.explanation}</div>
                          </div>
                        </div>
                        <div className="topic-section">
                          <div className="topic-section-icon">
                            <FaLightbulb size={12} style={{ color: "#FFD700" }} />
                          </div>
                          <div>
                            <div className="topic-section-label" style={{ color: "rgba(255,215,0,0.7)" }}>Example</div>
                            <div className="topic-section-text">{attack.example}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}