# Authentication Setup Guide

Complete authentication system with login, register, and protected routes.

## Environment Configuration

The `.env` file contains:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51P2poYFOjqYjuziSQehIuAQksSaw3hKCtNnK5r7mrLs5xwS6ULXbNQJCDmPwdUISPMzqvxdMvzl5g2sHZHpDk4zq00YjLu4h6C
```

## Files Created

### Services
- `src/services/auth.service.ts` - Authentication service with login, register, logout, etc.

### Routes
- `src/routes/login.tsx` - Login page
- `src/routes/register.tsx` - Registration page

### Components
- `src/components/ProtectedRoute.tsx` - Wrapper for protected routes
- `src/components/UserProfile.tsx` - User profile dropdown with logout

### Hooks
- `src/hooks/use-auth.tsx` - Auth context and hook for managing auth state

## Backend API Endpoints Expected

Your backend should implement these endpoints:

### POST /api/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /api/auth/register
```json
Request:
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /api/auth/logout
```json
Request: (with Authorization header)

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/me
```json
Request: (with Authorization header)

Response:
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

## Usage

### 1. Basic Login Flow

Users can navigate to `/login` and enter credentials. On successful login:
- Token is stored in localStorage
- User is redirected to home page
- All subsequent API calls include the token

### 2. Protecting Routes

Wrap any route component with `ProtectedRoute`:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected Dashboard Content</div>
    </ProtectedRoute>
  );
}
```

### 3. Using Auth Service Directly

```typescript
import { authService } from '@/services';

// Check if authenticated
if (authService.isAuthenticated()) {
  // User is logged in
}

// Get current user
const user = authService.getStoredUser();

// Get token
const token = authService.getToken();

// Logout
await authService.logout();
```

### 4. Using Auth Hook (Optional)

If you want to use the auth context:

```typescript
// In your root component or layout
import { AuthProvider } from '@/hooks/use-auth';

function App() {
  return (
    <AuthProvider>
      {/* Your app */}
    </AuthProvider>
  );
}

// In any component
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### 5. Display User Profile

Add the UserProfile component to your header/navbar:

```typescript
import { UserProfile } from '@/components/UserProfile';

function Header() {
  return (
    <header>
      <nav>
        {/* Other nav items */}
        <UserProfile />
      </nav>
    </header>
  );
}
```

## Token Management

The authentication system automatically:
- Stores JWT token in localStorage on login
- Includes token in all API requests via axios interceptor
- Redirects to login on 401 responses
- Clears token on logout

## Error Handling

Login/Register pages display errors for:
- Invalid credentials
- Network errors
- Validation errors (password mismatch, missing fields)
- Backend error messages

## Security Notes

1. **HTTPS**: Always use HTTPS in production
2. **Token Storage**: Consider using httpOnly cookies instead of localStorage for better security
3. **Token Expiration**: Implement token refresh logic if your backend supports it
4. **CORS**: Ensure your backend allows requests from your frontend domain

## Customization

### Change API Response Format

If your backend has a different response structure, update `src/services/auth.service.ts`:

```typescript
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post(`${this.basePath}/login`, credentials);
  
  // Adjust based on your API structure
  const data = response.data; // or response.data.result, etc.
  
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}
```

### Add Social Login

Extend the login page with social auth buttons:

```typescript
<Button variant="outline" onClick={handleGoogleLogin}>
  <GoogleIcon className="mr-2" />
  Continue with Google
</Button>
```

### Add Remember Me

Add a checkbox to persist login:

```typescript
const [rememberMe, setRememberMe] = useState(false);

// Store in localStorage or sessionStorage based on rememberMe
const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem('auth_token', token);
```

## Testing

Test the authentication flow:

1. Start your backend: `python manage.py runserver` (or equivalent)
2. Start frontend: `npm run dev`
3. Navigate to `http://localhost:3000/login`
4. Try logging in with test credentials
5. Check browser DevTools > Application > Local Storage for token

## Troubleshooting

### CORS Errors
Add CORS headers to your backend:
```python
# Django example
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### 401 Errors
- Check if token is being sent in headers
- Verify token format (Bearer token)
- Check token expiration

### Login Not Working
- Check network tab for API response
- Verify API endpoint URL in .env
- Check backend logs for errors
