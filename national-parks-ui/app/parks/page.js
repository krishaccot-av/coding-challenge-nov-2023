'use client';
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useEffect,useState,router } from "react";

export default function Page()
{
  debugger;
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [data,setData] = useState(null);
  useEffect(()=>{
    fetch(`http://localhost:3000/parks/api?search=${search}`, { cache: 'no-store' })
    .then((res)=>res.json())
    .then((d)=>{setData(d);});    
  },[search]);
    return(
        <><table className="table" role="heading">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Park Code</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
            {data?data.data.data.map((d,index)=>
          <tr key={d.id||''}>
            <th scope="row">{index+1}</th>
            <td><Link href={`/parks/${d.parkCode}`}>{d.fullName}</Link></td>
            <td>{d.parkCode}</td>
            <td>{d.description}</td>
          </tr>)
        :null}
          
        </tbody>
      </table></>)
};