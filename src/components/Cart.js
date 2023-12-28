import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cartcard from "./Cartcard";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate =useNavigate();
  const getuserCart = async () => {
    let token = localStorage.getItem("shoppingtoken");
    const data = await fetch("https://shopping-backend-vsg9.onrender.com/getuserCart", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await data.json();
    if (data.status === 200) {
      setCartItems(res.cart);
    } else {
      toast.error(res.error);
    }
  };
  useEffect(() => {
    getuserCart();
  }, []);
  return (
    <>
      <Header count={cartItems.length} />
      <p className="font-bold text-3xl text-center mt-20">Your Cart</p>
      {cartItems.length === 0 && (
          <>
            <p className="p-5 text-center">Your cart is Empty</p>
            <div className=" text-center ">
            <button className="rounded shadow p-2 border"onClick={()=>navigate('/user/home')}>Shop Now</button>
            </div>
          </>
        )}
      <div className="flex flex-wrap justify-center items-center">
      
        {cartItems?.map((item) => (
          <Cartcard product={item} getuserCart={getuserCart} />
        ))}
      </div>
      <p className="text-center text-3xl font-bold">Total price:₹{cartItems?.length>0?cartItems?.map(e=>parseFloat(e.price)).reduce((a,b)=>a+b):0}</p>
        <ToastContainer />
    </>
  );
};

export default Cart;
