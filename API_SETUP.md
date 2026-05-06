# API Service Setup

This project includes a complete API service layer with axios for making HTTP calls.

## Structure

```
src/
├── lib/
│   └── axios.ts              # Axios instance with interceptors
├── services/
│   ├── api.ts                # Generic API service
│   ├── example.service.ts    # Example user service
│   └── index.ts              # Service exports
├── routes/
│   ├── api.users.ts          # API route: GET/POST /api/users
│   └── api.users.$id.ts      # API route: GET/PUT/DELETE /api/users/:id
└── components/
    └── UserList.tsx          # Example component using the service
```

## Usage

### 1. Configure Base URL

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Using the API Service

```typescript
import { userService } from '@/services';

// Get all users
const users = await userService.getUsers();

// Get user by ID
const user = await userService.getUserById('1');

// Create user
const newUser = await userService.createUser({
  name: 'John Doe',
  email: 'john@example.com'
});

// Update user
const updated = await userService.updateUser('1', {
  name: 'Jane Doe'
});

// Delete user
await userService.deleteUser('1');
```

### 3. Using with React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '@/services';

function MyComponent() {
  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });

  // Mutate data
  const createMutation = useMutation({
    mutationFn: (data) => userService.createUser(data),
    onSuccess: () => {
      // Refetch or invalidate queries
    },
  });

  return (
    <div>
      {/* Your UI */}
    </div>
  );
}
```

### 4. Creating New Services

Create a new service file in `src/services/`:

```typescript
import { apiService } from './api';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export class ProductService {
  private readonly basePath = '/products';

  async getProducts(): Promise<Product[]> {
    return apiService.get<Product[]>(this.basePath);
  }

  async getProductById(id: string): Promise<Product> {
    return apiService.get<Product>(`${this.basePath}/${id}`);
  }

  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    return apiService.post<Product>(this.basePath, data);
  }
}

export const productService = new ProductService();
```

### 5. Creating API Routes

Create API route files in `src/routes/` with the `api.` prefix:

```typescript
// src/routes/api.products.ts
import { json } from '@tanstack/react-start';
import type { APIEvent } from '@tanstack/react-start';

export async function GET({ request }: APIEvent) {
  // Your logic here
  return json({
    success: true,
    data: [],
  });
}

export async function POST({ request }: APIEvent) {
  const body = await request.json();
  // Your logic here
  return json({
    success: true,
    data: body,
  });
}
```

## Features

- ✅ Axios instance with default configuration
- ✅ Request/Response interceptors
- ✅ Automatic auth token handling
- ✅ Error handling (401 redirects)
- ✅ TypeScript support
- ✅ Generic API service methods
- ✅ Example service implementation
- ✅ TanStack Start API routes
- ✅ React Query integration example

## Customization

### Modify Interceptors

Edit `src/lib/axios.ts` to customize request/response handling:

```typescript
apiClient.interceptors.request.use((config) => {
  // Add custom headers, logging, etc.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Custom error handling
    return Promise.reject(error);
  }
);
```

### Change Response Format

If your API has a different response format, update `src/services/api.ts`:

```typescript
async get<T>(url: string, params?: Record<string, any>): Promise<T> {
  const response = await apiClient.get(url, { params });
  // Adjust based on your API response structure
  return response.data; // or response.data.result, etc.
}
```
