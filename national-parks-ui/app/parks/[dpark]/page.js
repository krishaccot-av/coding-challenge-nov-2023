async function fetchPark(code)
{
    const res = await fetch(`http://localhost:3000/parks/api/${code}`);
    const data = await res.json()
    debugger;
    return data;
}
export default async function Page({params})
{
    const data = await fetchPark(params.dpark);
    return(
      <div >
      {data.data.data.map(({ id, fullName, images, description }) => (
        <><h3 >{fullName}</h3>
        <div key={id} style={{backgroundImage: `url("${images[0].url}")`, backgroundRepeat: "no-repeat", color: "white", height: "1800px", width:"auto", padding:"40px"}}>
          
          <p>{description}</p>
        </div></>
      ))}
    </div>
       )
};