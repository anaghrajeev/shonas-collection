import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'shonascollection2025@gmail.com' && password === 'shonas123@') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/products');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-4">
      <div className="bg-surface ambient-shadow rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Shona's Collection Logo" className="h-16 w-auto mx-auto mb-4 object-contain" />
          <h1 className="font-display-lg text-primary text-3xl mb-2">SHONA'S ADMIN</h1>
          <p className="font-body-md text-on-surface-variant">Sign in to manage your store</p>
        </div>

        {error && (
          <div className="bg-error-container text-error p-3 rounded-lg font-body-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-label-md text-on-surface mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
              placeholder="admin@shonascollection.com"
              required
            />
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-label-lg py-4 rounded-xl ambient-shadow hover:bg-primary/90 transition-colors uppercase tracking-widest mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
