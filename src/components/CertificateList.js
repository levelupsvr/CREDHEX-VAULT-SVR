// File: src/components/CertificateList.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Search } from 'lucide-react';
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  Download,
  Trash2,
  Eye
} from 'lucide-react';

export default function CertificateList({ user }) {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [previewing, setPreviewing] = useState(null); // 👈 for toggling PDF preview

  /* 🔄 fetch certificate list */
  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      const { data, error } = await supabase
        .storage
        .from('certificates')
        .list(user.id);

      if (error) alert('Error loading files: ' + error.message);
      else setFiles(data || []);
    })();
  }, [user]);

  /* helpers */
  const getUrl = (name) =>
    supabase.storage
      .from('certificates')
      .getPublicUrl(`${user.id}/${name}`).data.publicUrl;

  const isImage = (name) => /\.(png|jpe?g|gif|webp)$/i.test(name);
  const isPDF = (name) => /\.pdf$/i.test(name);

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

    const getFileIcon = (name) => {
    if (isImage(name)) return ImageIcon;
    if (isPDF(name)) return FileTextIcon;
    return FileIcon;
  };

  const handleDownload = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  const handleDelete = async (name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;

    const { error } = await supabase.storage
      .from('certificates')
      .remove([`${user.id}/${name}`]);

    if (error) alert(`Failed: ${error.message}`);
    else setFiles((prev) => prev.filter((f) => f.name !== name));
    setOpenMenu(null);
    setPreviewing(null);
  };

  return (
    <div className="cert-list">
      <h3 className="pb-3 text-xl font-semibold text-amber-700 tracking-tight">
  Your Certificates
</h3>

    <div className="relative pb-4">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-amber-400" />
      </div>
      <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search files..."
  aria-label="Search files"
  className="
    w-96 pl-12 pr-4 py-3
    bg-white/40 border border-amber-300 shadow-sm backdrop-blur-md rounded-2xl
    text-amber-900 placeholder-amber-400
    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400
    transition-all duration-300
  "
/>
    </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredFiles.map((file) => {
        const url = getUrl(file.name);
        const IconComponent = getFileIcon(file.name);

        return (
          <div
            key={file.name}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
          >
            <div className="text-center mb-4">
              {isImage(file.name) ? (
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                  <IconComponent className="w-8 h-8 text-amber-600" />
                </div>
              )}

              <h3 className="font-medium text-amber-800 truncate text-sm" title={file.name}>
                {file.name}
              </h3>
              <p className="text-xs text-amber-500 mt-1">{file.date || ''}</p>
            </div>

            <div className="flex gap-2 justify-center">
              {isPDF(file.name) && (
                <button
                  onClick={() =>
                    setPreviewing((prev) => (prev === file.name ? null : file.name))
                  }
                  className="p-2 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors group"
                  title="Preview"
                >
                  <Eye className="w-4 h-4 text-amber-600 group-hover:text-amber-700" />
                </button>
              )}

              <button
                onClick={() => handleDownload(url, file.name)}
                className="p-2 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors group"
                title="Download"
              >
                <Download className="w-4 h-4 text-amber-600 group-hover:text-amber-700" />
              </button>

              <button
                onClick={() => handleDelete(file.name)}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-xl transition-colors group"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
              </button>
            </div>

            {previewing === file.name && isPDF(file.name) && (
              <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden shadow">
                <iframe
                  src={url}
                  title="PDF Preview"
                  width="100%"
                  height="400"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
}
