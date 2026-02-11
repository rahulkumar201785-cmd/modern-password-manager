import React from 'react';
import { Shield, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div className='flex items-center gap-3'>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent'>
                PassManager
              </h1>
              <p className="text-xs text-gray-400">Secure Password Vault</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Security</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</a>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Star on GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-4">
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">Security</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">About</a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-full w-fit"
            >
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;