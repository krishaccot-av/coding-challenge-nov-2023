export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')
    const res = await fetch(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.DATA_API_KEY}&q=${search}`, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }
  