export async function GET(request,{params}) {
    const res = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${params.slug}&api_key=${process.env.DATA_API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }