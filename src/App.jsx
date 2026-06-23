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
  const widgetRef = useRef(null);
  const dragTimerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);

  // Helper to dynamically adjust theme panel open direction based on viewport position
  const updateWidgetDirection = (left, top) => {
    if (widgetRef.current) {
      const isTopHalf = top < window.innerHeight / 2;
      const isLeftHalf = left < window.innerWidth / 2;

      if (isTopHalf) {
        widgetRef.current.classList.add('open-below');
      } else {
        widgetRef.current.classList.remove('open-below');
      }

      if (isLeftHalf) {
        widgetRef.current.classList.add('open-right');
      } else {
        widgetRef.current.classList.remove('open-right');
      }
    }
  };

  // Handle mouse dragging the widget
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click

    const rect = widgetRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = rect.left;
    const startTop = rect.top;

    const handleMouseMove = (moveEvt) => {
      if (!isDraggingRef.current) return;

      let newLeft = startLeft + (moveEvt.clientX - startX);
      let newTop = startTop + (moveEvt.clientY - startY);

      // Keep it within window boundary
      const currentRect = widgetRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - currentRect.width;
      const maxY = window.innerHeight - currentRect.height;

      newLeft = Math.max(0, Math.min(newLeft, maxX));
      newTop = Math.max(0, Math.min(newTop, maxY));

      if (widgetRef.current) {
        widgetRef.current.style.left = `${newLeft}px`;
        widgetRef.current.style.top = `${newTop}px`;
        widgetRef.current.style.bottom = 'auto';
        widgetRef.current.style.right = 'auto';
        updateWidgetDirection(newLeft, newTop);
      }
    };

    const handleMouseUp = () => {
      clearTimeout(dragTimerRef.current);
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        wasDraggedRef.current = true;
        if (widgetRef.current) {
          widgetRef.current.classList.remove('dragging-active');
          const finalRect = widgetRef.current.getBoundingClientRect();
          localStorage.setItem('widget-position-x', finalRect.left);
          localStorage.setItem('widget-position-y', finalRect.top);
        }
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    // 250ms hold to activate dragging
    dragTimerRef.current = setTimeout(() => {
      isDraggingRef.current = true;
      if (widgetRef.current) {
        widgetRef.current.classList.add('dragging-active');
      }
    }, 250);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle touch dragging the widget (mobile/tablet support)
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = widgetRef.current.getBoundingClientRect();
    const startX = touch.clientX;
    const startY = touch.clientY;
    const startLeft = rect.left;
    const startTop = rect.top;

    const handleTouchMove = (moveEvt) => {
      if (!isDraggingRef.current) return;
      if (moveEvt.cancelable) {
        moveEvt.preventDefault();
      }

      const currentTouch = moveEvt.touches[0];
      let newLeft = startLeft + (currentTouch.clientX - startX);
      let newTop = startTop + (currentTouch.clientY - startY);

      const currentRect = widgetRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - currentRect.width;
      const maxY = window.innerHeight - currentRect.height;

      newLeft = Math.max(0, Math.min(newLeft, maxX));
      newTop = Math.max(0, Math.min(newTop, maxY));

      if (widgetRef.current) {
        widgetRef.current.style.left = `${newLeft}px`;
        widgetRef.current.style.top = `${newTop}px`;
        widgetRef.current.style.bottom = 'auto';
        widgetRef.current.style.right = 'auto';
        updateWidgetDirection(newLeft, newTop);
      }
    };

    const handleTouchEnd = () => {
      clearTimeout(dragTimerRef.current);
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        wasDraggedRef.current = true;
        if (widgetRef.current) {
          widgetRef.current.classList.remove('dragging-active');
          const finalRect = widgetRef.current.getBoundingClientRect();
          localStorage.setItem('widget-position-x', finalRect.left);
          localStorage.setItem('widget-position-y', finalRect.top);
        }
      }
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    // 250ms hold to activate dragging
    dragTimerRef.current = setTimeout(() => {
      isDraggingRef.current = true;
      if (widgetRef.current) {
        widgetRef.current.classList.add('dragging-active');
      }
    }, 250);

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleBtnClick = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    setIsThemePanelOpen(!isThemePanelOpen);
  };

  // Restore widget position from localStorage on mount
  useEffect(() => {
    if (widgetRef.current) {
      const savedX = localStorage.getItem('widget-position-x');
      const savedY = localStorage.getItem('widget-position-y');
      if (savedX && savedY) {
        // Double check bounds to make sure viewport resize didn't leave it off-screen
        const buttonSize = 46;
        const maxX = window.innerWidth - buttonSize;
        const maxY = window.innerHeight - buttonSize;
        
        const adjustedX = Math.max(0, Math.min(parseFloat(savedX), maxX));
        const adjustedY = Math.max(0, Math.min(parseFloat(savedY), maxY));

        widgetRef.current.style.left = `${adjustedX}px`;
        widgetRef.current.style.top = `${adjustedY}px`;
        widgetRef.current.style.bottom = 'auto';
        widgetRef.current.style.right = 'auto';
        updateWidgetDirection(adjustedX, adjustedY);
      }
    }
  }, []);

  // Adjust position on window resize if it has been dragged
  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current && widgetRef.current.style.left) {
        const rect = widgetRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        const currentLeft = parseFloat(widgetRef.current.style.left);
        const currentTop = parseFloat(widgetRef.current.style.top);

        const adjustedLeft = Math.max(0, Math.min(currentLeft, maxX));
        const adjustedTop = Math.max(0, Math.min(currentTop, maxY));

        widgetRef.current.style.left = `${adjustedLeft}px`;
        widgetRef.current.style.top = `${adjustedTop}px`;
        updateWidgetDirection(adjustedLeft, adjustedTop);

        // Keep local storage updated
        localStorage.setItem('widget-position-x', adjustedLeft);
        localStorage.setItem('widget-position-y', adjustedTop);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(dragTimerRef.current);
    };
  }, []);


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
      <div 
        ref={widgetRef}
        className={`floating-theme-widget ${isThemePanelOpen ? 'open' : ''}`}
      >
        <button 
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleBtnClick}
          className="floating-widget-trigger glass-panel"
          title="Customize Theme (Hold to drag)"
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
