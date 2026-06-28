import { ExternalLink, CheckCircle2 } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title" data-title="WORK">Project Portfolio Deployed</h2>
        
        <div className="projects-grid">
          {/* PROJECT 1: ITMS Capstone */}
          <div className="project-card glass-panel itms-card">
            <div className="project-header">
              <span className="project-badge">Capstone Project</span>
              <h3 className="project-title">Intelligent Traffic Management System (ITMS)</h3>
            </div>
            
            <p className="project-description">
              Developed the frontend interface and integrated key backend services for an event-driven lane queue analytics system.
              Collaborated with teammates to design and open-source the core traffic models and emergency vehicle prioritization services, which dynamically allocate green-time based on live simulated sensor feeds.
            </p>

            <div className="project-tags">
              <span>Event Analytics</span>
              <span>Priority Queues</span>
              <span>Metropolitan Feed</span>
              <span>Python/React</span>
              <span>Simulations</span>
            </div>

            <div className="project-actions">
              <a 
                href="https://intelligent-traffic-management-system.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary project-link-btn"
              >
                Visit Live Deployed Site <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* PROJECT 2: Universal Academy Website */}
          <div className="project-card glass-panel uahm-card">
            <div className="project-header">
              <span className="project-badge">Institution Web Portal</span>
              <h3 className="project-title">Universal Academy Website (UAHM)</h3>
            </div>
            
            <p className="project-description">
              Engineered and deployed a full-stack educational website using React, Node.js, MongoDB Atlas, Cloudinary, and Vercel. 
              Developed an administrative content management system, implemented SEO best practices, optimized performance and responsiveness, 
              and integrated secure data handling for admission inquiries and institutional communications.
            </p>

            <div className="project-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB Atlas</span>
              <span>Cloudinary</span>
              <span>Vercel</span>
              <span>CMS</span>
              <span>SEO</span>
            </div>

            {/* Architecture breakdown */}
            <div className="uahm-features glass-panel">
              <h4 className="features-title">Core Deployment Features</h4>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle2 size={16} className="feature-check" />
                  <div>
                    <h5>SEO Mappings</h5>
                    <p>Enhanced index visibility with canonical routes and dynamic metadata configurations.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} className="feature-check" />
                  <div>
                    <h5>Announcement Ticker Engine</h5>
                    <p>Built a custom administrative announcement system for broadcasting critical student advisories.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} className="feature-check" />
                  <div>
                    <h5>Scale & Deployed Live</h5>
                    <p>Fully hosted in production, providing quick page-load cycles and high-speed core web metrics.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-actions">
              <a 
                href="https://www.uahm.edu.np" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary project-link-btn"
              >
                Visit Live Deployed Site <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
