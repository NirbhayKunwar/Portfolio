import { BookOpen, Award, CheckCircle, Flame } from 'lucide-react';
import './About.css';

const About = ({ vibe }) => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title" data-title="ABOUT">About Me</h2>
        
        <div className="about-grid">
          {/* Narrative Column */}
          <div className="about-narrative">
            <h3 className="about-subtitle">
              {vibe === 'academic' ? (
                "Academic Foundation & Research Drive"
              ) : (
                "Product Engineering & Agile Mindset"
              )}
            </h3>
            
            <div className="about-text-content">
              {vibe === 'academic' ? (
                <>
                  <p>
                    Currently pursuing my <strong>B.Tech in Computer Science and Engineering</strong> (graduating in 2026), I have maintained a consistent academic excellence, achieving an <strong>8.17 CGPA</strong> with <strong>First Class Distinction</strong>.
                  </p>
                  <p>
                    My academic focus lies in system architectures, event-driven analytics, and network simulations. In my capstone project, I engineered an Intelligent Traffic Management System (ITMS) using lane queue analytics, establishing a deep interest in algorithmic problem solving and simulation methodologies.
                  </p>
                  <p>
                    My target is to enroll in a high-caliber <strong>Master's in Software Engineering Program</strong>. I aim to leverage my robust background in software design and distributed systems to conduct research that bridges theoretical excellence and real-world system dependability.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I'm a software developer who enjoys converting complex requirements into clean, scalable code. From configuring high-performance SEO mappings for live institutions to engineering dynamic, event-driven priority queues, I build applications that are fast and reliable.
                  </p>
                  <p>
                    I work comfortably across the stack. On the frontend, I create responsive interfaces in React. On the backend, I design RESTful APIs in Node.js and manage data distributions across MongoDB Atlas clusters and relational SQL stores.
                  </p>
                  <p>
                    Collaborating in team settings is where I thrive. I utilize <strong>Agile frameworks (Jira, Scrum, Kanban)</strong> to plan sprints, track deliverables, and maintain high standards of code quality and release reliability.
                  </p>
                </>
              )}
            </div>

            <div className="about-commitments">
              <div className="commitment-item">
                <CheckCircle size={18} className="commitment-icon" />
                <span>
                  {vibe === 'academic' ? "Strong focus on algorithmic rigor and design patterns" : "Responsive UI/UX design & performance tuning"}
                </span>
              </div>
              <div className="commitment-item">
                <CheckCircle size={18} className="commitment-icon" />
                <span>
                  {vibe === 'academic' ? "Hands-on experience with metropolitan feed simulators" : "RESTful API modeling and cluster management"}
                </span>
              </div>
              <div className="commitment-item">
                <CheckCircle size={18} className="commitment-icon" />
                <span>
                  {vibe === 'academic' ? "Committed to rigorous scientific research standards" : "Agile Scrum participation, Sprint and Ticket tracking"}
                </span>
              </div>
            </div>
          </div>

          {/* Cards Grid Column */}
          <div className="about-cards-grid">
            <div className="about-card glass-panel">
              <Award className="about-card-icon" size={24} />
              <h4>B.Tech CSE</h4>
              <p>8.17 CGPA (First Class Distinction)</p>
            </div>
            
            <div className="about-card glass-panel">
              <Flame className="about-card-icon" size={24} />
              <h4>Project Deployed</h4>
              <p>Universal Academy Live & ITMS Capstone</p>
            </div>

            <div className="about-card glass-panel">
              <BookOpen className="about-card-icon" size={24} />
              <h4>Graduate Target</h4>
              <p>Master's in Software Engineering Program</p>
            </div>

            <div className="about-card glass-panel">
              <CheckCircle className="about-card-icon" size={24} />
              <h4>Core Methodology</h4>
              <p>Jira Scrum, Kanban & Git Versioning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
