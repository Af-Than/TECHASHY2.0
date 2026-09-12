export async function GET() {
  return Response.json({ 
    status: 'ok',
    message: 'TEKASHI 2.0 API is running',
    timestamp: new Date().toISOString()
  });
}
