import React, { useEffect, useState } from "react";
import Card from "./Card";

const Body = ({getuserCart}) => {
  const [products, setProducts] = useState([]);
  const [fproducts, setFproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = () => {
    if (search) {
      let searchedproducts = fproducts.filter((e) =>
        e?.title.toLowerCase()?.includes(search.toLowerCase())
      );
      setFproducts(searchedproducts);
    } else {
      setFproducts(products);
      setCategoryFilter("");
      setSortByPrice("");
    }
  };



  const handleApply = () => {
    let sortedProducts = [...products];

    if (categoryFilter) {
      sortedProducts = products?.filter((p) => p.category === categoryFilter);
    }

    if (sortByPrice === "low to high") {
      sortedProducts?.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "high to low") {
      sortedProducts?.sort((a, b) => b.price - a.price);
    }
    if (sortedProducts) setFproducts(sortedProducts);
    else setFproducts(products);
  };

  const handlerating = () => {
    const filteredratings = [...fproducts]?.sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
    setFproducts(filteredratings);
  };

  const handleReset = () => {
    setCategoryFilter("");
    setSortByPrice("");
    setFproducts(products);
  };

  const allproducts = async function () {
    let token= localStorage.getItem('shoppingtoken');
    const data = await fetch("http://localhost:8000/allproducts", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token
      },
    });
    const res = await data.json();
    // console.log(res.products);
    if (data.status === 200) {
      setProducts(res.products);
      setFproducts(res.products);
    } else {
      console.log(res.error);
    }
  };

  useEffect(() => {
    allproducts();
  }, []);

  return (
    <div className="mt-16">
      <div className="py-4  text-center">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="lg:w-3/12 sm:w-4/12 p-2 m-2 border shadow-md"
        />
        <button className="p-2 border rounded shadow-lg" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center py-3">
        Filter By:
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </span>
        <select
          className="border rounded p-2 m-2 shadow"
          value={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.value)}
        >
          <option value="" hidden>
            Sort By Price
          </option>
          <option value="low to high">Low to High</option>
          <option value="high to low">High to Low</option>
        </select>
        <select
          className="border rounded p-2 m-2 shadow"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="" hidden>
            Sort By Category
          </option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewellery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <button
          className="border rounded p-2 m-2 shadow"
          onClick={handlerating}
        >
          Rating
        </button>
        <button
          className="border rounded p-2 m-2 shadow bg-green-500 text-white "
          onClick={handleApply}
          title="Apply"
        >
          ✔️
        </button>
        <button
          className="border rounded p-2 m-2 shadow bg-blue-400 text-white "
          onClick={handleReset}
          title="Reset"
        >
          🔃
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center ">
        {fproducts?.map((product) => (
          <Card product={product} getuserCart={getuserCart}/>
        ))}
      </div>
    </div>
  );
};

export default Body;
