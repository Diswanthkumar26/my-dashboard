import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthAnimatedForm() {
  const [mode, setMode] = useState('login');
  const [letterDone, setLetterDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
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
          headers: { Authorization: `Bearer ${token}` }
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
    setEmailError('');
  }, [mode]);

  const validateEmail = (value) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(value) ? '' : 'Enter a valid email';
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative overflow-hidden">
      {letterDone && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-80 p-8 rounded-lg bg-gray-800 shadow-lg relative z-20"
        >
          <motion.h2
            key={mode}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold mb-6 text-center"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </motion.h2>

          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.input
                key="username"
                type="text"
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
          {emailError && (
            <p className="text-red-500 text-sm mb-2">{emailError}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded bg-gray-700 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
            onClick={handleSubmit}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-400">
            {mode === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button
                  type="button"
                  className="underline hover:text-indigo-400"
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="underline hover:text-indigo-400"
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Animated Letter */}
      <motion.div
        key={mode}
        initial={{ scale: 0.3, rotate: 0, opacity: 1 }}
        animate={{ scale: 1.5, rotate: 10, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        onAnimationComplete={() => setLetterDone(true)}
        className="font-extrabold select-none mt-[-6rem] z-10"
        style={{
          fontSize: '12rem',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {mode === 'login' ? 'L' : 'S'}
      </motion.div>
    </div>
  );
}
