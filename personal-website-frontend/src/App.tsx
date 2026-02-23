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
  
  const API_URL = "https://personal-website-finals-bti9.onrender.com/guestbook";

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
        <button className={activeTab === 'STAT' ? 'active' : ''} onClick={() => setActiveTab('STAT')}>STAT</button>
        <button className={activeTab === 'DATA' ? 'active' : ''} onClick={() => setActiveTab('DATA')}>DATA</button>
        <button className={activeTab === 'MAP' ? 'active' : ''} onClick={() => setActiveTab('MAP')}>MAP</button>
      </nav>

      <div className="screen-content">
        {/* DATA TAB: Guestbook with REST API */}
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
        
        {/* STAT TAB: Personal Profile and IoT Projects */}
        {activeTab === 'STAT' && (
          <div className="animate-fade">
            <div className="post-card">
              <h3>{'>'} USER_PROFILE: ALEKSEJ</h3>
              <p>{'>'} ROLE: FULL-STACK DEVELOPER & IOT ENGINEER</p>
              
              <hr className="purple-hr" />
              
              <div className="stats-list">
                <p>STRENGTH [RE-ACT] <span className="bar">[||||||||--] 80%</span></p>
                <p>PERCEPTION [API] <span className="bar">[||||||||||] 100%</span></p>
                <p>ENDURANCE [NEST] <span className="bar">[|||||||---] 70%</span></p>
              </div>

              <hr className="purple-hr" />
              <p><strong>IOT_PROJECT_LOGS:</strong></p>
              <p>- <a href="https://wokwi.com/projects/456728409234091009" target="_blank" className="terminal-link">PEMBEDS_FINALS_EXAM</a></p>
              <p>- <a href="https://wokwi.com/projects/456401951483048961" target="_blank" className="terminal-link">GREENDATA_INDUSTRIAL_AUTOMATOR</a></p>
            </div>
          </div>
        )}

        {/* MAP TAB: Contact Information and Professional Links */}
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