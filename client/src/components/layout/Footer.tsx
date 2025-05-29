// client/src/components/layout/Footer.tsx
import React from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon
} from 'lucide-react'; // Using lucide-react for icons

const links = {
  shop: [
    'All Products',
    'New Arrivals',
    'Best Sellers',
    'Sale',
    'Apparel',
    'Electronics',
  ],
  help: [
    'Customer Service',
    'Track Your Order',
    'Returns & Exchanges',
    'Shipping Information',
    'FAQs',
  ],
  about: ['Our Story', 'Careers', 'Press', 'Affiliates'],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-200 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <a href="/" className="text-3xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
              Eclypse
            </a>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Curated lifestyle collections designed for the modern individual. Discover quality and style in every detail.
            </p>
          </div>

          {/* Dynamic Link Lists */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-300 mb-4">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 hover:text-white transition-all duration-200 hover:translate-x-1 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-300 mb-4">Contact</h4>
            <p className="text-sm text-zinc-400 mb-1">123 Eclypse St, Web City, 90210</p>
            <p className="text-sm text-zinc-400 mb-4">support@eclypse.com</p>

            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook" className="hover:text-indigo-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-indigo-400 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-indigo-400 transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Eclypse. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Built with <span className="text-red-500">❤</span> by the Eclypse team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;