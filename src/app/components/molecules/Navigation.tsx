import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/atoms';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Background' },
  { id: 'contact', label: 'Contact' },
] as const;

export function Navigation() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const headerY = 80; // ligne sous la barre de nav

    const observeSections = () => {
      const sections = document.querySelectorAll('section[data-theme]');
      let found: 'dark' | 'light' | null = null;
      let bestTop = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom >= headerY) {
          const theme = section.getAttribute('data-theme') as 'dark' | 'light';
          if (rect.top < bestTop) {
            bestTop = rect.top;
            found = theme;
          }
        }
      });

      setCurrentTheme(found ?? 'dark'); // défaut dark = texte clair sur Hero
    };

    const container = document.querySelector('[data-scroll-container]');
    if (container) container.addEventListener('scroll', observeSections);
    observeSections();

    return () => {
      if (container) container.removeEventListener('scroll', observeSections);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const isDark = currentTheme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const defaultOpacity = isDark ? 'opacity-80' : 'opacity-70';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/5' : 'bg-white/5'}`}>
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="nav"
              size="sm"
              className={`${textColor} ${defaultOpacity}`}
              style={{ fontWeight: 500 }}
              onClick={() => scrollToSection('home')}
            >
              B.B.
            </Button>
          </motion.div>

          {/* Desktop: horizontal links */}
          <div className="hidden md:flex gap-2">
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="nav"
                  size="sm"
                  className={`${textColor} ${defaultOpacity}`}
                  style={{ fontWeight: 400 }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mobile: hamburger */}
          <motion.button
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`md:hidden p-2 rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${textColor} ${defaultOpacity} hover:opacity-100`}
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu rendu dans document.body — thème = page derrière (noir sur noir, blanc sur blanc) */}
      {menuOpen &&
        createPortal(
          <>
            <div
              className="md:hidden fixed inset-0 z-[55] bg-black/70"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <div
              className={`md:hidden fixed top-0 right-0 bottom-0 z-[60] w-[280px] shadow-xl rounded-l-2xl overflow-hidden ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}
              role="dialog"
              aria-modal
              aria-label="Menu"
            >
              <div style={{ padding: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  aria-label="Fermer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: 8,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isDark ? 'rgba(255,255,255,0.7)' : '#64748b',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: '16px 0' }}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 20px',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDark ? 'rgba(255,255,255,0.9)' : '#1e293b',
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>,
          document.body
        )}
    </nav>
  );
}