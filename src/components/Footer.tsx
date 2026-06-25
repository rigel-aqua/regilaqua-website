import React from 'react';
import { Droplets, Mail, Phone, MapPin, Smartphone as WhatsApp, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Logo className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Leading the way in water purification across Andhra Pradesh. 
              Importing global technology for local excellence.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href={settings.facebookUrl} aria-label="Follow us on Facebook" className="p-2 bg-slate-800 hover:bg-regil-blue text-slate-400 hover:text-white rounded-none transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings.instagramUrl} aria-label="Follow us on Instagram" className="p-2 bg-slate-800 hover:bg-regil-blue text-slate-400 hover:text-white rounded-none transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings.linkedinUrl} aria-label="Follow us on LinkedIn" className="p-2 bg-slate-800 hover:bg-regil-blue text-slate-400 hover:text-white rounded-none transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={settings.twitterUrl} aria-label="Follow us on Twitter" className="p-2 bg-slate-800 hover:bg-regil-blue text-slate-400 hover:text-white rounded-none transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
              <li><Link to="/faqs" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products?category=Domestic" className="hover:text-blue-400 transition-colors">Domestic Purifiers</Link></li>
              <li><Link to="/products?category=Commercial" className="hover:text-blue-400 transition-colors">Commercial RO Plants</Link></li>
              <li><Link to="/products?category=Water ATM" className="hover:text-blue-400 transition-colors">Water ATM Systems</Link></li>
              <li><Link to="/products?category=Spares" className="hover:text-blue-400 transition-colors">Genuine Spares</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-regil-blue shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-regil-blue shrink-0" />
                <span>{settings.contactNumber}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-regil-blue shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col justify-center items-center space-y-4">
          <div className="text-center text-xs text-slate-500 font-medium space-y-1">
            <p>Trade Name: <span className="text-slate-400">K K INDUSTRIES</span> | Proprietor: <span className="text-slate-400">VELUKURI KOMALA REDDY</span></p>
            <p>GSTIN: <span className="text-slate-400">37ANVPV3364N1ZT</span></p>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} K K Industries. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors font-medium">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-500 hover:text-white transition-colors font-medium">Terms of Service</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp for all pages */}
      <a
        href={`https://wa.me/${settings.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-8 right-8 z-50 bg-regil-green text-white p-4 rounded-none shadow-2xl hover:scale-110 transition-transform md:hidden flex items-center justify-center"
      >
        <WhatsApp className="w-6 h-6" />
      </a>
    </footer>
  );
}
