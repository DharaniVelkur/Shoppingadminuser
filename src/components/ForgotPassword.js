import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  let [message, setMessage] = useState(false);
  let [spin, setSpin] = useState(false);
  let navigate = useNavigate();

  const uservalid = async () => {
    const response = await fetch(
      `http://localhost:8000/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      console.log("user valid");
    } else {
      navigate("*");
    }
  };

  let sendpassword = async (e) => {
    setSpin(true);
    e.preventDefault();
    if (password === "") {
      setSpin(false);
      toast.error("Password is required!!");
    } else {
      const res = await fetch(
        `http://localhost:8000/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setSpin(false);
        setPassword("");
        setMessage(true);
      } else {
        setSpin(false);
        toast.error("Token expired,generate a new link");
      }
    }
  };

  useEffect(() => {
    uservalid();
  }, []);

  return (
    <>
      <div className="bg-slate-200 h-screen pt-16 ">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <p className="font-bold font-serif p-4" style={{ fontSize: "30px" }}>
            Enter New Password
          </p>
          {message ? (
            <p className="text-green-500">Password updated successfully!!!</p>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Enter new Password"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {spin ? (
            <button className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg">
              <CircularProgress size="1.2rem" />
            </button>
          ) : (
            <button
              className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg font-bold font-serif"
              onClick={sendpassword}
            >
              Send
            </button>
          )}
          <p className=" pb-6 ">
            <Link to={"/"}>
              <span className="cursor-pointer hover:text-lime-500 font-bold">
                &larr;Back to Login
              </span>
            </Link>
          </p>
          {/* <p className=" pb-6 cursor-pointer hover:underline font-bold">Forgot Password?</p> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
