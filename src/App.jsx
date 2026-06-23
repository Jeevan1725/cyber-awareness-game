import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Knowledge from "./pages/Knowledge";
import Rank from "./pages/Rank";


import Weakness from "./pages/Weakness";
import VaultHome from "./pages/VaultHome";
import VaultAdd from "./pages/VaultAdd";
import VaultList from "./pages/VaultList";
import VaultView from "./pages/VaultView";
import VaultDelete from "./pages/VaultDelete";
import StoryList from "./pages/StoryList";
import StoryPlay from "./pages/StoryPlay";
import Streak from "./pages/Streak";

import LinkTrap from "./pages/LinkTrap_1";
import ScamChat from "./pages/ScamChat_1";
import APKInspector from "./pages/APKInspector_2";
import ScamCall from "./pages/ScamCall_2";
import PasswordRush from "./pages/PasswordRush_3";
import PrivacyDetective from "./pages/PrivacyDetective_4";
import CyberBomb from "./pages/CyberBomb_4";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/weakness" element={<Weakness />} />
        <Route path="/knowledge" element={<Knowledge />} />

        <Route path="/vault" element={<VaultHome />} />
        <Route path="/vault/add" element={<VaultAdd />} />
        <Route path="/vault/list" element={<VaultList />} />
        <Route path="/vault/view/:id" element={<VaultView />} />
        <Route path="/vault/delete/:id" element={<VaultDelete />} />

        <Route path="/story" element={<StoryList />} />
        <Route path="/story/:id" element={<StoryPlay />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/rank" element={<Rank />} />


        <Route path="/link-trap" element={<LinkTrap />} />
        <Route path="/scam-chat" element={<ScamChat />} />
        <Route path="/apk-inspector" element={<APKInspector />} />
        <Route path="/scam-call" element={<ScamCall />} />
        <Route path="/password-rush" element={<PasswordRush />} />
        <Route path="/privacy-detective" element={<PrivacyDetective />} />
        <Route path="/cyber-bomb" element={<CyberBomb />} />


      </Routes>

    </BrowserRouter>

  );

}

export default App;