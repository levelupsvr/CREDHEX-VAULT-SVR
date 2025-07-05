import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="text-center mb-6 sm:mb-8 px-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-2 drop-shadow-md transition-all duration-500">
              CredHex Vault
            </h1>
            <p className="text-sm sm:text-base text-amber-600">Sign in to access your secure file storage</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleLogin();
              }}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoFocus
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all duration-300"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                type="submit"
                disabled={loading}
                className={`
                  w-full bg-[#d97706] text-white py-3 rounded text-sm sm:text-base
                  hover:bg-[#b45309] transition duration-200 shadow-md
                  hover:scale-105 active:scale-95
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>
            <motion.p
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/')}
              className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600 hover:text-amber-700 hover:underline cursor-pointer transition-colors duration-200"
            >
              Don't have an account? Register
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default Login;
