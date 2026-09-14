export async function GET() {
  return Response.json({ 
    status: 'ok',
    message: 'TECHASHY 2.0 API is running',
    timestamp: new Date().toISOString()
  });
}
