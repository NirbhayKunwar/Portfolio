import { useState } from 'react';
import { Monitor, Server, Database, GitBranch, Zap } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend Dev",
      icon: <Monitor size={20} />,
      skills: [
        { name: "React", details: "Hooks, Context API, Component Lifecycle, Performance Tuning" },
        { name: "Tailwind CSS", details: "Utility configurations, custom grids, responsive designs" },
        { name: "Vite", details: "Ultra-fast bundling, HMR, custom configs, asset pipelines" },
        { name: "Responsive Systems", details: "Mobile-first structures, flex/grid modular layouts" }
      ]
    },
    {
      category: "Backend Engine",
      icon: <Server size={20} />,
      skills: [
        { name: "Node.js", details: "Asynchronous architectures, file systems, process threading" },
        { name: "Express", details: "RESTful routers, custom middlewares, controller patterns" },
        { name: "RESTful APIs", details: "JSON payloads, CRUD architectures, status codes mapping" },
        { name: "Host Environments", details: "Production builds deployment, cloud hosting, process managers" }
      ]
    },
    {
      category: "Database & Cloud",
      icon: <Database size={20} />,
      skills: [
        { name: "MongoDB", details: "Document schemas, complex queries, aggregation pipelines" },
        { name: "Atlas Cloud", details: "Cluster distributions, network peering, connection pooling" },
        { name: "SQL Stores", details: "Relational modeling, primary/foreign keys, joins, normalization" },
        { name: "Data Persistence", details: "Caching systems, ODM/ORM layering, transactional integrity" }
      ]
    },
    {
      category: "Systems & Agile",
      icon: <GitBranch size={20} />,
      skills: [
        { name: "Git / GitHub", details: "Branching protocols, pull requests, conflict resolution, version control" },
        { name: "Jira Systems", details: "Epic mapping, sprint boards, issue reporting, ticket lifecycle" },
        { name: "Sprint Planning", details: "Estimation points, task division, burn-down analysis" },
        { name: "Scrum & Kanban", details: "Standups, backlog grooming, workflow bottlenecks prevention" }
      ]
    }
  ];

  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="section skills-section">
      <div className="ambient-glow ambient-right"></div>
      <div className="container">
        <h2 className="section-title" data-title="SKILLS">Core Tech Stack</h2>
        
        <div className="skills-grid">
          {skillsData.map((cat, catIdx) => (
            <div key={catIdx} className="skills-category-card glass-panel">
              <div className="skills-category-header">
                <div className="skills-category-icon-container">
                  {cat.icon}
                </div>
                <h3>{cat.category}</h3>
              </div>

              <div className="skills-badges-list">
                {cat.skills.map((skill, skillIdx) => {
                  const uniqueId = `${catIdx}-${skillIdx}`;
                  const isHovered = hoveredSkill === uniqueId;
                  
                  return (
                    <div
                      key={skillIdx}
                      className="skill-badge-wrapper"
                      onMouseEnter={() => setHoveredSkill(uniqueId)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className={`skill-badge ${isHovered ? 'hovered' : ''}`}>
                        <Zap size={10} className="badge-bullet" />
                        <span>{skill.name}</span>
                      </div>
                      
                      <div className={`skill-tooltip glass-panel ${isHovered ? 'visible' : ''}`}>
                        <div className="tooltip-title">{skill.name} Breakdown</div>
                        <div className="tooltip-content">{skill.details}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tip panel */}
        <div className="skills-tip glass-panel">
          <Zap size={16} className="tip-icon animate-pulse" />
          <span><strong>Interactive Stack Map:</strong> Hover over any skill badge to view its granular engineering details and concepts.</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
