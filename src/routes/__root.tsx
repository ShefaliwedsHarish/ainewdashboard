import { Outlet, Link, createRootRoute, HeadContent, Scripts, redirect } from "@tanstack/react-router";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from '@/components/ui/sonner';

import appCss from "../styles.css?url";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const currentPath = location.pathname;
    const isPublicRoute = PUBLIC_ROUTES.some(r => currentPath.startsWith(r));

    // Skip auth checks during SSR
    if (typeof window === 'undefined') {
      // During SSR, we need to allow public routes to render
      // Protected routes will be handled by individual route guards
      return;
    }

    const token = localStorage.getItem('auth_token');

    // Not logged in, trying to access protected route
    if (!token && !isPublicRoute) {
      throw redirect({ to: '/login' });
    }

    // Logged in, trying to access public route
    if (token && isPublicRoute) {
      throw redirect({ to: '/dashboard' });
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lyraa — AI Receptionist" },
      { name: "description", content: "Lyraa — your AI receptionist that answers calls 24/7." },
      { name: "author", content: "Lyraa" },
      { property: "og:title", content: "Lyraa — AI Receptionist" },
      { property: "og:description", content: "Lyraa — your AI receptionist that answers calls 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Lyraa — AI Receptionist" },
      { name: "twitter:description", content: "Lyraa — your AI receptionist that answers calls 24/7." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/595d2ce1-263a-4fa6-90e4-c51efcb1e73e/id-preview-16d6cf18--24441c69-5ed0-408e-86a1-c8c69519ba39.lovable.app-1777372096243.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/595d2ce1-263a-4fa6-90e4-c51efcb1e73e/id-preview-16d6cf18--24441c69-5ed0-408e-86a1-c8c69519ba39.lovable.app-1777372096243.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Provider store={store}>
          {children}
          <Toaster />
        </Provider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
