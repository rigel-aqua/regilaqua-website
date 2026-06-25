import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { inquiryService } from '../services/inquiryService';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  product_name?: string;
}

export default function ContactForm({ isOpen, onClose, product_name }: ContactFormProps) {
  const { settings } = useSettings();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to inquiry service
    inquiryService.addInquiry({
      ...formData,
      product_name
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-none shadow-2xl overflow-hidden"
          >
            <div className="bg-regil-blue p-8 text-white">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-black mb-2">Get a Quote</h2>
              <p className="text-regil-sky font-bold">
                {product_name ? `Inquiry for: ${product_name}` : "We'll get back to you within 24 hours."}
              </p>
            </div>

            <div className="p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-regil-green/20 text-regil-green rounded-none flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 font-medium">Thank you for reaching out. We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                        <User className="w-3 h-3 mr-2" /> Full Name
                      </label>
                      <input 
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-regil-blue/20 font-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                        <Phone className="w-3 h-3 mr-2" /> Phone Number
                      </label>
                      <input 
                        required
                        type="tel"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-regil-blue/20 font-black"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                      <Mail className="w-3 h-3 mr-2" /> Email Address
                    </label>
                    <input 
                      required
                      type="email"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-regil-blue/20 font-black"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center">
                      <MessageSquare className="w-3 h-3 mr-2" /> Your Message
                    </label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-regil-blue/20 font-black resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-regil-blue hover:bg-regil-blue/90 text-white rounded-none font-black transition-all shadow-xl shadow-regil-blue/20 flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-none animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
