import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cartcard = ({product,getuserCart}) => {
  const [spin,setSpin] =useState(false);
    const handleremove =async (id) =>{
      setSpin(true);
      let token = localStorage.getItem('shoppingtoken');
      const data =await fetch('https://shopping-backend-vsg9.onrender.com/removeprodfromcart',{
        method:"POST",
        headers:{
          'Access-Control-Allow-Origin':true,
            'Content-Type':'application/json',
            Authorization:token
        },
        body:JSON.stringify({
          id:id
        })
      });
      const res = await data.json();
      if(data.status===200){
        setSpin(false);
        toast.success(res.message);
        getuserCart();
      } else {
        setSpin(false);
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
        {spin ? (
          <button className=" p-2 shadow-lg border w-24 bg-slate-100 text-white rounded-lg">
            <CircularProgress size="1.2rem" />
          </button>
        ) : (
          <button className="border rounded shadow-lg p-2 bg-green-300" onClick={()=>handleremove(product._id)}>Remove from Cart</button>
        )}
        <ToastContainer/>
      </div>
    </>
  );
};

export default Cartcard;
