import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const AdminCard = ({ product, allproducts }) => {
  const [spin,setSpin] =useState(false);
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(
    stripHtmlTags(product.description)
  );
  const [price, setPrice] = useState(product.price);
  const [rating, setRating] = useState(product.rating);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);

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

  const handleUpdate = async (id) => {
    setSpin(true);
    let token = localStorage.getItem('shoppingtoken');
    const data = await fetch(`https://shopping-backend-vsg9.onrender.com/updateproduct/${id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization:token
      },
      body: JSON.stringify({
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
      setSpin(false)
      toast.success("Updated successfully!!");
      allproducts();
      closeModal();
    } else {
      setSpin(false)
      toast.error(res.error);
    }
  };

  const handleDelete = async (id) => {
    setSpin(true);
    let token = localStorage.getItem('shoppingtoken')
    const data = await fetch(`https://shopping-backend-vsg9.onrender.com/deleteproduct/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization:token
      },
    });
    const res = await data.json();
    if (data.status === 200) {
      setSpin(false)
      toast.success("Deleted successfully!!");
      allproducts();
    } else {
      setSpin(false);
      toast.error(res.error);
    }
  };

  return (
    <>
      <div className="w-96 border p-2 shadow-lg m-2">
        <div className="flex justify-between items-center">
          <p className="text-xs">
            <span className="bg-slate-300 rounded-lg p-1 text-green-800">
              ⭐{product.rating.rate}
            </span>
          </p>
          <div className="flex">
            <p className="cursor-pointer px-2" onClick={openModal}>
              <i className="fa-regular fa-pen-to-square"></i>
            </p>

            {spin ? (
          <button>
            <CircularProgress size="1.2rem" />
          </button>
        ) : (
          <p
              className="px-2 cursor-pointer"
              onClick={() => handleDelete(product._id)}
            >
              <i className="fa-solid fa-trash"></i>
            </p>
        )}

           
          </div>
        </div>
        <img src={product.image} className="w-1/2 h-56 m-auto" alt="item" />
        <div className="">
          <p className="font-bold text-center">{product.title}</p>
          <p className="text-sm font-serif text-gray-500 py-2">
            {product.description}
          </p>
          <p className="font-bold text-red-600">₹{product.price}</p>
        </div>
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
           <select value={category} onChange={e=>setCategory(e.target.value)} className='p-2 rounded border shadow w-full my-2 '>
              <option value="women's clothing">Women's Clothing</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelry">Jewellery</option>
            </select>
          <br />
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
            value={rating.rate}
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
          className="border shadow-lg p-2 rounded bg-red-500 text-white"
          onClick={() => handleUpdate(product._id)}
        >
          Update
        </button>
        )}

      </Modal>
    </>
  );
};

export default AdminCard;
