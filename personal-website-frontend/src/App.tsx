import React, { useState, useEffect } from 'react';
import './App.css';

interface GuestbookPost {
  name: string;
  message: string;
}

function App() {
  const [posts, setPosts] = useState<GuestbookPost[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('DATA'); 
  const [subTab, setSubTab] = useState<string | null>(null); // State for interactive stats
  
  const API_URL = "https://personal-website-finals-bti9.onrender.com/guestbook";

  const playSound = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      setName('');
      setMessage('');
      fetchPosts();
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <div className="container">
      <div className="scanline"></div>
      <header>
        <h1>ROBCO INDUSTRIES<span className="cursor"></span></h1>
        <p className="subtitle">GUEST_LOG_v4.0.2 [FINAL_RELEASE]</p>
      </header>

      <nav className="pipboy-nav">
        <button className={activeTab === 'STAT' ? 'active' : ''} onClick={() => { setActiveTab('STAT'); setSubTab(null); playSound(); }}>STAT</button>
        <button className={activeTab === 'DATA' ? 'active' : ''} onClick={() => { setActiveTab('DATA'); playSound(); }}>DATA</button>
        <button className={activeTab === 'MAP' ? 'active' : ''} onClick={() => { setActiveTab('MAP'); playSound(); }}>MAP</button>
      </nav>

      <div className="screen-content">
        {activeTab === 'DATA' && (
          <div className="animate-fade">
            <div className="form-card">
              <form onSubmit={handleUpload}>
                <input placeholder="[ USERNAME ]" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="[ MESSAGE ]" value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} />
                <button type="submit">_UPLOAD_DATA_</button>
              </form>
            </div>
            <div className="posts-list">
              {posts.map((post, i) => (
                <div key={i} className="post-card">
                  <div className="user-name">{'>'} {post.name.toUpperCase()}</div>
                  <p>{post.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'STAT' && (
          <div className="animate-fade">
            {!subTab ? (
              <div className="post-card">
                <h3>{'>'} USER_PROFILE: ALEKSEJ</h3>
                <p>ROLE: FULL-STACK DEVELOPER & IOT ENGINEER</p>
                <hr className="purple-hr" />
                <div className="stats-list">
                  <button className="stat-btn" onClick={() => { setSubTab('STRENGTH'); playSound(); }}>
                    STRENGTH [RE-ACT] <span className="bar">[||||||||--] 80%</span>
                  </button>
                  <button className="stat-btn" onClick={() => { setSubTab('PERCEPTION'); playSound(); }}>
                    PERCEPTION [API] <span className="bar">[||||||||||] 100%</span>
                  </button>
                  <button className="stat-btn" onClick={() => { setSubTab('ENDURANCE'); playSound(); }}>
                    ENDURANCE [NEST] <span className="bar">[|||||||---] 70%</span>
                  </button>
                </div>
                <hr className="purple-hr" />
                <p><strong>IOT_PROJECT_LOGS:</strong></p>
                <p>- <a href="https://wokwi.com/projects/456728409234091009" target="_blank" className="terminal-link">PEMBEDS_FINALS_EXAM</a></p>
                <p>- <a href="https://wokwi.com/projects/456401951483048961" target="_blank" className="terminal-link">GREENDATA_INDUSTRIAL_AUTOMATOR</a></p>
              </div>
            ) : (
              <div className="post-card animate-fade">
                <button className="back-btn" onClick={() => { setSubTab(null); playSound(); }}>{'<<'} BACK_TO_STATS</button>
                <h3>{'>'} {subTab}_REPORT</h3>
                {subTab === 'STRENGTH' && <p>My strength lies in Frontend Architecture. I specialize in building high-performance React components and managing complex application states.</p>}
                {subTab === 'PERCEPTION' && <p>My perception is focused on Data Integrity. I am proficient in RESTful API design, ensuring seamless communication between backends and databases.</p>}
                {subTab === 'ENDURANCE' && <p>My endurance is proven in System Reliability. I have experience troubleshooting CORS issues and maintaining cloud infrastructure.</p>}
              </div>
            )}
          </div>
        )}

        {activeTab === 'MAP' && (
          <div className="animate-fade">
            <div className="post-card">
              <h3>{'>'} COMMUNICATIONS_HUB</h3>
              <p><strong>NETWORK_LINKS:</strong></p>
              <p>- <a href="https://github.com/AleksejHamer" target="_blank" className="terminal-link">GITHUB_PROFILER</a></p>
              <p>- <a href="https://www.linkedin.com/in/aleksej-hamer-72a7a3322/" target="_blank" className="terminal-link">LINKEDIN_INTEL</a></p>
              <hr className="purple-hr" />
              <p><strong>DIRECT_MESSAGING:</strong></p>
              <p>EDU: ahamer@student.apc.edu.ph</p>
              <p>PRV: aleksejhamer@gmail.com</p>
              <hr className="purple-hr" />
              <p>{'>'} LOCATION: PASAY CITY, PH</p>
              <p>{'>'} STATUS: BROADCASTING_LIVE</p>
            </div>
          </div>
        )}
      </div>

      <footer className="system-footer">
        <p>[ CPU: NESTJS_V10 ] [ MEM: SUPABASE_CLOUD ] [ OS: REACT_VITE ]</p>
        <p>© 2026 ROBCO TERMINAL SERVICES - ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

export default App;