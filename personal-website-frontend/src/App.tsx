import React, { useState, useEffect } from 'react';
import './App.css';

// Interface to fix TypeScript "red lines" on post properties
interface GuestbookPost {
  name: string;
  message: string;
}

function App() {
  const [posts, setPosts] = useState<GuestbookPost[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('DATA'); 
  
  // UPDATED: Now pointing to your live Render backend
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
        <h1>ROBCO INDUSTRIES</h1>
        <p className="subtitle">GUEST_LOG_v4.0.2 [FINAL_RELEASE]</p>
      </header>

      <nav className="pipboy-nav">
        <button className={activeTab === 'STAT' ? 'active' : ''} onClick={() => setActiveTab('STAT')}>STAT</button>
        <button className={activeTab === 'DATA' ? 'active' : ''} onClick={() => setActiveTab('DATA')}>DATA</button>
        <button className={activeTab === 'MAP' ? 'active' : ''} onClick={() => setActiveTab('MAP')}>MAP</button>
      </nav>

      <div className="screen-content">
        {activeTab === 'DATA' && (
          <div className="animate-fade">
            <div className="form-card">
              <form onSubmit={handleUpload}>
                <input 
                  placeholder="[ USERNAME ]" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
                <textarea 
                  placeholder="[ MESSAGE ]" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  rows={3} 
                />
                <button type="submit">_UPLOAD_DATA_</button>
              </form>
            </div>

            <div className="posts-list">
              {posts.map((post, i) => (
                <div key={i} className="post-card">
                  {/* Corrected syntax for displaying the > symbol */}
                  <div className="user-name">{'>'} {post.name.toUpperCase()}</div>
                  <p>{post.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'STAT' && (
          <div className="animate-fade">
            <div className="post-card">
              <h3>{'>'} USER_PROFILE: ALEKSEJ</h3>
              <p>{'>'} ROLE: FULL-STACK DEVELOPER & IOT ENGINEER</p>
              <p>{'>'} LOCATION: PASAY CITY, PH</p>
              <hr style={{borderColor: 'var(--pip-purple)', margin: '15px 0'}} />
              
              <p><strong>SKILLS_LOG:</strong></p>
              <ul style={{listStyleType: "'> '"}}>
                <li>Frontend: React, Vite, CSS3 (Responsive)</li>
                <li>Backend: NestJS, REST API Development</li>
                <li>Database: Supabase, SQL</li>
                <li>Specialty: Arduino R4 IoT & Industrial Automation</li>
              </ul>

              <p><strong>ACTIVE_PROJECTS:</strong></p>
              <p>- GreenData Industrial Automator (IoT Controller)</p>
              <p>- NBA Postseason Oracle (ML-Driven Predictor)</p>
              <p>- Guestbook REST API Integration (Final Project)</p>
              
              <hr style={{borderColor: 'var(--pip-purple)', margin: '15px 0'}} />
              <p>{'>'} SYSTEM STATUS: NOMINAL</p>
              <p>{'>'} DATABASE: CONNECTED (SUPABASE)</p>
            </div>
          </div>
        )}

        {activeTab === 'MAP' && (
          <div className="animate-fade">
            <div className="post-card">
              <p>{'>'} LOCATION: PASAY CITY, METRO MANILA</p>
              <p>{'>'} TIMEZONE: GMT+8</p>
              <p>{'>'} COORDINATES: 14.5333° N, 121.0000° E</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;