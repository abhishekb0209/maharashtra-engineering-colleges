import { GraduationCap, Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">MH Colleges</span>
            </div>
            <p className="text-sm">
              Your comprehensive guide to engineering colleges in Maharashtra with
              intelligent recommendations and cutoff predictions.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/colleges" className="hover:text-blue-400">Browse Colleges</a></li>
              <li><a href="/recommendations" className="hover:text-blue-400">Get Recommendations</a></li>
              <li><a href="/compare" className="hover:text-blue-400">Compare Colleges</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">CET Cell Official</a></li>
              <li><a href="#" className="hover:text-blue-400">AICTE</a></li>
              <li><a href="#" className="hover:text-blue-400">NAAC</a></li>
              <li><a href="#" className="hover:text-blue-400">NBA</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:abhishekofficial0209@gmail.com" className="flex items-center space-x-2 hover:text-blue-400">
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </a>
              <a href="https://github.com/abhishekb0209" className="flex items-center space-x-2 hover:text-blue-400">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 Maharashtra Engineering Colleges Portal. All rights reserved.</p>
          <p className="mt-2">Data sourced from CET Cell, AICTE, and official college websites.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
