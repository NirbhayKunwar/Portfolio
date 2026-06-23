import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';
import './Education.css';

const Education = () => {
  const educationTimeline = [
    {
      year: "2022 - 2026",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "First Class Distinction (Cumulative: 8.17 CGPA)",
      details: [
        "Rigorous coursework in Data Structures, Database Systems (SQL/NoSQL), Operating Systems, Software Engineering methodologies, and Distributed Systems.",
        "Maintained high standing, culminating in First Class Distinction honors.",
        "Active member of tech clubs, coding forums, and collaborative academic projects."
      ],
      icon: <GraduationCap size={20} />,
      badge: "Degree Program"
    },
    {
      year: "2025 - 2026",
      degree: "Capstone Project & Research Focus",
      institution: "Intelligent Traffic Management System (ITMS)",
      details: [
        "Designed event-driven lane queue analytics simulating metropolitan traffic feeds.",
        "Built prioritizations systems to handle real-time emergency vehicle clearances.",
        "Conducted evaluations on lane congestion models, establishing a strong foundation in simulation, mathematical modeling, and software engineering design patterns."
      ],
      icon: <Award size={20} />,
      badge: "Academic Capstone"
    },
    {
      year: "2026",
      degree: "Admissions Aspirant",
      institution: "Targeting Master's in Software Engineering",
      details: [
        "Applying to premium graduate schools to pursue advanced research in software architectures, dependable distributed systems, and modern dev operations.",
        "Aiming to build on B.Tech foundation to contribute to academic literature and solve industry-scale software reliability problems."
      ],
      icon: <BookOpen size={20} />,
      badge: "Target Goal"
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="ambient-glow ambient-left"></div>
      <div className="container">
        <h2 className="section-title" data-title="TIMELINE">Education & Milestones</h2>
        
        <div className="education-timeline-container">
          <div className="timeline-line"></div>
          
          {educationTimeline.map((item, index) => (
            <div key={index} className="timeline-item glass-panel">
              <div className="timeline-icon-container">
                <div className="timeline-icon">
                  {item.icon}
                </div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-badge">{item.badge}</span>
                </div>
                
                <h3 className="timeline-degree">{item.degree}</h3>
                <h4 className="timeline-institution">{item.institution}</h4>
                
                <ul className="timeline-details-list">
                  {item.details.map((detail, dIndex) => (
                    <li key={dIndex} className="timeline-detail-item">
                      <Star size={12} className="timeline-bullet-icon" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
