import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { signInWithGoogle, firebaseSignOut } from '../config/firebase';

// Configure default axios base URL — reads from VITE_API_URL in .env
// Local dev: http://localhost:5000  |  Production: your deployed backend URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<string>;
  demoLogin: () => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('cc_token');
    const storedUser = localStorage.getItem('cc_user');
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch {
        // Corrupted storage — clear it
        localStorage.removeItem('cc_token');
        localStorage.removeItem('cc_user');
      }
    }
    setIsLoading(false);
  }, []);

  const clearError = () => setError(null);

  const saveAuthSession = (tokenVal: string, userVal: User) => {
    localStorage.setItem('cc_token', tokenVal);
    localStorage.setItem('cc_user', JSON.stringify(userVal));
    setToken(tokenVal);
    setUser(userVal);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenVal}`;
    setError(null);
  };

  // ── Standard Email/Password Login ──────────────────────────────────────────
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token: tokenVal, user: userVal } = response.data;
      saveAuthSession(tokenVal, userVal);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Register (returns email — does NOT auto-login) ──────────────────────────
  const register = async (name: string, email: string, password: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      // Server returns { message, email } — user must login separately
      return response.data.email as string;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Demo Login ─────────────────────────────────────────────────────────────
  const demoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/demo');
      const { token: tokenVal, user: userVal } = response.data;
      saveAuthSession(tokenVal, userVal);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Demo login failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Real Firebase Google Sign-In ───────────────────────────────────────────
  const googleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Open Google OAuth popup via Firebase
      const googleUser = await signInWithGoogle();

      // Step 2: Send Google user info to our backend to issue a JWT
      const response = await axios.post('/api/auth/google', {
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId
      });

      const { token: tokenVal, user: userVal } = response.data;

      // Merge photoURL from Google into stored user
      saveAuthSession(tokenVal, {
        ...userVal,
        photoURL: googleUser.photoURL
      });
    } catch (err: any) {
      // Handle Firebase popup-closed error gracefully
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        setError(null); // User just closed the popup — not an error
      } else {
        setError(err?.response?.data?.message || err?.message || 'Google sign-in failed. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = async () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    setError(null);
    // Also sign out of Firebase session (best-effort)
    try { await firebaseSignOut(); } catch { /* ignore */ }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        demoLogin,
        googleLogin,
        logout,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
