'use client';
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useEffect,useState,router } from "react";
import Heart from "react-heart";

export default function Page()
{
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const [data,setData] = useState(null);
  const [favorites,setFavorites] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:3000/parks/api?search=${search}`, { cache: 'no-store' })
    .then((res)=>res.json())
    .then((d)=>{setData(d);});    
  },[search]);

  const toggleFavorite = (id)=>{
    const index = favorites.indexOf(id);
    if (index > -1) { 
      let list = favorites;
      list.splice(index, 1);
      setFavorites([...list]); 
    }
    else{
      setFavorites([...favorites,id]);
    }
  }
    return(
        <><table className="table" role="heading">
        <thead>
          <tr>
            <th scope="col-1">#</th>
            <th scope="col">Name</th>
            <th scope="col">Park Code</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
            {data?data.data.data.map((d,index)=>
          <tr key={d.id||''}>
            <th scope="row"><Heart isActive={favorites.indexOf(d.id) > -1} onClick={() => toggleFavorite(d.id)}/></th>
            <td>
              <Link href={`/parks/${d.parkCode}`}>{d.fullName}<br/>
                <img src={d.images[0].url} height={"40px"}></img>
              </Link>
            </td>
            <td>{d.parkCode}</td>
            <td>{d.description}
            </td>
          </tr>)
        :null}
          
        </tbody>
      </table></>)
};