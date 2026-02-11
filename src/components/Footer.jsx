import React from "react";
import { Shield, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className='flex items-center gap-3 mb-4'>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className='text-2xl font-bold text-white'>PassManager</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A secure, modern password manager built with React and local encryption. 
              Your data stays on your device, ensuring maximum privacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" 
                 className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                 className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                 className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} PassManager. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Rahul
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;