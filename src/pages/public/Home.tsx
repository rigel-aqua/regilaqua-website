import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Cog, 
  Users, 
  ArrowRight, 
  Smartphone as WhatsApp,
  Globe,
  Settings,
  Truck,
  ChevronDown,
  Star,
  CheckCircle2,
  MapPin,
  Trophy,
  Award,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import ContactForm from '../../components/ContactForm';
import { useSettings } from '../../context/SettingsContext';
import SEO from '../../components/SEO';

export default function Home() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<string | undefined>();
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const { settings } = useSettings();

  const openContact = (product?: string) => {
    setSelectedProduct(product);
    setIsContactOpen(true);
  };

  const banners = settings.heroBanners.length > 0 ? settings.heroBanners : [
    {
      title: "The Pure Standard.",
      subtitle: "Imported technology. Locally perfected. We deliver the most advanced RO and Water ATM systems in Andhra Pradesh.",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=2000"
    }
  ];

  const testimonials = settings.testimonials.length > 0 ? settings.testimonials : [
    { name: "Ramakrishna V.", role: "Plant Operator (Guntur)", content: "The Water ATM systems from RegilAqua are rugged. The card sync is perfect and local service is just a phone call away.", rating: 5 },
    { name: "Anjali Devi", role: "School Administrator", content: "We installed the 50 LPH system for our primary wing. Water taste is excellent and maintenance is very low compared to our old unit.", rating: 5 },
    { name: "Prasad Rao", role: "Industrial Manager", content: "The 500 LPH RO plant has been running 12 hours a day for a year. Not a single breakdown. Excellent component quality.", rating: 5 }
  ];

  const faqs = settings.faqs.length > 0 ? settings.faqs : [
    { question: "What capacity RO plant do I need for a 100-person office?", answer: "For an office of 100 people, we typically recommend a 25 LPH or 50 LPH system with a storage tank of at least 50-100 liters to handle peak hours." },
    { question: "Do you provide installation in rural Andhra Pradesh?", answer: "Yes, RegilAqua has a dedicated network of technicians across all districts of AP, including rural areas and industrial zones." }
  ];

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Advanced Water Purification Solutions" 
        description="RegilAqua is Andhra Pradesh's most trusted provider of Industrial RO Plants and Water ATM systems. Quality water for community and industry."
      />
      {/* Dynamic Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
          <motion.div
            key={`content-${currentBanner}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-none bg-regil-blue/20 text-regil-sky text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm border border-regil-sky/30">
              Trusted by 5000+ Customers
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-6 tracking-tighter">
              {banners[currentBanner].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed max-w-lg font-medium">
              {banners[currentBanner].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => openContact()}
                className="inline-flex items-center justify-center space-x-3 bg-regil-orange hover:bg-regil-orange/90 text-white px-10 py-5 rounded-none font-black transition-all shadow-2xl shadow-regil-orange/40 group text-lg"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-none font-black transition-all backdrop-blur-md border border-white/20"
              >
                <WhatsApp className="w-5 h-5 text-regil-green" />
                <span>Instant Inquiry</span>
              </a>
            </div>
          </motion.div>
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-12 right-12 z-20 flex space-x-3">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={cn(
                  "h-1 transition-all rounded-none",
                  currentBanner === idx ? "w-12 bg-regil-sky" : "w-6 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-regil-blue">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-12">
          {[
            { label: 'Verified Clients', value: '5K+' },
            { label: 'Units Installed', value: '1.2K' },
            { label: 'AP Service Points', value: '24/7' },
            { label: 'Quality Rating', value: '4.9/5' },
          ].map((stat, idx) => (
            <div key={idx} className="flex-1 min-w-[150px] text-center border-l first:border-0 border-regil-sky/30">
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-regil-sky text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - The RegilAqua Edge */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-regil-orange font-black uppercase tracking-widest text-xs mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Operational Methodology</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 w-full bg-slate-100 rounded-none overflow-hidden border border-slate-100 p-1">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Sourcing',
                desc: 'Procuring Tier-1 membranes and high-pressure pumps directly from top international manufacturers.'
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: 'Custom Assembly',
                desc: 'Every system is precision-engineered based on your specific local water TDS and chemical profile.'
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Rapid Installation',
                desc: 'Our specialized teams deploy and commission systems within 48 hours anywhere in Andhra Pradesh.'
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: 'Active Maintenance',
                desc: 'Comprehensive 24/7 service support and real-time monitoring to guarantee zero operational downtime.'
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-10 bg-white border border-transparent hover:border-slate-200 transition-all hover:shadow-2xl">
                <div className="text-regil-blue mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Our Facility" 
                className="w-full aspect-square object-cover rounded-none shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-regil-blue z-0 hidden lg:block" />
              <div className="absolute top-10 left-10 p-8 bg-white shadow-2xl z-20 hidden lg:block">
                <div className="text-4xl font-black text-regil-blue mb-1">15+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Expertise</div>
              </div>
            </div>
            <div>
              <span className="text-regil-blue font-black uppercase tracking-widest text-[10px] mb-4 inline-block">About Us</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">Company Profile</h2>
              <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
                Founded in Andhra Pradesh, we bridged the gap between international water purification standards and local community needs. We don't just sell filters; we engineer trust.
              </p>
              <div className="space-y-4 mb-10">
                {['Direct International Sourcing', 'Customized TDS Calibration', '24/7 AP-Wide Service Network'].map((item) => (
                  <div key={item} className="flex items-center space-x-3 text-slate-900 font-black text-sm uppercase tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-regil-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center space-x-2 text-regil-blue font-black uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
                <span>Learn more about our journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-regil-orange font-black uppercase tracking-widest text-xs mb-4">Products</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Featured Products</h3>
            </div>
            <Link to="/products" className="bg-slate-900 text-white px-8 py-4 rounded-none font-black uppercase tracking-widest text-xs hover:bg-regil-blue transition-colors shadow-xl">
              View Entire Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                id: 'water-atm',
                name: 'Smart Water ATM Kiosk',
                category: 'Water ATM',
                image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800',
                desc: 'RFID and Coin operated automated vending with GSM monitoring.'
              },
              {
                id: 'industrial-ro',
                name: 'Industrial RO - 500 LPH',
                category: 'Industrial',
                image: 'https://images.unsplash.com/photo-1581093577421-f561a654a353?auto=format&fit=crop&q=80&w=800',
                desc: 'Heavy-duty purification for factories and large offices.'
              },
              {
                id: 'components',
                name: 'High-Pressure Pumps',
                category: 'Components',
                image: 'https://images.unsplash.com/photo-1585837509811-362bb20d663b?auto=format&fit=crop&q=80&w=800',
                desc: 'Tier-1 imported pumps for maximum system longevity.'
              }
            ].map((p) => (
              <Link key={p.id} to="/products" className="group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100 mb-6 rounded-none relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-regil-blue border border-slate-200">
                    {p.category}
                  </div>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-regil-blue transition-colors">{p.name}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Excellence Section - Bento Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-regil-indigo font-black uppercase tracking-widest text-xs mb-4">Technology</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Core Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 md:row-span-2 bg-slate-50 rounded-none p-12 border border-slate-100 flex flex-col justify-center group relative overflow-hidden">
              <div className="relative z-10">
                <Trophy className="w-16 h-16 text-regil-blue mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter">High-Pressure Excellence</h4>
                <p className="text-slate-600 font-medium leading-relaxed max-w-sm mb-10 text-lg">
                  Utilizing Italian high-pressure pumps and Japanese membranes to ensure 99.9% salt rejection even at 5000+ TDS levels.
                </p>
                <button 
                  onClick={() => openContact("Industrial RO")}
                  className="px-10 py-4 bg-regil-blue text-white rounded-none font-black hover:bg-regil-blue/90 transition-all uppercase text-xs tracking-[0.2em] shadow-xl shadow-regil-blue/20"
                >
                  Technical Specs
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-regil-blue/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl group-hover:bg-regil-blue/10 transition-colors" />
            </div>

            <div className="bg-regil-indigo rounded-none p-10 text-white flex flex-col justify-between group relative overflow-hidden">
              <Award className="w-12 h-12 text-regil-sky mb-8 group-hover:rotate-12 transition-transform duration-500 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-black mb-3 tracking-tight">Grade A Material</h4>
                <p className="text-regil-sky text-sm md:text-base font-medium leading-relaxed">Food-grade SS 316 / 304 vessels used in all our commercial plants.</p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            <div className="bg-regil-orange rounded-none p-10 text-white flex flex-col justify-between group relative overflow-hidden">
              <Zap className="w-12 h-12 text-white/50 mb-8 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-black mb-3 tracking-tight">Power Efficient</h4>
                <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">Smart VFD drives that save up to 30% electricity consumption.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            <div className="md:col-span-2 bg-slate-900 rounded-none p-10 flex flex-col md:flex-row items-center gap-10 group overflow-hidden relative">
              <div className="flex-1 z-10 text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">24/7 Smart Telemetry</h4>
                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  All our Water ATMs feature GSM-based remote monitoring for flow and collection data, managed via secure cloud dashboard.
                </p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-regil-blue/10 rounded-none flex items-center justify-center border border-white/5 relative z-10 group-hover:bg-regil-blue/20 transition-all duration-500">
                <Activity className="w-10 h-10 md:w-14 md:h-14 text-regil-sky animate-pulse" />
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-regil-blue/5 translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-regil-blue font-black uppercase tracking-widest text-xs mb-4">Categories</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Product Categories</h3>
            </div>
            <Link to="/products" className="text-regil-blue font-black flex items-center space-x-2 group uppercase text-xs tracking-widest">
              <span>View all products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(settings.featuredCollections?.length > 0 ? settings.featuredCollections : [
              { id: '1', title: 'Water ATM Ecosystem', badge: 'Hot Seller', desc: 'Automated vending with RFID and Coin support.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800' },
              { id: '2', title: 'Industrial RO Series', badge: 'Expert Choice', desc: '250 LPH to 1000 LPH High-pressure systems.', image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=800' },
              { id: '3', title: 'Genuine Components', badge: 'In Stock', desc: 'Membranes, Filters, and Media for all brands.', image: 'https://images.unsplash.com/photo-1585837509811-362bb20d663b?auto=format&fit=crop&q=80&w=800' },
            ]).map((col, idx) => (
              <Link to="/products" key={col.id || idx} className="group relative rounded-none overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50">
                <img src={col.image} alt={col.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="inline-block px-3 py-1 bg-regil-blue text-[10px] font-black text-white uppercase tracking-wider rounded-none mb-4">
                    {col.badge}
                  </span>
                  <h4 className="text-2xl font-black text-white mb-2 tracking-tight">{col.title}</h4>
                  <p className="text-slate-300 text-sm font-medium">{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-regil-blue font-black uppercase tracking-widest text-xs mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Client Testimonials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-10 rounded-none border border-slate-100 bg-slate-50 relative group hover:shadow-2xl transition-all">
                <div className="flex text-regil-orange mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("w-5 h-5", i < (t.rating || 5) ? "fill-current" : "text-slate-300")} />
                  ))}
                </div>
                <p className="text-slate-700 mb-8 leading-relaxed font-medium uppercase text-sm tracking-tight line-clamp-4">"{t.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-regil-sky/20 rounded-none flex items-center justify-center font-black text-regil-blue">
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
      </section>

      {/* Dynamic FAQ Section */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#7fbddb,transparent_60%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Frequently Asked Questions</h3>
            <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Common inquiries about our systems</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-md rounded-none border border-white/10 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className={cn(
                    "font-black text-lg transition-colors tracking-tight",
                    activeFaq === idx ? "text-regil-sky" : "text-white group-hover:text-regil-sky"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    activeFaq === idx ? "rotate-180 text-regil-sky" : "text-slate-500"
                  )} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === idx ? 'auto' : 0, opacity: activeFaq === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 font-medium">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-regil-indigo rounded-none p-12 md:p-20 text-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(66,56,139,0.3)]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-regil-blue rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-regil-sky rounded-full opacity-30 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Contact Us</h2>
              <p className="text-regil-light text-xl mb-12 max-w-2xl mx-auto font-medium">
                Whether it's a home purifier or a 10,000 LPH community plant, RegilAqua has the technology and local expertise to deliver.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-regil-blue px-10 py-5 rounded-none font-black flex items-center space-x-3 transition-all hover:scale-105 shadow-2xl"
                >
                  <WhatsApp className="w-6 h-6 text-regil-green" />
                  <span>Consult on WhatsApp</span>
                </a>
                <button
                  onClick={() => openContact()}
                  className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-none font-black border border-white/20 transition-all backdrop-blur-sm uppercase text-sm tracking-widest"
                >
                  Request Call Back
                </button>
              </div>

              <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center space-x-2 text-white font-black tracking-widest text-lg">
                  <CheckCircle2 className="w-6 h-6 text-regil-green" />
                  <span>ISO 9001</span>
                </div>
                <div className="flex items-center space-x-2 text-white font-black tracking-widest text-lg">
                  <CheckCircle2 className="w-6 h-6 text-regil-green" />
                  <span>BIS CERTIFIED</span>
                </div>
                <div className="flex items-center space-x-2 text-white font-black tracking-widest text-lg">
                  <CheckCircle2 className="w-6 h-6 text-regil-green" />
                  <span>GMP COMPLIANT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        product_name={selectedProduct}
      />
    </div>
  );
}

