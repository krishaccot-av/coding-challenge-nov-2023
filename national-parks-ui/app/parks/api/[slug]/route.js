export async function GET(request,{params}) {
  const api_key = 'Kra1CV8uIShxgLqRV7e2HrGjziKFKuLr4xIyvAb1';
    const res = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${params.slug}&api_key=${api_key}`, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }