import React, { useState } from 'react';
import AdminBody from './AdminBody';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminHome = () => {

  let navigate = useNavigate();
  const handleSignout =async() =>{
    let token = localStorage.getItem('shoppingtoken');
    const data = await fetch('https://shopping-backend-vsg9.onrender.com/logout',{
      method:"GET",
      headers:{
        'Access-Control-Allow-Origin':true,
        "Content-Type": "application/json",
        Authorization:token
      }
    });
    const res = await data.json();
    if(data.status===200){
      toast.success('Logged Out Successfully');
      localStorage.removeItem('shoppingtoken');
      localStorage.removeItem('shoppinguser');
      navigate('/');
    } else {
      toast.error(res.error);
      navigate('/*')
    }
  }
  return (
    <>
    <div className='flex items-center justify-end m-3'>
    <button className='rounded p-2 border font-serif font-bold shadow-lg w-40' onClick={handleSignout}>Sign Out</button>
    </div>
    <AdminBody/>

    </>
  )
}

export default AdminHome;