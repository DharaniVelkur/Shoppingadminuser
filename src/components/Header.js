import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = ({count}) => {
let navigate = useNavigate();
  const handleSignout =async () =>{
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
    <div className="flex justify-between items-center py-2 mb-2 shadow-md bg-slate-100 fixed w-full top-0 left-0 right-0">
    <div onClick={()=>navigate('/user/home')} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
      </div>
      <div className="flex justify-center items-center">
      <i className="fa-solid fa-cart-shopping px-6 cursor-pointer" onClick={()=>navigate('/user/cart')}>{count}</i>
    <button className="text-lg font-bold font-serif" onClick={handleSignout}>Sign Out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Header;
