import { createFileRoute, redirect } from "@tanstack/react-router";

// Root "/" redirects to /dashboard if authenticated, else /login
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      throw redirect({ to: '/dashboard' });
    } else {
      throw redirect({ to: '/login' });
    }
  },
  component: () => null,
});
