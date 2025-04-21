import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const AuthUI = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'signin' ? '/api/login' : '/api/register';

    try {
      const res = await fetch(`https://document-management-and-rag-based-q-a.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">DocuQuery</h1>
      <p className="text-gray-500 mb-6">AI-Powered Document Management System</p>

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <div className="flex mb-6">
          <button
            className={`w-1/2 py-2 text-lg font-medium ${activeTab === 'signin' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-500'} rounded-tl-lg`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-medium ${activeTab === 'register' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-500'} rounded-tr-lg`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 mt-1">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full py-2 px-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 mt-1">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full py-2 px-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-purple-400 text-white py-2 rounded-md text-lg font-medium">
            {activeTab === 'signin' ? 'Sign in' : 'Register'}
          </button>
        </form>
      </div>

      <footer className="mt-8 text-sm text-gray-400">
        DocuQuery © 2025 - Document Management & AI Search
      </footer>
    </div>
  );
};

export default AuthUI;
