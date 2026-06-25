import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const q = query(collection(db, 'products'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  },

  saveProduct: async (product: Omit<Product, 'id'> & { id?: string }): Promise<void> => {
    if (product.id) {
      const docRef = doc(db, 'products', product.id);
      await setDoc(docRef, product, { merge: true });
    } else {
      const newDocRef = doc(collection(db, 'products'));
      await setDoc(newDocRef, { ...product, id: newDocRef.id });
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  }
};
