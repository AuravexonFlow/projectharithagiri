'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Secret password for admin access (in production, use environment variables)
  const ADMIN_PASSWORD = 'harithagiri2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Set session storage to indicate logged in
      sessionStorage.setItem('adminAuthenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('වැරදි මුරපදය');
    }
  };

  return (
    <div className="min-h-screen bg-temple-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full stupa-gradient flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-temple-green mb-2">පරිපාලක ප්‍රවේශය</h1>
          <p className="text-gray-600">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              මුරපදය / Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold focus:border-transparent outline-none transition-colors"
              placeholder="මුරපදය ඇතුළත් කරන්න"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-temple-green text-white py-3 rounded-lg hover:bg-temple-green-dark transition-colors font-semibold"
          >
            ප්රවේශ වන්න / Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>මෙය රහස් පරිපාලක පිටුවකි</p>
          <p>This is a secret admin page</p>
        </div>
      </div>
    </div>
  );
}
