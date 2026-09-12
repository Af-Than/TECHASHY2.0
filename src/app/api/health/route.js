export async function GET() {
  return Response.json({ 
    status: 'ok',
    message: 'Techashy API is running',
    timestamp: new Date().toISOString()
  });
}
