import { useState, useEffect } from 'react';

export function Navigation() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const observeSections = () => {
      const sections = document.querySelectorAll('section[data-theme]');
      const headerHeight = 100; // approximate header height
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const theme = section.getAttribute('data-theme') as 'dark' | 'light';
        
        // Check if section is in the viewport near the top (where header is)
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          setCurrentTheme(theme);
        }
      });
    };

    // Observe on scroll in the container
    const container = document.querySelector('.snap-y');
    if (container) {
      container.addEventListener('scroll', observeSections);
    }
    
    // Fallback to window scroll
    window.addEventListener('scroll', observeSections);
    
    // Initial check
    observeSections();

    return () => {
      if (container) {
        container.removeEventListener('scroll', observeSections);
      }
      window.removeEventListener('scroll', observeSections);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  // Theme-specific styles
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const defaultOpacity = isDark ? 'opacity-80' : 'opacity-70';

  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-50">
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => scrollToSection('home')}
            className={`text-sm ${textColor} ${defaultOpacity} hover:opacity-100 tracking-wider transition-all duration-200`}
            style={{ fontWeight: 500 }}
          >
            B.B.
          </button>
          <div className="flex gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm ${textColor} ${defaultOpacity} hover:opacity-100 transition-all duration-200`}
                style={{ fontWeight: 400 }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}