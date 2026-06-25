import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwxvParACVF0T8eq8Pdxs0Yh46AJNcIw4",
  authDomain: "regilaqua-website.firebaseapp.com",
  projectId: "regilaqua-website",
  storageBucket: "regilaqua-website.firebasestorage.app",
  messagingSenderId: "644352435505",
  appId: "1:644352435505:web:45457c11e35ba5e3817c10",
  measurementId: "G-GGNELV6DSN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const DEFAULT_SETTINGS = {
  email: 'info@rigelaqua.in',
  whatsappNumber: '918885999979',
  address: 'RigelAqua Industrial Zone, Guntur, Andhra Pradesh',
  productCategories: ['Domestic', 'Commercial', 'Industrial', 'Water ATM', 'Components'],
  bentoImage: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=1200',
  featuredCollections: [
    { id: '1', title: 'Water ATM Ecosystem', badge: 'Hot Seller', desc: 'Automated vending with RFID and Coin support.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800' },
    { id: '2', title: 'Industrial RO Series', badge: 'Expert Choice', desc: '250 LPH to 1000 LPH High-pressure systems.', image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=800' },
    { id: '3', title: 'Genuine Components', badge: 'In Stock', desc: 'Membranes, Filters, and Media for all brands.', image: 'https://images.unsplash.com/photo-1585837509811-362bb20d663b?auto=format&fit=crop&q=80&w=800' },
  ],
  heroBanners: [
    {
      id: '1',
      title: "The Pure Standard.",
      subtitle: "Imported technology. Locally perfected. We deliver the most advanced RO and Water ATM systems in Andhra Pradesh.",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=2000"
    }
  ],
  testimonials: [
    { id: '1', name: "Ramakrishna V.", role: "Plant Operator (Guntur)", content: "The Water ATM systems from RigelAqua are rugged. The card sync is perfect and local service is just a phone call away.", rating: 5 },
    { id: '2', name: "Anjali Devi", role: "School Administrator", content: "We installed the 50 LPH system for our primary wing. Water taste is excellent and maintenance is very low compared to our old unit.", rating: 5 },
    { id: '3', name: "Prasad Rao", role: "Industrial Manager", content: "The 500 LPH RO plant has been running 12 hours a day for a year. Not a single breakdown. Excellent component quality.", rating: 5 }
  ],
  faqs: [
    { id: '1', question: "What capacity RO plant do I need for a 100-person office?", answer: "For an office of 100 people, we typically recommend a 25 LPH or 50 LPH system with a storage tank of at least 50-100 liters to handle peak hours." },
    { id: '2', question: "Do you provide installation in rural Andhra Pradesh?", answer: "Yes, RigelAqua has a dedicated network of technicians across all districts of AP, including rural areas and industrial zones." }
  ]
};

const DEFAULT_SEO = {
  title: 'RigelAqua | Advanced Water Solutions',
  description: 'High-end water purification systems for domestic, commercial, and industrial use.',
  keywords: 'water purifier, RO plant, industrial water, RigelAqua',
  ogImage: ''
};

const dummyProduct = {
  id: "dummy-product-1",
  name: "RigelAqua 50 LPH Commercial RO",
  category: "Commercial",
  description: "High performance 50 LPH RO system designed for offices, restaurants, and schools. Features automated flushing, TDS controller, and pressure gauge.",
  price: "45000",
  image: "https://images.unsplash.com/photo-1585837509811-362bb20d663b?auto=format&fit=crop&q=80&w=800",
  amazonUrl: "",
  specs: ["50 Liters Per Hour", "6 Stage Purification", "Auto Flush Timer", "TDS Controller"],
  inStock: true,
  created_at: new Date().toISOString()
};

const dummyBlog = {
  id: "dummy-blog-1",
  title: "Why Industrial RO is Crucial for Manufacturing",
  excerpt: "Discover how advanced reverse osmosis systems prevent equipment scaling and improve product quality in industrial applications.",
  content: "Industrial reverse osmosis (RO) systems play a vital role in manufacturing processes. Unpurified water contains dissolved solids and minerals that can cause severe scaling in boilers, cooling towers, and heavy machinery. By investing in a commercial-grade RO plant from RigelAqua, you can significantly reduce your maintenance costs and extend the lifespan of your critical equipment.\n\nOur systems are built to handle the toughest water conditions in Andhra Pradesh, ensuring you get consistent, ultra-pure water 24/7.",
  image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=800",
  author: "RegilAqua Admin",
  tags: ["Industrial", "Maintenance"],
  date: new Date().toISOString()
};

async function seed() {
  try {
    console.log("Creating Admin User...");
    try {
      await createUserWithEmailAndPassword(auth, "admin@regilaqua.in", "Admin123!");
      console.log("Admin user created successfully.");
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        console.log("Admin user already exists.");
      } else {
        console.error("Auth Error:", e.message);
      }
    }

    console.log("Seeding Settings...");
    await setDoc(doc(db, 'settings', 'site_settings'), { value: DEFAULT_SETTINGS });
    
    console.log("Seeding SEO...");
    await setDoc(doc(db, 'settings', 'seo'), { value: DEFAULT_SEO });

    console.log("Seeding Dummy Product...");
    await setDoc(doc(db, 'products', dummyProduct.id), dummyProduct);

    console.log("Seeding Dummy Blog...");
    await setDoc(doc(db, 'blogs', dummyBlog.id), dummyBlog);

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
