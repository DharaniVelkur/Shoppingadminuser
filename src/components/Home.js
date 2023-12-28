import React, { useEffect, useState } from 'react';
import Body from './Body';
import Header from './Header';
import { Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
  let navigate =useNavigate();
  const [count,setCount] =useState(0);
  const validuser = async ()=>{
    let token = localStorage.getItem('shoppingtoken');
    const res= await fetch("http://localhost:8000/validuser",{
        method:"GET",
        headers:{
            "Access-Control-Allow-Origin":true,
            "Accept":"application/json",
            "Authorization":token
        }
    })
    const data =await res.json();
    if(res.status===200){
        navigate("/user/home");
    } else {
        navigate("/")
    }
}

  useEffect(()=>{
    validuser();
},[]);

const getuserCart =async ()=>{
  let token = localStorage.getItem('shoppingtoken');
  const data = await fetch("http://localhost:8000/getuserCart",{
    method:"GET",
    headers:{
      'Access-Control-Allow-Origin':true,
      'Content-Type':'application/json',
      Authorization:token
    }
  });
  const res = await data.json();
  if(data.status===200){
    setCount(res.cart.length);
  } else {
    toast.error(res.error);
  }
}
useEffect(()=>{
  getuserCart();
},[])

  return (
  <>
  <Header count={count}/>
  <Body getuserCart={getuserCart}/>
  <ToastContainer/>
  </>
  )
}

export default Home;