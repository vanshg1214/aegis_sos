import { useState, useEffect } from 'react'
import RegistrationForm from './components/RegistrationForm'
import './index.css'

function App() {
  const [isStandalone, setIsStandalone] = useState(false)
  // Replaced the external Netlify URL with our newly integrated local page
  const targetUrl = '/command-post.html'

  useEffect(() => {
    // Check if the app is running in standalone mode (PWA installed)
    const checkStandalone = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                    window.navigator.standalone;
      setIsStandalone(isPWA);
    }
    
    checkStandalone();
    
    // Listen for changes (e.g., if user installs and it opens seamlessly)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e) => setIsStandalone(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isStandalone) {
    return (
      <div id="pwa-standalone-view" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <iframe 
          id="target-iframe" 
          src={targetUrl} 
          title="Aegis Pets SOS App"
          allow="geolocation; camera; microphone; fullscreen"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    );
  }

  // If opened in a regular mobile browser, still show the install page
  return (
    <div id="browser-installer-view" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <div className="ambient-glow"></div>
      <RegistrationForm />
    </div>
  )
}

export default App
