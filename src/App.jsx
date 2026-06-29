import { useState, useEffect, useRef } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  const [vibe, setVibe] = useState('academic');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [preset, setPreset] = useState(() => {
    return localStorage.getItem('color-preset') || 'violet';
  });

  const cursorRef = useRef(null);

  const handleBtnClick = () => {
    setIsThemePanelOpen(!isThemePanelOpen);
  };


  // Systematic system theme preference listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update HTML root classes on theme switch
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keep body class updated with preset class for CSS scope overrides
  useEffect(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove('preset-violet', 'preset-teal', 'preset-indigo', 'preset-amber');
    bodyClassList.add(`preset-${preset}`);
    localStorage.setItem('color-preset', preset);
  }, [preset]);

  // Direct GPU-accelerated mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Inject or remove vibe class on body
  useEffect(() => {
    const bodyClassList = document.body.classList;
    if (vibe === 'casual') {
      bodyClassList.add('vibe-casual');
    } else {
      bodyClassList.remove('vibe-casual');
    }
  }, [vibe]);

  return (
    <div className={`app-wrapper vibe-${vibe} theme-${theme} preset-${preset}`}>
      {/* Background Cursor Spotlight */}
      <div ref={cursorRef} className="cursor-glow"></div>
      
      <Header vibe={vibe} setVibe={setVibe} theme={theme} setTheme={setTheme} />
      
      <main>
        <Hero vibe={vibe} />
        <About vibe={vibe} />
        <Education />
        <Projects />
        <Skills />
        <Contact vibe={vibe} setVibe={setVibe} theme={theme} setTheme={setTheme} />
      </main>

      {/* Floating Theme Controller */}
      <div className={`floating-theme-widget ${isThemePanelOpen ? 'open' : ''}`}>
        <button 
          onClick={handleBtnClick}
          className="floating-widget-trigger glass-panel"
          title="Customize Theme"
        >
          <Palette size={20} className={isThemePanelOpen ? 'rotate-icon' : ''} />
        </button>

        <div className="floating-widget-panel glass-panel">
          <h4 className="panel-title">Theme Matrix</h4>
          
          {/* Light/Dark Toggle */}
          <div className="panel-section">
            <span className="panel-section-label">Canvas Mode</span>
            <div className="theme-toggle-row">
              <button 
                onClick={() => setTheme('light')}
                className={`theme-toggle-option ${theme === 'light' ? 'active' : ''}`}
              >
                <Sun size={14} /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`theme-toggle-option ${theme === 'dark' ? 'active' : ''}`}
              >
                <Moon size={14} /> Dark
              </button>
            </div>
          </div>

          {/* Color Presets */}
          <div className="panel-section">
            <span className="panel-section-label">Accent Spectrum</span>
            <div className="color-presets-row">
              <button 
                onClick={() => setPreset('violet')}
                className={`color-preset-btn violet ${preset === 'violet' ? 'active' : ''}`}
                title="Aether Violet"
              >
                <span className="color-dot violet-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('teal')}
                className={`color-preset-btn teal ${preset === 'teal' ? 'active' : ''}`}
                title="Neon Teal"
              >
                <span className="color-dot teal-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('indigo')}
                className={`color-preset-btn indigo ${preset === 'indigo' ? 'active' : ''}`}
                title="Indigo Flame"
              >
                <span className="color-dot indigo-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('amber')}
                className={`color-preset-btn amber ${preset === 'amber' ? 'active' : ''}`}
                title="Gold Ember"
              >
                <span className="color-dot amber-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('rose')}
                className={`color-preset-btn rose ${preset === 'rose' ? 'active' : ''}`}
                title="Crimson Rose"
              >
                <span className="color-dot rose-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('lime')}
                className={`color-preset-btn lime ${preset === 'lime' ? 'active' : ''}`}
                title="Matrix Lime"
              >
                <span className="color-dot lime-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('silver')}
                className={`color-preset-btn silver ${preset === 'silver' ? 'active' : ''}`}
                title="Platinum Silver"
              >
                <span className="color-dot silver-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('cyberpunk')}
                className={`color-preset-btn cyberpunk ${preset === 'cyberpunk' ? 'active' : ''}`}
                title="Cyberpunk Neon"
              >
                <span className="color-dot cyberpunk-dot"></span>
              </button>
              <button 
                onClick={() => setPreset('solar')}
                className={`color-preset-btn solar ${preset === 'solar' ? 'active' : ''}`}
                title="Solar Flare"
              >
                <span className="color-dot solar-dot"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
