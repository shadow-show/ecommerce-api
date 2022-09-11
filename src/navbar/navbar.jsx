
import { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css"

export default function Navebar(props) {


  const [cats,setCats] = useState([]);
  const [selected,setSelected] = useState();
  async function getData(){
    const obj =  await axios.get('https://fakestoreapi.com/products/categories');
    setCats(obj.data);
    
   }
  
  useEffect(()=>{
    
    getData();
  },[]);


  return (
    <div className="navbar">
        
        
        <span className="navbartitle">Filter With categories😊</span>
      { cats &&        
      
          <div className="list-container">
            {cats.map((item, index) => (
                <div key={index} >
                  <button className="button" onClick={()=>{setSelected(item);props.getCat(selected)}}><span>{item}</span></button>
                </div>
            ))}
          </div> 
     }
     <span className="sidebarTitle">Sort:😊<button className="button" onClick={()=>{props.getOrder(false)}}>Asc</button><button className="button" onClick={()=>{props.getOrder(true)}}>Dsc</button></span>
   </div>
        
   
  );
}