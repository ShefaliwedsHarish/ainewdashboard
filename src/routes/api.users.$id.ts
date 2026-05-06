import { json } from '@tanstack/react-start';
import type { APIEvent } from '@tanstack/react-start';

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

// GET /api/users/:id
export async function GET({ params }: APIEvent) {
  const user = users.find(u => u.id === params.id);
  
  if (!user) {
    return json({
      success: false,
      message: 'User not found',
    }, { status: 404 });
  }
  
  return json({
    success: true,
    data: user,
  });
}

// PUT /api/users/:id
export async function PUT({ params, request }: APIEvent) {
  const body = await request.json();
  const userIndex = users.findIndex(u => u.id === params.id);
  
  if (userIndex === -1) {
    return json({
      success: false,
      message: 'User not found',
    }, { status: 404 });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...body,
  };
  
  return json({
    success: true,
    data: users[userIndex],
    message: 'User updated successfully',
  });
}

// DELETE /api/users/:id
export async function DELETE({ params }: APIEvent) {
  const userIndex = users.findIndex(u => u.id === params.id);
  
  if (userIndex === -1) {
    return json({
      success: false,
      message: 'User not found',
    }, { status: 404 });
  }
  
  users.splice(userIndex, 1);
  
  return json({
    success: true,
    message: 'User deleted successfully',
  });
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/users/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/users/$id"!</div>
}
