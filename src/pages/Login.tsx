import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, Mail, Lock, LogIn, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, demoLogin, googleLogin, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Pick up registration success state passed from Register page
  useEffect(() => {
    const state = location.state as { registeredEmail?: string; successMessage?: string } | null;
    if (state?.successMessage) {
      setSuccessMessage(state.successMessage);
      if (state.registeredEmail) {
        setEmail(state.registeredEmail);
      }
      // Clear route state so refreshing doesn't re-show it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Clear success message once user starts typing
  const handleEmailChange = (val: string) => {
    setEmail(val);
    setFormError(null);
    setSuccessMessage(null);
    clearError();
  };

  const handleValidation = () => {
    if (!email) { setFormError('Email address is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setFormError('Please enter a valid email address'); return false; }
    if (!password) { setFormError('Password is required'); return false; }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);
    if (!handleValidation()) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      // Error handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    clearError();
    setFormError(null);
    setSuccessMessage(null);
    setEmail('demo@campaigncraft.ai');
    setPassword('DemoPass123!');
    setIsSubmitting(true);
    try {
      await demoLogin();
      navigate('/');
    } catch {
      // Error handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    setFormError(null);
    setSuccessMessage(null);
    setIsGoogleLoading(true);
    try {
      await googleLogin();
      navigate('/');
    } catch (err: any) {
      // popup-closed is not an error we need to show
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        setFormError(err?.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-md w-full space-y-6 glass-panel p-8 rounded-3xl border border-white/5 bg-brand-card/45 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Bot className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Access your AI marketing and copywriting workspace.
          </p>
        </div>

        {/* Registration Success Toast */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3 text-emerald-400 text-sm">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Account Created!</p>
              <p className="text-xs text-emerald-300/70 mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {(formError || error) && !successMessage && (
          <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-start gap-3 text-brand-accent text-sm">
            <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Access Denied</p>
              <p className="text-xs text-brand-muted mt-0.5">{formError || error}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFormError(null); clearError(); }}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/20 focus:outline-none glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/5" />
          <span className="flex-shrink mx-3 text-xs text-brand-muted font-semibold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        {/* Social / Demo Buttons */}
        <div className="space-y-3">
          {/* Demo Login */}
          <button
            type="button"
            id="demo-login-btn"
            onClick={handleDemoLogin}
            disabled={isSubmitting || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-brand-secondary/10 border border-brand-secondary/20 hover:bg-brand-secondary/20 text-brand-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" />
            Auto-fill Demo Credentials
          </button>

          {/* Google Sign-In — Real Firebase OAuth */}
          <button
            type="button"
            id="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 border border-white/10 hover:bg-slate-800 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {/* Official Google G Icon */}
                <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <p className="text-center text-sm text-brand-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-secondary hover:text-brand-secondary/80 font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
