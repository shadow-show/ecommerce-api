
import './main.css';

import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar/navbar';
var API_URL = 'https://fakestoreapi.com/products/';
function App() {
 const [posts,setPosts] = useState([]);
 const [selectedCat,setSelectedCat] = useState("");
 const [order,setOrder] = useState(false);
 const getCat = (catValue)=>{
            setSelectedCat(catValue);        
 }
 const getOrder = (ord)=>{
      setOrder(ord);     
 }
 const fetchData = async (selected) => {
  const {data} = await axios.get(selected);
  console.log(selected);
  setPosts(data);
 };
 useEffect(()=>{
      
    if(selectedCat == ""){
      if(!order){
        fetchData(API_URL+"?sort=desc"); 
      }
      else{
      fetchData(API_URL+"?sort=asc");  
      }
    }
    else
    {
      if(!order)
      fetchData(API_URL+"category/"+selectedCat+"?sort=desc");
      else
      fetchData(API_URL+"category/"+selectedCat+"?sort=asc")
    }
  },[selectedCat,order]);
  return (
    <div className="App">
     
      <Navbar getCat={getCat} getOrder={getOrder}/>
      <main className='main'>

      <div className="products">{
        posts.map((product)=>(
          <div className="product" key={product.slug}>
          <a href={`/product/${product.slug}`}> 
          <img src={product.image} alt={product.name} />
          </a> 
          <div className='product-info'>
          <a href={`/product/${product.slug}`}> 
            <p>{product.title}</p>
            </a>
            <p><strong>${product.price}</strong></p>
            <botton>Add to cart</botton>
            </div>
          </div>
        )) }
        </div>    
      </main>
    </div>
  );
}

export default App;
