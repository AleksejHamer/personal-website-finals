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
  
  const API_URL = "https://friendly-trout-v69v4wvj6w64fxqxg-3000.app.github.dev/guestbook";

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
            <div className="post-card">
              {/* Fixes for the red lines in STAT */}
              <p>{'>'} SYSTEM STATUS: NOMINAL</p>
              <p>{'>'} DATABASE: CONNECTED (SUPABASE)</p>
              <p>{'>'} BACKEND: NESTJS REST API</p>
            </div>
          </div>
        )}

        {activeTab === 'MAP' && (
          <div className="animate-fade">
            <div className="post-card">
              {/* Fix for the red line in MAP */}
              <p>{'>'} LOCATION: PASAY CITY, METRO MANILA</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;