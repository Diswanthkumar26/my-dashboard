import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthAnimatedForm() {
  const [mode, setMode] = useState('login');
  const [letterDone, setLetterDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const tokenData = localStorage.getItem('authToken');
      if (!tokenData) {
        setLoading(false);
        return;
      }

      try {
        const { token } = JSON.parse(tokenData);
        const response = await axios.get('/api/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.valid) {
          navigate('/dashboard');
        } else {
          localStorage.removeItem('authToken');
          setLoading(false);
        }
      } catch (error) {
        console.error('Token validation failed', error);
        localStorage.removeItem('authToken');
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  useEffect(() => {
    setLetterDone(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setEmailError('');
  }, [mode]);

  const validateEmail = (value) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(value) ? '' : 'Enter a valid Gmail address';
  };

  const handleSubmit = () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;

    const fakeToken = {
      token: 'fake_jwt_token',
      exp: Date.now() + 1000 * 60 * 60,
    };
    localStorage.setItem('authToken', JSON.stringify(fakeToken));
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white relative overflow-hidden">
      {letterDone && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm p-8 rounded-lg bg-gray-800 shadow-2xl z-20 relative"
        >
          <motion.h2
            key={mode}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-6 text-center"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </motion.h2>

          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.input
                key="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full mb-4 p-3 rounded bg-gray-700 focus:outline-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            className="w-full mb-2 p-3 rounded bg-gray-700 focus:outline-none"
          />
          {emailError && <p className="text-red-400 text-sm mb-2">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-gray-700 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-400">
            {mode === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button
                  className="underline hover:text-indigo-300"
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  className="underline hover:text-indigo-300"
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
      <motion.div
        key={mode}
        initial={{ scale: 0.3, rotate: 0, opacity: 1 }}
        animate={{ scale: 1.6, rotate: 10, opacity: 0.06 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        onAnimationComplete={() => setLetterDone(true)}
        className="font-extrabold select-none absolute z-10"
        style={{
          fontSize: '24rem',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {mode === 'login' ? 'L' : 'S'}
      </motion.div>
    </div>
  );
}
