import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex">
      {/* Left panel — Lyraa hero */}
      <LyraaHeroPanel />

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Welcome back
              <br />
              <span className="text-foreground">to lyraa</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/register" className="text-primary font-medium hover:underline">
                Register
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="you@company.com"
                  className="pl-10 h-12 rounded-xl border-border bg-background"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="••••••••"
                  className="pl-10 pr-12 h-12 rounded-xl border-border bg-background"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Sign In
            </Button>

            {showResend && (
              <p className="text-sm text-center text-muted-foreground">
                Didn't get the email?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-primary font-medium hover:underline disabled:opacity-50"
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
