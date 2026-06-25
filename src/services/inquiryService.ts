import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_name?: string;
  created_at: string;
  status: 'new' | 'read' | 'contacted';
}

export const inquiryService = {
  getInquiries: async (): Promise<Inquiry[]> => {
    const q = query(collection(db, 'inquiries'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
  },
  
  addInquiry: async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<void> => {
    const newDocRef = doc(collection(db, 'inquiries'));
    await setDoc(newDocRef, {
      ...inquiry,
      id: newDocRef.id,
      created_at: new Date().toISOString(),
      status: 'new'
    });
  },

  updateStatus: async (id: string, status: Inquiry['status']): Promise<void> => {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status });
  },

  deleteInquiry: async (id: string): Promise<void> => {
    const docRef = doc(db, 'inquiries', id);
    await deleteDoc(docRef);
  }
};
