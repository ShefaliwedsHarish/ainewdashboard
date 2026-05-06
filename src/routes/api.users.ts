import { json } from '@tanstack/react-start';
import type { APIEvent } from '@tanstack/react-start';

// Mock data for demonstration
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

// GET /api/users
export async function GET({ request }: APIEvent) {
  return json({
    success: true,
    data: users,
  });
}

// POST /api/users
export async function POST({ request }: APIEvent) {
  const body = await request.json();
  
  const newUser = {
    id: String(users.length + 1),
    name: body.name,
    email: body.email,
  };
  
  users.push(newUser);
  
  return json({
    success: true,
    data: newUser,
    message: 'User created successfully',
  }, { status: 201 });
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/users"!</div>
}
