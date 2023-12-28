import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCard from "./AdminCard";
import CircularProgress from "@mui/material/CircularProgress";
import Shimmer from "./Shimmer";

const AdminBody = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [spin, setSpin] = useState(false);
  const [loading,setLoading] =useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const allproducts = async function () {
    setLoading(true);
    let token = localStorage.getItem("shoppingtoken");
    const data = await fetch("https://shopping-backend-vsg9.onrender.com/allproducts", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await data.json();
    if (data.status === 200) {
      setLoading(false);
      setProducts(res.products);
    } else {
      setLoading(false);
      console.log(res.error);
    }
  };

  useEffect(() => {
    allproducts();
  }, []);

  const handleAdd = async () => {
    setSpin(true);
    let token = localStorage.getItem("shoppingtoken");
    const data = await fetch("https://shopping-backend-vsg9.onrender.com/addproduct", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        id: uuidv4(),
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
        rating: rating,
      }),
    });
    const res = await data.json();
    if (data.status === 200) {
      setSpin(false);
      toast.success("Product added successfully");
      allproducts();
      closeModal();
    } else {
      setSpin(false);
      toast.error(res.error);
    }
  };

  return (
    <div>
  
      <div className="flex flex-wrap justify-center items-center ">
      {loading&&<Shimmer/>}
        {products?.map((product) => (
          <AdminCard product={product} allproducts={allproducts} />
        ))}
      </div>
      <div
        className="fixed bottom-8 right-8 bg-red-300 text-center text-white p-4 cursor-pointer"
        style={{ borderRadius: "50%" }}
        onClick={openModal}
      >
        ➕
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form className="lg:w-96">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded border shadow w-full my-2"
          />
          <br />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded border shadow w-full my-2"
          />
          <br />
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded border shadow w-full my-2"
          />
          <br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded border shadow w-full my-2 text-slate-400"
          >
            <option value="" hidden>
              Category
            </option>
            <option value="women's clothing" className="text-black">
              Women's Clothing
            </option>
            <option value="men's clothing" className="text-black">
              Men's Clothing
            </option>
            <option value="electronics" className="text-black">
              Electronics
            </option>
            <option value="jewelry" className="text-black">
              Jewellery
            </option>
          </select>
          {/* <input type='text' placeholder='Enter Category' value={category} onChange={e=>setCategory(e.target.value)} className='p-2 rounded border shadow w-full my-2'   /><br/> */}
          <input
            type="text"
            placeholder="Enter image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 rounded border shadow w-full my-2"
          />
          <br />
          <input
            type="text"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-2 rounded border shadow w-full my-2"
          />
          <br />
        </form>
        {spin ? (
          <button className=" p-2 shadow-lg border w-24 bg-slate-100 text-white rounded-lg">
            <CircularProgress size="1.2rem" />
          </button>
        ) : (
          <button
            className="border shadow-lg p-2 w-24 rounded bg-red-500 text-white"
            onClick={handleAdd}
          >
            Add
          </button>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AdminBody;
