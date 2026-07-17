import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, Mail, Lock, User, UserPlus, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  const { register, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleValidation = () => {
    if (!name.trim()) {
      setFormError('Full name is required');
      return false;
    }
    if (!email) {
      setFormError('Email address is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setServerError(null);
    if (!handleValidation()) return;

    setIsSubmitting(true);
    try {
      const registeredEmail = await register(name, email, password);
      // Redirect to login page with the registered email pre-filled and a success flag
      navigate('/login', {
        state: {
          registeredEmail: registeredEmail || email,
          successMessage: `Account created for ${name}! Please sign in to continue.`
        }
      });
    } catch (err: any) {
      setServerError(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = formError || serverError;

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-md w-full space-y-8 glass-panel p-8 rounded-3xl border border-white/5 bg-brand-card/45 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
            <Bot className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Launch your marketing campaign and copywriting dashboard.
          </p>
        </div>

        {/* Error Display */}
        {displayError && (
          <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-start space-x-3 text-brand-accent text-sm">
            <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Registration Failed</p>
              <p className="text-xs text-brand-muted mt-0.5">{displayError}</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setFormError(null); setServerError(null); }}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFormError(null); setServerError(null); }}
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFormError(null); setServerError(null); }}
                  placeholder="•••••••• (Min 6 chars)"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm" className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="reg-confirm"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setFormError(null); setServerError(null); }}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              {/* Password match indicator */}
              {confirmPassword && (
                <p className={`text-[11px] mt-1.5 flex items-center gap-1 font-semibold ${password === confirmPassword ? 'text-emerald-400' : 'text-brand-accent'}`}>
                  <CheckCircle2 className="h-3 w-3" />
                  {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/20 focus:outline-none glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-brand-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-secondary hover:text-brand-secondary/80 font-semibold underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
