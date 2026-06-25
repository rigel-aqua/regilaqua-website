import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Blog } from '../types';

export const blogService = {
  getBlogs: async (): Promise<Blog[]> => {
    const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
  },

  getBlogById: async (id: string): Promise<Blog | null> => {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Blog;
    }
    return null;
  },

  saveBlog: async (blog: Omit<Blog, 'id' | 'date'> & { id?: string }): Promise<void> => {
    if (blog.id) {
      const docRef = doc(db, 'blogs', blog.id);
      await setDoc(docRef, {
        ...blog,
        date: new Date().toISOString()
      }, { merge: true });
    } else {
      const newDocRef = doc(collection(db, 'blogs'));
      await setDoc(newDocRef, {
        ...blog,
        id: newDocRef.id,
        date: new Date().toISOString()
      });
    }
  },

  deleteBlog: async (id: string): Promise<void> => {
    const docRef = doc(db, 'blogs', id);
    await deleteDoc(docRef);
  }
};
