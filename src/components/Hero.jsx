import { useRef } from 'react';
import { ArrowRight, Mail, Award, Code, Database, Settings } from 'lucide-react';
import './Hero.css';

const Hero = ({ vibe }) => {
  const cardRef = useRef(null);

  // 3D Parallax Tilt effect calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Cap tilt angle at 12 degrees for refined feel
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWorkClick = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = projectsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="ambient-glow ambient-left"></div>
      <div className="ambient-glow ambient-right"></div>
      
      <div className="container hero-container">
        {/* Left Content Column */}
        <div className="hero-content">
          <div className="hero-badge-container">
            <span className="hero-badge animate-pulse">
              {vibe === 'academic' ? (
                <>
                  <Award size={14} className="hero-badge-icon" />
                  Targeting Master's in SE Admissions
                </>
              ) : (
                <>
                  <Code size={14} className="hero-badge-icon" />
                  Open for Collaborations
                </>
              )}
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-subtitle">Hi, I'm</span>
            <span className="hero-name">Nirbhay Singh Kunwar</span>
          </h1>

          <h2 className="hero-tagline">
            {vibe === 'academic' ? (
              <>
                B.Tech (CSE) Graduate with specialization in <span className="highlight-text">Full Stack Development and DevOps</span>
              </>
            ) : (
              <>
                Full-Stack <span className="highlight-text">Software Engineer</span> & Developer
              </>
            )}
          </h2>

          <p className="hero-description">
            {vibe === 'academic' ? (
              "A B.Tech CSE candidate (graduating 2026) with an 8.17 CGPA First Class Distinction. Passionate about system architectures, lane analytics, and advanced software engineering concepts. Preparing to drive graduate research and development in premium Master's programs."
            ) : (
              "Building high-performance web applications and backend distributions. Specialized in React, Tailwind, Node.js, and MongoDB, while implementing Agile frameworks, sprint planning, and event-driven lane queue models."
            )}
          </p>

          <div className="hero-tags">
            {vibe === 'academic' ? (
              <>
                <span className="hero-tag-item"><Award size={14} /> 8.17 CGPA Distinction</span>
                <span className="hero-tag-item"><Code size={14} /> Capstone: Event Analytics</span>
                <span className="hero-tag-item"><Database size={14} /> SQL & Distributed Systems</span>
              </>
            ) : (
              <>
                <span className="hero-tag-item"><Code size={14} /> React & Tailwind CSS</span>
                <span className="hero-tag-item"><Database size={14} /> Node & MongoDB Cloud</span>
                <span className="hero-tag-item"><Settings size={14} /> Jira & Scrum Systems</span>
              </>
            )}
          </div>

          <div className="hero-actions">
            <button onClick={handleWorkClick} className="btn btn-primary">
              Explore Portfolio <ArrowRight size={16} />
            </button>
            <button onClick={handleContactClick} className="btn btn-secondary">
              <Mail size={16} /> Get In Touch
            </button>
          </div>
        </div>

        {/* Right Photo Column */}
        <div className="hero-visual">
          <div className="photo-frame-wrapper">
            <div className="photo-glowing-blob"></div>
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="photo-frame"
            >
              {/* Academic Image (Formal Headshot) */}
              <img
                src="/profile-academic.jpg"
                alt="Nirbhay Singh Kunwar - Formal Headshot"
                className={`profile-img academic-img ${vibe === 'academic' ? 'active' : 'inactive'}`}
              />
              {/* Casual Image (Outdoor Portrait) */}
              <img
                src="/profile-casual.jpg"
                alt="Nirbhay Singh Kunwar - Casual Portrait"
                className={`profile-img casual-img ${vibe === 'casual' ? 'active' : 'inactive'}`}
              />
            </div>
            <div className="visual-stats-card glass-panel animate-float">
              {vibe === 'academic' ? (
                <>
                  <span className="visual-stats-value">8.17</span>
                  <span className="visual-stats-label">B.Tech CGPA</span>
                </>
              ) : (
                <>
                  <span className="visual-stats-value">2+</span>
                  <span className="visual-stats-label">Live Deployments</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
