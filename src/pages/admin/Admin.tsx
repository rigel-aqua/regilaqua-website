import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, Package, LayoutDashboard, Image as ImageIcon, CheckCircle2, AlertCircle, Settings, Globe, MessageSquare, Star, ExternalLink, ShieldCheck, Search, Lock, LogOut } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { blogService } from '../../services/blogService';
import { productService } from '../../services/productService';
import { settingsService, SiteSettings, HeroBanner, Testimonial, FAQ, SEOSettings, FeaturedCollection } from '../../services/settingsService';
import { inquiryService, Inquiry } from '../../services/inquiryService';
import { Product, Blog } from '../../types';
import Markdown from 'react-markdown';
import { cn } from '../../lib/utils';
import Logo from '../../components/Logo';
import ImageUpload from '../../components/admin/ImageUpload';

export default function Admin() {
  const [activeTab, setActiveTab] = React.useState<'products' | 'blogs' | 'inquiries' | 'settings'>('products');
  const [products, setProducts] = React.useState<Product[]>([]);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isEditingBlog, setIsEditingBlog] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<Partial<Product>>({
    name: '',
    category: 'Domestic',
    description: '',
    price: '',
    image: '',
    images: [],
    amazonUrl: '',
    specs: [],
    features: [],
    inStock: true
  });
  const [currentBlog, setCurrentBlog] = React.useState<Partial<Blog>>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'RegilAqua Admin',
    tags: []
  });
  const [specInput, setSpecInput] = React.useState('');
  const [tagInput, setTagInput] = React.useState('');
  const [featureInput, setFeatureInput] = React.useState({ label: '', value: '' });
  const [categoryInput, setCategoryInput] = React.useState('');
  const [imageInput, setImageInput] = React.useState('');
  const [toast, setToast] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<SiteSettings>(settingsService.DEFAULT_SETTINGS);

  const [seo, setSeo] = React.useState<SEOSettings>({
    title: '',
    description: '',
    keywords: '',
    ogImage: ''
  });
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPass, setLoginPass] = React.useState('');

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsAuthenticated(!!currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    
    loadProducts();
    loadInquiries();
    loadBlogs();
    loadSEO();

    return () => unsubscribe();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadBlogs = async () => {
    try {
      const data = await blogService.getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadInquiries = async () => {
    try {
      const data = await inquiryService.getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSEO = async () => {
    try {
      const data = await settingsService.getSEO();
      setSeo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.category) {
      showToast('Name and Category are required');
      return;
    }
    await productService.saveProduct(currentProduct as Product);
    showToast(`Product ${currentProduct.id ? 'updated' : 'added'} successfully`);
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      category: 'Domestic',
      description: '',
      price: '',
      image: '',
      amazonUrl: '',
      specs: [],
      inStock: true
    });
    setSpecInput('');
    loadProducts();
  };

  const handleBlogSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await blogService.saveBlog(currentBlog as any);
    loadBlogs();
    setIsEditingBlog(false);
    showToast('Blog article published.');
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('Delete this blog post?')) {
      await blogService.deleteBlog(id);
      loadBlogs();
      showToast('Article deleted.');
    }
  };

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await settingsService.saveSettings(settings);
      showToast('Settings saved successfully');
    } catch (error) {
      console.error(error);
      showToast('Failed to save settings');
    }
  };

  const handleSEOSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await settingsService.updateSEO(seo);
    showToast('SEO Settings Updated Live');
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await productService.deleteProduct(id);
      showToast('Product deleted');
      loadProducts();
    }
  };

  const startEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const addSpec = () => {
    if (specInput.trim()) {
      setCurrentProduct(prev => ({
        ...prev,
        specs: [...(prev.specs || []), specInput.trim()]
      }));
      setSpecInput('');
    }
  };

  const removeSpec = (idx: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      specs: (prev.specs || []).filter((_, i) => i !== idx)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-12 shadow-2xl">
          <div className="mb-10 flex flex-col items-center">
            <Logo className="h-10 w-auto mb-6" />
            <h1 className="text-xl font-black uppercase tracking-widest text-slate-900">Admin Control</h1>
          </div>
          <form className="space-y-6" onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              await signInWithEmailAndPassword(auth, loginEmail, loginPass);
            } catch (error: any) {
              alert(`LOGIN FAILED:\nMessage: ${error.message}\n\nHint: Verify your Firebase credentials.`);
            }
            setLoading(false);
          }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 font-black" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="admin@regilaqua.in" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 font-black" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="••••••••" required />
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-regil-blue text-white py-4 font-black uppercase tracking-widest shadow-xl shadow-regil-blue/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{loading ? 'Authenticating...' : 'Unlock Dashboard'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col hidden lg:flex border-r border-white/5">
        <div className="p-8">
          <div className="mb-10">
            <Logo className="h-8 w-auto brightness-0 invert" />
          </div>
          <nav className="space-y-4">
            <button 
              onClick={() => setActiveTab('products')}
              className={cn(
                "flex items-center space-x-3 w-full text-left px-4 py-3 rounded-none text-sm font-black transition-all",
                activeTab === 'products' ? "bg-regil-blue text-white shadow-lg shadow-regil-blue/20" : "text-slate-400 hover:text-white"
              )}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={cn(
                "flex items-center space-x-3 w-full text-left px-4 py-3 rounded-none text-sm font-black transition-all",
                activeTab === 'blogs' ? "bg-regil-blue text-white shadow-lg shadow-regil-blue/20" : "text-slate-400 hover:text-white"
              )}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Articles & Blog</span>
            </button>
            <button 
              onClick={() => setActiveTab('inquiries')}
              className={cn(
                "flex items-center space-x-3 w-full text-left px-4 py-3 rounded-none text-sm font-black transition-all",
                activeTab === 'inquiries' ? "bg-regil-blue text-white shadow-lg shadow-regil-blue/20" : "text-slate-400 hover:text-white"
              )}
            >
              <MessageSquare className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Inquiries</span>
                {inquiries.filter(i => i.status === 'new').length > 0 && (
                  <span className="bg-regil-orange text-white text-[10px] px-1.5 py-0.5 rounded-none">
                    {inquiries.filter(i => i.status === 'new').length}
                  </span>
                )}
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={cn(
                "flex items-center space-x-3 w-full text-left px-4 py-3 rounded-none text-sm font-black transition-all",
                activeTab === 'settings' ? "bg-regil-blue text-white shadow-lg shadow-regil-blue/20" : "text-slate-400 hover:text-white"
              )}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              onClick={() => signOut(auth)}
              className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-400 hover:text-red-500 transition-colors text-sm font-black mt-10 border border-red-400/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Secure Session</p>
          <p className="text-sm font-bold text-white truncate">{user?.email || 'RegilAqua Admin'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'inquiries' && 'Inquiry Database'}
            {activeTab === 'settings' && 'Global Site Settings'}
          </h2>
          {activeTab === 'products' && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-regil-blue hover:bg-regil-blue/90 text-white px-5 py-2.5 rounded-none text-sm font-black flex items-center space-x-2 transition-all shadow-lg shadow-regil-blue/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'products' && (
              <>
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  {[
                    { label: 'Total Products', value: products.length, icon: <Package className="w-5 h-5 text-regil-blue" /> },
                    { label: 'In Stock', value: products.filter(p => p.inStock).length, icon: <CheckCircle2 className="w-5 h-5 text-regil-green" /> },
                    { label: 'Categories', value: new Set(products.map(p => p.category)).size, icon: <LayoutDashboard className="w-5 h-5 text-purple-500" /> },
                    { label: 'New Leads', value: inquiries.filter(i => i.status === 'new').length, icon: <AlertCircle className="w-5 h-5 text-regil-orange" /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-none border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 bg-slate-50 rounded-none flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Price</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={p.image || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800'} 
                                alt={p.name} 
                                className="w-12 h-12 rounded-none object-cover bg-slate-100"
                              />
                              <div>
                                <p className="font-bold text-slate-900 leading-none mb-1">{p.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate max-w-[150px]">{p.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-regil-sky/10 text-regil-blue rounded-none text-[10px] font-black uppercase tracking-wider">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-black text-slate-700">₹{p.price || 'Ask'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className={cn("w-2 h-2 rounded-none", p.inStock ? "bg-regil-green" : "bg-red-400")} />
                              <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button 
                                onClick={() => startEdit(p)}
                                className="p-2 text-slate-400 hover:text-regil-blue hover:bg-regil-sky/10 rounded-none transition-all"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(p.id, p.name)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-none transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setCurrentBlog({ title: '', excerpt: '', content: '', image: '', author: 'RegilAqua Admin', tags: [] });
                      setIsEditingBlog(true);
                    }}
                    className="bg-regil-blue text-white px-6 py-3 rounded-none font-black flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map(blog => (
                    <div key={blog.id} className="bg-white p-6 rounded-none border border-slate-200 flex space-x-6">
                      <img src={blog.image} className="w-24 h-24 rounded-none object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-slate-900 truncate">{blog.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex space-x-2">
                          <button onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }} className="text-xs font-black text-regil-blue uppercase tracking-widest hover:underline">Edit</button>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Inquiry For</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-bold">
                          No inquiries received yet.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className={cn("hover:bg-slate-50 transition-colors group", inq.status === 'new' && "bg-regil-sky/5")}>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-black text-slate-900 leading-none mb-1">{inq.name}</p>
                              <p className="text-xs text-slate-500 font-medium">{inq.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-regil-blue bg-regil-sky/10 px-2 py-0.5 rounded-none">
                              {inq.productName || 'General Inquiry'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-500">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              value={inq.status}
                              onChange={(e) => {
                                inquiryService.updateStatus(inq.id, e.target.value as any);
                                loadInquiries();
                              }}
                              className={cn(
                                "text-[10px] font-black uppercase px-2 py-1 rounded-none border-0 focus:ring-0 cursor-pointer",
                                inq.status === 'new' ? "bg-regil-orange text-white" : 
                                inq.status === 'read' ? "bg-slate-200 text-slate-600" : "bg-regil-green text-white"
                              )}
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="contacted">Contacted</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => {
                                if(window.confirm('Delete this inquiry?')) {
                                  inquiryService.deleteInquiry(inq.id);
                                  loadInquiries();
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-none transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                {/* Global Info */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center mb-10">
                    <LayoutDashboard className="w-5 h-5 mr-3 text-regil-blue" /> Product Categories
                  </h3>
                  <div className="flex gap-4 mb-6">
                    <input 
                      placeholder="New Category Name..." 
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" 
                      value={categoryInput}
                      onChange={e => setCategoryInput(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        if(categoryInput && !settings.productCategories.includes(categoryInput)) {
                          setSettings({...settings, productCategories: [...settings.productCategories, categoryInput]});
                          setCategoryInput('');
                        }
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-none font-black"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {settings.productCategories.map(cat => (
                      <div key={cat} className="bg-white border-2 border-slate-100 flex items-center space-x-4 px-4 py-2 rounded-none group">
                        <span className="font-black text-sm text-slate-900">{cat}</span>
                        <button 
                          onClick={() => setSettings({...settings, productCategories: settings.productCategories.filter(c => c !== cat)})}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Management */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center mb-10">
                    <Search className="w-5 h-5 mr-3 text-regil-blue" /> Search Engine Optimization (SEO)
                  </h3>
                  <form onSubmit={handleSEOSave} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meta Title (60 chars)</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" value={seo.title} onChange={e => setSeo({...seo, title: e.target.value})} placeholder="RegilAqua | Advanced Water Solutions" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meta Description (160 chars)</label>
                        <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black resize-none" value={seo.description} onChange={e => setSeo({...seo, description: e.target.value})} placeholder="High-end water purification systems..." />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Focus Keywords (Comma separated)</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" value={seo.keywords} onChange={e => setSeo({...seo, keywords: e.target.value})} placeholder="water purifier, industrial RO, RegilAqua" />
                      </div>
                      <ImageUpload 
                        label="OG Image (Social Sharing)"
                        currentUrl={seo.ogImage}
                        onUpload={(url) => setSeo({...seo, ogImage: url})}
                      />
                    </div>
                    <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-none font-black shadow-lg flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Apply SEO Update</span>
                    </button>
                  </form>
                </div>

                {/* Global Info */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center mb-10">
                    <Globe className="w-5 h-5 mr-3 text-regil-blue" /> Site Foundation
                  </h3>
                  <form onSubmit={handleSettingsSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Business Email</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">WhatsApp (incl. country code)</label>
                        <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Factory Address</label>
                      <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black resize-none" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
                    </div>
                    <button type="submit" className="bg-regil-blue text-white px-8 py-3 rounded-none font-black shadow-lg shadow-regil-blue/20 flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Update Core Info</span>
                    </button>
                  </form>
                </div>

                {/* Hero Banners */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                      <ImageIcon className="w-5 h-5 mr-3 text-regil-blue" /> Hero Banners
                    </h3>
                    <button 
                      onClick={() => {
                        const newBanner: HeroBanner = { id: Math.random().toString(), title: 'New Banner', subtitle: '', image: '' };
                        setSettings({...settings, heroBanners: [...settings.heroBanners, newBanner]});
                      }}
                      className="text-regil-blue font-black text-xs uppercase tracking-widest flex items-center hover:underline"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Banner
                    </button>
                  </div>
                  <div className="space-y-6">
                    {settings.heroBanners.map((banner, i) => (
                      <div key={banner.id} className="p-6 bg-slate-50 rounded-none border border-slate-200 relative group">
                        <button onClick={() => setSettings({...settings, heroBanners: settings.heroBanners.filter((_, idx) => idx !== i)})} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input className="w-full px-3 py-2 border rounded-none font-bold" value={banner.title} placeholder="Headline" onChange={e => {
                            const newBanners = [...settings.heroBanners];
                            newBanners[i].title = e.target.value;
                            setSettings({...settings, heroBanners: newBanners});
                          }} />
                          <ImageUpload 
                            label="Banner Image"
                            currentUrl={banner.image}
                            onUpload={(url) => {
                              const newBanners = [...settings.heroBanners];
                              newBanners[i].image = url;
                              setSettings({...settings, heroBanners: newBanners});
                            }}
                          />
                          <textarea className="md:col-span-2 w-full px-3 py-2 border rounded-none font-medium" rows={2} value={banner.subtitle} placeholder="Sub-headline" onChange={e => {
                            const newBanners = [...settings.heroBanners];
                            newBanners[i].subtitle = e.target.value;
                            setSettings({...settings, heroBanners: newBanners});
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bento Section Image */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center mb-10">
                    <ImageIcon className="w-5 h-5 mr-3 text-regil-blue" /> Core Section Background Image
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-6">This image appears in the "The Core of RegilAqua" bento grid section on the home page.</p>
                  <ImageUpload
                    label="Bento Background Image"
                    currentUrl={settings.bentoImage}
                    onUpload={(url) => setSettings({ ...settings, bentoImage: url })}
                  />
                </div>

                {/* Featured Collections */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center mb-10">
                    <ImageIcon className="w-5 h-5 mr-3 text-regil-blue" /> Featured Collections (Home Page Cards)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-6">The 3 product collection cards shown in the "Built for Performance" section on the home page.</p>
                  <div className="space-y-6">
                    {(settings.featuredCollections || []).map((col, i) => (
                      <div key={col.id} className="p-6 bg-slate-50 rounded-none border border-slate-200">
                        <p className="text-[10px] font-black text-regil-blue uppercase tracking-widest mb-4">Card {i + 1}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-none font-bold" value={col.title} placeholder="Card Title" onChange={e => {
                              const updated = [...settings.featuredCollections];
                              updated[i] = { ...updated[i], title: e.target.value };
                              setSettings({ ...settings, featuredCollections: updated });
                            }} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Badge Label</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-none font-bold" value={col.badge} placeholder="e.g. Hot Seller" onChange={e => {
                              const updated = [...settings.featuredCollections];
                              updated[i] = { ...updated[i], badge: e.target.value };
                              setSettings({ ...settings, featuredCollections: updated });
                            }} />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-none font-medium" value={col.desc} placeholder="Short description" onChange={e => {
                              const updated = [...settings.featuredCollections];
                              updated[i] = { ...updated[i], desc: e.target.value };
                              setSettings({ ...settings, featuredCollections: updated });
                            }} />
                          </div>
                        </div>
                        <ImageUpload
                          label="Card Image"
                          currentUrl={col.image}
                          onUpload={(url) => {
                            const updated = [...settings.featuredCollections];
                            updated[i] = { ...updated[i], image: url };
                            setSettings({ ...settings, featuredCollections: updated });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                      <Star className="w-5 h-5 mr-3 text-regil-blue" /> Client Testimonials
                    </h3>
                    <button 
                      onClick={() => {
                        const newTestimonial: Testimonial = { id: Math.random().toString(), name: 'Client Name', role: '', content: '', rating: 5 };
                        setSettings({...settings, testimonials: [...settings.testimonials, newTestimonial]});
                      }}
                      className="text-regil-blue font-black text-xs uppercase tracking-widest flex items-center hover:underline"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Review
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {settings.testimonials.map((t, i) => (
                      <div key={t.id} className="p-6 bg-slate-50 rounded-none border border-slate-200 relative">
                        <button onClick={() => setSettings({...settings, testimonials: settings.testimonials.filter((_, idx) => idx !== i)})} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        <div className="space-y-3">
                          <input className="w-full px-3 py-2 border rounded-none font-black" value={t.name} placeholder="Client Name" onChange={e => {
                            const newTs = [...settings.testimonials];
                            newTs[i].name = e.target.value;
                            setSettings({...settings, testimonials: newTs});
                          }} />
                          <input className="w-full px-3 py-2 border rounded-none font-bold text-xs" value={t.role} placeholder="Role / Company" onChange={e => {
                            const newTs = [...settings.testimonials];
                            newTs[i].role = e.target.value;
                            setSettings({...settings, testimonials: newTs});
                          }} />
                          <textarea className="w-full px-3 py-2 border rounded-none font-medium text-sm" rows={3} value={t.content} placeholder="Review text" onChange={e => {
                            const newTs = [...settings.testimonials];
                            newTs[i].content = e.target.value;
                            setSettings({...settings, testimonials: newTs});
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white rounded-none border border-slate-200 p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                      <HelpCircle className="w-5 h-5 mr-3 text-regil-blue" /> FAQ Management
                    </h3>
                    <button 
                      onClick={() => {
                        const newFaq: FAQ = { id: Math.random().toString(), question: 'Common Question?', answer: '' };
                        setSettings({...settings, faqs: [...settings.faqs, newFaq]});
                      }}
                      className="text-regil-blue font-black text-xs uppercase tracking-widest flex items-center hover:underline"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add FAQ
                    </button>
                  </div>
                  <div className="space-y-4">
                    {settings.faqs.map((faq, i) => (
                      <div key={faq.id} className="p-6 bg-slate-50 border border-slate-200 rounded-none lg:grid lg:grid-cols-2 gap-4 relative">
                        <button onClick={() => setSettings({...settings, faqs: settings.faqs.filter((_, idx) => idx !== i)})} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        <input className="w-full px-4 py-2 border rounded-none font-black mb-4 lg:mb-0" value={faq.question} placeholder="Question" onChange={e => {
                          const newFaqs = [...settings.faqs];
                          newFaqs[i].question = e.target.value;
                          setSettings({...settings, faqs: newFaqs});
                        }} />
                        <textarea className="w-full px-4 py-2 border rounded-none font-medium" rows={2} value={faq.answer} placeholder="Answer" onChange={e => {
                          const newFaqs = [...settings.faqs];
                          newFaqs[i].answer = e.target.value;
                          setSettings({...settings, faqs: newFaqs});
                        }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sticky bottom-8 flex justify-center">
                  <button onClick={handleSettingsSave} className="bg-regil-blue text-white px-12 py-5 rounded-none font-black shadow-2xl flex items-center space-x-3 scale-110">
                    <Save className="w-6 h-6" />
                    <span>Deploy Global Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {isEditingBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditingBlog(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-slate-900">Article Editor</h3>
                <button onClick={() => setIsEditingBlog(false)} className="p-2 hover:bg-slate-200 rounded-none transition-colors"><X /></button>
              </div>
              <form onSubmit={handleBlogSave} className="p-10 overflow-y-auto space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headline</label>
                    <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} />
                  </div>
                  <ImageUpload 
                    label="Cover Image"
                    currentUrl={currentBlog.image}
                    onUpload={(url) => setCurrentBlog({...currentBlog, image: url})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Excerpt</label>
                  <textarea rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-medium" value={currentBlog.excerpt} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Article Body (Markdown)</label>
                  <textarea rows={10} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-medium font-mono text-sm" value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} />
                </div>
                <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setIsEditingBlog(false)} className="px-6 py-3 font-black text-slate-400 uppercase text-xs tracking-widest">Cancel</button>
                  <button type="submit" className="bg-regil-blue text-white px-10 py-3 rounded-none font-black shadow-xl shadow-regil-blue/20">Publish Article</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
                <h3 className="text-lg font-black text-slate-900 uppercase">
                  {currentProduct.id ? 'Edit Product Configuration' : 'Design New Product'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Identity</label>
                      <input
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none focus:ring-2 focus:ring-regil-blue/20 font-black text-lg"
                        placeholder="e.g., Industrial RO-50K"
                        value={currentProduct.name}
                        onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</label>
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black"
                      value={currentProduct.category}
                      onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    >
                      {settings.productCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      {settings.productCategories.length === 0 && <option value="Domestic">Domestic</option>}
                    </select>
                  </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Base Price</label>
                        <input
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black"
                          placeholder="e.g., 85,000"
                          value={currentProduct.price}
                          onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amazon Link</label>
                        <input
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-black"
                          placeholder="e.g., https://amazon.in/..."
                          value={currentProduct.amazonUrl || ''}
                          onChange={e => setCurrentProduct({ ...currentProduct, amazonUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Bio</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-none font-medium resize-none"
                      placeholder="Brief overview of application and benefits..."
                      value={currentProduct.description}
                      onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col gap-6">
                    <ImageUpload 
                      label="Add Product Image"
                      onUpload={(url) => {
                        if(url) {
                          setCurrentProduct({...currentProduct, images: [...(currentProduct.images || []), url]});
                          if(!currentProduct.image) setCurrentProduct(p => ({...p, image: url}));
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {(currentProduct.images || []).map((img, idx) => (
                      <div key={idx} className="relative w-24 h-24 rounded-none overflow-hidden border border-slate-200 group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button onClick={() => setCurrentProduct({...currentProduct, images: currentProduct.images?.filter((_, i) => i !== idx)})} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Core Specs (Checklist)</label>
                    <div className="flex gap-2">
                      <input className="flex-1 px-4 py-3 bg-slate-50 border rounded-none font-medium" value={specInput} onChange={e => setSpecInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSpec())} />
                      <button type="button" onClick={addSpec} className="bg-regil-blue text-white px-4 py-3 rounded-none"><Plus /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.specs?.map((s, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-none text-xs font-bold flex items-center gap-2">
                          {s} <X className="w-3 h-3 cursor-pointer" onClick={() => removeSpec(idx)} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Technical Data (Key-Value)</label>
                    <div className="flex gap-2">
                      <input className="flex-1 px-3 py-2 border rounded-none text-xs font-bold" placeholder="Label (e.g. TDS)" value={featureInput.label} onChange={e => setFeatureInput({...featureInput, label: e.target.value})} />
                      <input className="flex-1 px-3 py-2 border rounded-none text-xs font-bold" placeholder="Value (e.g. 5000)" value={featureInput.value} onChange={e => setFeatureInput({...featureInput, value: e.target.value})} />
                      <button type="button" onClick={() => {
                        if(featureInput.label && featureInput.value) {
                          setCurrentProduct({...currentProduct, features: [...(currentProduct.features || []), featureInput]});
                          setFeatureInput({ label: '', value: '' });
                        }
                      }} className="bg-regil-orange text-white px-4 py-2 rounded-none"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-2">
                      {currentProduct.features?.map((f, i) => (
                        <div key={i} className="flex justify-between items-center text-xs p-2 bg-regil-sky/5 rounded border border-regil-sky/10">
                          <span className="font-black opacity-60 uppercase">{f.label}</span>
                          <span className="font-black flex items-center gap-2">
                            {f.value} <Trash2 className="w-3 h-3 text-red-300 cursor-pointer" onClick={() => setCurrentProduct({...currentProduct, features: currentProduct.features?.filter((_, idx) => idx !== i)})} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="inStock" className="w-6 h-6 accent-regil-blue rounded-none cursor-pointer" checked={currentProduct.inStock} onChange={e => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })} />
                    <label htmlFor="inStock" className="text-sm font-black text-slate-700 cursor-pointer">Live in Stock</label>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-4 font-black text-slate-400">Abort</button>
                    <button type="submit" className="bg-regil-blue text-white px-12 py-4 rounded-none font-black shadow-2xl flex items-center space-x-3">
                      <Save className="w-5 h-5" />
                      <span>Commit to DB</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-4 rounded-none shadow-2xl flex items-center space-x-3 border border-white/10"
          >
            <div className="w-8 h-8 bg-regil-green rounded-none flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-black">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
