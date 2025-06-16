import React from 'react';
import { Brain, Heart, Mail, Github, Twitter, Linkedin, ArrowUp, Sparkles } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50`}></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    BizzyBrain
                  </h3>
                  <p className="text-slate-400 font-medium">Learn • Discover • Grow</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-8 max-w-md leading-relaxed text-lg">
                Transforming complex social and economic concepts into engaging, accessible learning experiences for curious minds everywhere.
              </p>
              
              <div className="flex items-center space-x-2 text-slate-400 mb-8">
                <span>Crafted with</span>
                <Heart className="w-5 h-5 text-rose-400 fill-current animate-pulse" />
                <span>for the next generation of learners</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {[
                  { icon: Mail, href: '#', label: 'Email' },
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="group w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  'Browse Terms',
                  'Learning Paths',
                  'Categories',
                  'My Progress',
                  'Favorites',
                  'Achievements'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-rose-400" />
                Support
              </h4>
              <ul className="space-y-4">
                {[
                  'Help Center',
                  'Parent Guide',
                  'Teacher Resources',
                  'Contact Us',
                  'Privacy Policy',
                  'Terms of Service'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 BizzyBrain. All rights reserved. Building the future of education.
              </p>
              
              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="text-slate-400 group-hover:text-white transition-colors duration-300">
                  Back to top
                </span>
                <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;