import { redirect } from '@tanstack/react-router';

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Use on protected routes — redirects to /login if no token
export const requireAuth = () => {
  if (typeof window === 'undefined') return;
  const token = getToken();
  if (!token) {
    throw redirect({ to: '/login' });
  }
};

// Use on public routes (login/register) — redirects to /dashboard if already logged in
export const redirectIfAuth = () => {
  if (typeof window === 'undefined') return;
  const token = getToken();
  if (token) {
    throw redirect({ to: '/dashboard' });
  }
};
