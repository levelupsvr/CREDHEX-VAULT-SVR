// File: src/pages/Register.js
import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else {
      alert('Registration successful! Please check your email for confirmation.');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-md sm:max-w-md">
          <div className="text-center mb-8 sm:mb-8 animate-fade-in-down px-2">
            <h1 className="text-3xl sm:text-3xl font-bold text-amber-800 mb-2 drop-shadow-md transition-all duration-500">
              CredHex Vault
            </h1>
            <p className="text-base sm:text-base text-amber-600">Sign up to access secure file storage</p>
          </div>
          <div className="bg-white p-6 sm:p-6 rounded-lg shadow-md animate-fade-in-up transition-all duration-700">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleRegister();
              }}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 text-base sm:text-base border border-gray-300 rounded mb-4 sm:mb-4 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoFocus
              />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full p-4 text-base sm:text-base border border-gray-300 rounded mb-4 sm:mb-4 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full bg-[#d97706] text-white py-4 rounded text-base sm:text-base
                  hover:bg-[#b45309] transition-all duration-200
                  shadow-md hover:scale-105 active:scale-95
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 sm:h-5 sm:w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Register'
                )}
              </button>
            </form>
            <p
              onClick={() => navigate('/login')}
              className="mt-4 sm:mt-4 text-center text-sm sm:text-sm text-gray-600 hover:underline cursor-pointer transition-colors duration-200 hover:text-amber-700"
            >
              Already have an account? Log in
            </p>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fade-in-down {
            animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-30px);}
            100% { opacity: 1; transform: translateY(0);}
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

export default Register;