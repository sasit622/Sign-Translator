
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="signx-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold signx-gradient-text">SignX</span>
            </Link>
            <p className="text-slate-300 mb-4 max-w-md">
              Empowering communication through sign language. Our mission is to bridge gaps and 
              create a more inclusive world through accessible education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-signx-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-300 hover:text-signx-purple transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/practice" className="text-slate-300 hover:text-signx-purple transition-colors">Practice</Link>
              </li>
              <li>
                <Link to="/library" className="text-slate-300 hover:text-signx-purple transition-colors">Library</Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">About Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-signx-purple transition-colors">Sign Language News</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-slate-300">Email: signX@gmail.com</li>
              <li className="text-slate-300">Phone: 9150513533</li>
              <li className="text-slate-300">Address: SRM UNIVERSITY  Potheri , Chennai Tamilnadu-600001 </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 mt-8 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center">
            &copy; {new Date().getFullYear()} SignX. Kavin  Kabilan SasiTharan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
