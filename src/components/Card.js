import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({product,getuserCart}) => {
  const handlecart =async (id)=>{
 
    let token = localStorage.getItem('shoppingtoken');
    const data =await fetch(`http://localhost:8000/addItemToCart`,{
      method: 'POST',
      headers:{
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization:token
      },
      body:JSON.stringify({
        id:id
      })
    });
    const res =await data.json();
    if(data.status===200){
      toast.success(res.message);
      getuserCart();
    } else{
      toast.error(res.error);
    }
  }
  return (
    <>
      <div className="w-96 border p-2 shadow-lg m-2">
        <p className="text-xs"><span className="bg-slate-300 rounded-lg p-1 text-green-800">⭐{product.rating.rate}</span></p>
        <img src={product.image} className="w-1/2 h-56 m-auto" alt="item" />
        <div >
          <p className="font-bold text-center">{product.title}</p>
          <p className="text-sm font-serif text-gray-500 py-2">{product.description}</p>
          <p className="font-bold text-red-600">₹{product.price}</p>
        </div>
        <button className={`border rounded shadow-lg p-2 bg-green-300`}  onClick={()=>handlecart(product._id)}>Add To Cart</button>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Card;
