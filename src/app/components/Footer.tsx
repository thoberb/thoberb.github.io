import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl mb-2">Blandine Berthod</h3>
            <p className="text-gray-400">Product Builder · Product Manager</p>
          </div>
          
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/blandine-berthod-02379b133"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Blandine Berthod. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
