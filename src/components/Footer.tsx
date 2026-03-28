import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Youtube, Github } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'NowSecure Platform', path: '/products' },
    { name: 'NowSecure Workstation', path: '/products' },
    { name: 'NowSecure Shield', path: '/products' },
    { name: 'NowSecure API Security', path: '/products' },
    { name: 'NowSecure Cloud Defense', path: '/products' },
  ],
  solutions: [
    { name: 'Website Firewall', path: '/services' },
    { name: 'Malware Protection', path: '/services' },
    { name: 'DDoS Mitigation', path: '/services' },
    { name: 'Vulnerability Patching', path: '/services' },
    { name: 'Threat Intelligence', path: '/services' },
  ],
  company: [
    { name: 'About Us', path: '/' },
    { name: 'Partnerships', path: '/partnerships' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/contact' },
    { name: 'Contact', path: '/contact' },
  ],
  resources: [
    { name: 'Documentation', path: '/platform' },
    { name: 'API Reference', path: '/platform' },
    { name: 'Security Blog', path: '/' },
    { name: 'Case Studies', path: '/industries' },
    { name: 'Support', path: '/contact' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/NowSecure', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/nowsecure', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UC297YyKtSDb22sjpL-S9uVA', label: 'YouTube' },
  { icon: Github, href: 'https://github.com/nowsecure', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/logo.png" 
                alt="NowSecure" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Enterprise-grade cybersecurity solutions protecting websites, servers, and cloud infrastructure worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NowSecure. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
