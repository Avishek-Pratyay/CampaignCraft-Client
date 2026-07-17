import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white font-extrabold text-lg">
              <Bot className="h-5 w-5 text-brand-primary" />
              <span>
                Campaign<span className="text-brand-secondary">Craft</span>
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Empowering marketing agencies and brand creators with autonomous agentic intelligence. Automate copywriting, performance analysis, and budget optimization.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-muted hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-muted hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-muted hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Workspace</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-brand-muted hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-brand-muted hover:text-white transition-colors">Explore campaigns</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-brand-muted hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-brand-muted hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/generator" className="text-sm text-brand-muted hover:text-white transition-colors">AI Content Generator</Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-sm text-brand-muted hover:text-white transition-colors">AI Data Analyzer</Link>
              </li>
              <li>
                <Link to="/explore?status=Active" className="text-sm text-brand-muted hover:text-white transition-colors">Smart Recommender</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-brand-muted hover:text-white transition-colors">Agentic Core</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-brand-muted">
                <MapPin className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <span>100 AI Innovation Boulevard, Suite 500, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-brand-muted">
                <Phone className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                <span>+1 (555) 309-1229</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-brand-muted">
                <Mail className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                <span>support@campaigncraft.ai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-muted space-y-4 md:space-y-0">
          <p>&copy; {currentYear} CampaignCraft AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
