import React from 'react';
import imageCompression from 'browser-image-compression';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
  bucket?: string;
}

export default function ImageUpload({ 
  onUpload, 
  currentUrl, 
  label = "Upload Image", 
  bucket = "regilaqua-assets" 
}: ImageUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [preview, setPreview] = React.useState(currentUrl);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Image Compression Rules
      const options = {
        maxSizeMB: 0.5, // 500KB max
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp' // Convert to WebP for best compression
      };

      const compressedFile = await imageCompression(file, options);
      
      const fileExt = 'webp';
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, compressedFile);
      const publicUrl = await getDownloadURL(storageRef);

      setPreview(publicUrl);
      onUpload(publicUrl);

    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="relative group">
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden border border-slate-200 bg-slate-50">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40 flex flex-col md:flex-row items-center justify-center gap-4 p-4">
              <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-lg">
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
              </label>
              <button 
                type="button" 
                onClick={() => { setPreview(''); onUpload(''); }}
                className="bg-red-500 text-white px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg"
              >
                Remove
              </button>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-regil-blue animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video w-full border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-regil-blue/30 transition-all cursor-pointer group">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-regil-blue animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-slate-300 group-hover:text-regil-blue transition-colors mb-2" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload (Max 500KB)</span>
              </>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>
    </div>
  );
}
