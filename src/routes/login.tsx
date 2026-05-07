import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Axios from '@/utils/Axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/authSlice';
import LyraaHeroPanel from '@/components/auth/LyraaHeroPanel';
import { useSearch } from '@tanstack/react-router';
import { API_ROUTES } from '@/services/apiRoutes';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const searchParams = useSearch({ from: '/login' }) as any;
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchParams?.verified === '1') {
      toast.success('Email verified! Please login.');
    }
  }, [searchParams]);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post(API_ROUTES.auth.login, {
        email: form.email,
        password: form.password,
      });

      const result = res.data;

      if (!result.token) {
        toast.error(result.message || 'Invalid login response');
        setLoading(false);
        return;
      }

      // Redux store
      dispatch(
        loginSuccess({
          token: result.token,
          user: result.user,
        })
      );

      // Hard redirect so beforeLoad re-evaluates with new token
      window.location.href = '/dashboard';
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Login failed.';
      const status = error.response?.status;

      if (status === 403) {
        toast.error('Please verify your email first.');
        setShowResend(true);
        return;
      }

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await Axios.post(API_ROUTES.auth.resendVerification, { email: form.email });
      toast.success('Verification email sent!');
      setShowResend(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to resend.');
    } finally {
      setResendLoading(false);
    }
  };

  // Prevent flash of content during hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — Lyraa hero */}
      <LyraaHeroPanel />

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FFFEF9]">
        <div className="w-full max-w-[340px]">
          <div className="mb-8 text-center">
            <h1 className="text-[26px] font-bold text-gray-900 leading-tight mb-1">
              Welcome back
            </h1>
            <h1 className="text-[26px] font-bold text-gray-900 leading-tight mb-3">
              to lyraa
            </h1>
            <p className="text-[13px] text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-[#6B5FCF] font-medium hover:underline">
                Register
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-[13px] font-medium text-gray-900 mb-2 block">Email</Label>
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 pointer-events-none z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <Input
                  placeholder="you@company.com"
                  className="h-[44px] rounded-lg border-gray-300 bg-white text-[14px] pl-11 pr-4 focus:border-[#6B5FCF] focus:ring-1 focus:ring-[#6B5FCF]"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-[13px] font-medium text-gray-900 mb-2 block">Password</Label>
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 pointer-events-none z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <Input
                  placeholder="••••••••"
                  className="h-[44px] rounded-lg border-gray-300 bg-white text-[14px] pl-11 pr-11 focus:border-[#6B5FCF] focus:ring-1 focus:ring-[#6B5FCF]"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  suppressHydrationWarning
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              <div className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="text-[12px] text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-[44px] rounded-lg text-[14px] font-semibold bg-[#6B5FCF] hover:bg-[#5A4EBF] text-white mt-2"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Sign In
            </Button>

            {showResend && (
              <p className="text-sm text-center text-gray-600 mt-4">
                Didn't get the email?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-[#6B5FCF] font-medium hover:underline disabled:opacity-50"
                >
                  {resendLoading ? 'Sending...' : 'Resend verification email'}
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
