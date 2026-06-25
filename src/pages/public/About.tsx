import React from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Truck, Clock, Eye, Target, Users, Star, Quote } from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import SEO from '../../components/SEO';
import { useSettings } from '../../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();
  
  const testimonials = settings.testimonials.length > 0 ? settings.testimonials : [
    { name: "Ramakrishna V.", role: "Plant Operator (Guntur)", content: "The Water ATM systems from RegilAqua are rugged. The card sync is perfect and local service is just a phone call away.", rating: 5 },
    { name: "Anjali Devi", role: "School Administrator", content: "We installed the 50 LPH system for our primary wing. Water taste is excellent and maintenance is very low compared to our old unit.", rating: 5 },
    { name: "Prasad Rao", role: "Industrial Manager", content: "The 500 LPH RO plant has been running 12 hours a day for a year. Not a single breakdown. Excellent component quality.", rating: 5 }
  ];

  return (
    <div className="py-20 bg-white">
      <SEO 
        title="About Our Journey" 
        description="Learn about the story of RegilAqua, our mission to provide pure water across Andhra Pradesh, and our commitment to using global technology for local water solutions."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-regil-sky/10 text-regil-blue text-[10px] font-black uppercase tracking-widest mb-6 border border-regil-sky/20 rounded-none">Our Journey</span>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              About Our <span className="text-regil-blue underline decoration-regil-sky underline-offset-8">Company</span>
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
              Founded in Andhra Pradesh, RegilAqua was born with a simple yet powerful mission: 
              To bridge the gap between global water purification technology and local community needs. We don't just sell machines; we architect pure water ecosystems.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Our founder, having recognized the diverse water challenges across the state—from heavy 
              mineral content in coastal regions to complex industrial pollutants in cities—began sourcing high-performance components 
              from international markets. Today, we stand as a trusted label for premium RO Plants, 
              Water ATMs, and domestic purifiers.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl group rounded-none">
                <Globe className="text-regil-blue w-8 h-8 mb-4 group-hover:rotate-12 transition-transform" />
                <h4 className="font-black text-slate-900 mb-1">Global Sourcing</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Premium Import Parts</p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl group rounded-none">
                <ShieldCheck className="text-regil-blue w-8 h-8 mb-4 group-hover:rotate-12 transition-transform" />
                <h4 className="font-black text-slate-900 mb-1">Local Service</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">AP Wide Support</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
              alt="Lab testing"
              className="w-full h-[300px] object-cover border-4 border-slate-50 shadow-2xl rounded-none"
            />
            <img
              src="https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?auto=format&fit=crop&q=80&w=600"
              alt="Installation"
              className="w-full h-[300px] object-cover mt-8 border-4 border-slate-50 shadow-2xl rounded-none"
            />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="p-12 bg-regil-indigo text-white shadow-2xl relative overflow-hidden group rounded-none">
            <Eye className="absolute -right-8 -top-8 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                <Eye className="w-8 h-8 text-regil-sky" />
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">Our Vision</h2>
              <p className="text-regil-light text-lg leading-relaxed font-medium">
                To become the most reliable water technology partner in South India, transforming every drop into a promise of health and every installation into a hallmark of engineering excellence.
              </p>
            </div>
          </div>
          <div className="p-12 bg-regil-blue text-white shadow-2xl relative overflow-hidden group rounded-none">
            <Target className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 group-hover:-rotate-12 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-8 border border-white/20">
                <Target className="w-8 h-8 text-regil-sky" />
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">Our Mission</h2>
              <p className="text-regil-light text-lg leading-relaxed font-medium">
                By integrating cutting-edge global filtration systems with rigorous local service standards, we ensure that every community, factory, and home has access to the highest quality drinking water.
              </p>
            </div>
          </div>
        </div>


        {/* Why Trust Us */}
        <div className="bg-slate-900 p-12 md:p-20 relative overflow-hidden mb-32 rounded-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-regil-blue opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-regil-indigo opacity-20 blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Why Choose Us?</h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              We don't just sell equipment; we provide end-to-end water security solutions 
              that power businesses and keep families healthy.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Truck className="w-12 h-12 text-regil-sky" />,
                title: 'Ready Stock',
                desc: 'Huge inventory of filters, membranes, and spares for immediate shipping or installation.'
              },
              {
                icon: <Clock className="w-12 h-12 text-regil-sky" />,
                title: 'Fast Deployment',
                desc: 'Our team can set up a commercial RO plant or Water ATM within 48-72 hours of order.'
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-regil-sky" />,
                title: 'Warranty Support',
                desc: 'Every "RegilAqua" labeled product comes with committed on-site warranty support.'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center group p-8 border border-white/5 hover:bg-white/5 transition-all rounded-none">
                <div className="flex justify-center mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-regil-indigo font-black uppercase tracking-widest text-xs mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Client Testimonials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-10 border border-slate-200 bg-white relative group hover:shadow-2xl transition-all rounded-none">
                <div className="flex text-regil-orange mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("w-5 h-5", i < (t.rating || 5) ? "fill-current" : "text-slate-300")} />
                  ))}
                </div>
                <p className="text-slate-700 mb-8 leading-relaxed font-medium uppercase text-sm tracking-tight line-clamp-4">"{t.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-regil-sky/20 flex items-center justify-center font-black text-regil-blue rounded-none">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 tracking-tight">{t.name}</h5>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black leading-none">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

