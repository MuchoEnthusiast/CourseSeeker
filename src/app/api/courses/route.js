// Courses API endpoints
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Courses API endpoint' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  // Handle course creation
  return new Response(JSON.stringify({ message: 'Course created' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
