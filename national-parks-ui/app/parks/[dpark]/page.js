'use client';
import { ModalComp } from "./../../components/modal";
import Link from "next/link";
import { useEffect,useState } from "react";

export default function Page({params})
{
  const [data,setData] = useState(null);
  const [image,setImage] = useState({});
  const [isOpen,setIsOpen] = useState(false);
  const [isMapOpen,setIsMapOpen] = useState(false);
  const [lat,setLat] = useState(55.8271775);
  const [lng,setLng] = useState(20.742731);
  useEffect(()=>{    
    fetch(`http://localhost:3000/parks/api/${params.dpark}`)
    .then((res)=>res.json())
    .then((d)=>{setData(d);});    
  },[])
    
    
    

    const toggle = (flag)=>{
      setIsOpen(flag);};
    return(
      <div className={"m-2 p-2"} >
      {data?data.data.data.map(({ id, fullName, images, description,latitude,longitude, activities }) => (
        <>
          <div className={"row"}>
            <div className={"col"}><h3 >{fullName}</h3></div>
            <div className={"col"}><Link href={`/parks/map?lat=${latitude}&lng=${longitude}`}  target="_blank">Map View</Link></div>
          </div>
          <p>{description}</p>
          <div  class="row">
            <div key={id} className="col-8 container-fluid">
              {images.map((img,index)=>( 
              <div class="card m-1"  style={{width:"18rem", float: "left"}} key={index}>
                  <img className={"card-img-top"} src={img.url} alt={img.altText} style={{ height:"auto"}}></img>
                  <div class="card-body">
                    <h5 class="card-title">{img.title}</h5>
                    <p class="card-text">{img.caption}</p>
                    <button type="button" class="btn btn-primary" onClick={()=>{setImage(img);setIsOpen(true)}} >
                      View Photo
                    </button>
                  </div>
              </div>))} 
              
            </div>
            <div  className="col-2">
                <b>Park Activities</b>
                <ul>
                  {activities.map((a,i)=>(
                    <li>{a.name}</li>
                  ))}
                </ul>
              </div>
          </div>
        </>
      )):null}

      <ModalComp image={image} toggle={toggle} isOpen={isOpen}></ModalComp>
    </div>
       )
};