import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import UploadForm from '../components/UploadForm';
import CertificateList from '../components/CertificateList';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
    };
    getUser();
  }, []);
  



  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-screen max-w-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-center space-x-3">
              <div>
                <h1 className="text-5xl font-bold text-amber-800">CredHex Vault</h1>
                <p className="text-amber-600 text-xl">Secure file storage</p>
              </div>
              </div>
            </div>
          </div>
        </div>


              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Upload Zone */}
          <div>
      <UploadForm user={user} />
          </div>

          {/* Search and Files */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CertificateList user={user} />
            </div>
          </div>
        </div>
      </div>
</div>
  );
}

export default Dashboard;