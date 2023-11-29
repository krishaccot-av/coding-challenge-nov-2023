
import Link from "next/link";
async function fetchParks()
{
    const res = await fetch('http://localhost:3000/parks/api');
    const data = await res.json()
    debugger;
    return data;
}
export default async function Page()
{
    const data = await fetchParks();
    return(
        <><table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Park Code</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
            {data.data.data.map((d,index)=>
          <tr key={d.id||''}>
            <th scope="row">{index+1}</th>
            <td><Link href={`/parks/${d.parkCode}`}>{d.fullName}</Link></td>
            <td>{d.parkCode}</td>
            <td>{d.description}</td>
          </tr>)
        }
          
        </tbody>
      </table></>)
};