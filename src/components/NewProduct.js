import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthToken } from "./Authenticate";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = fetchAuthToken();
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        authorisation: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description }),
    });

    if (response.ok) {
      navigate("/products");
    } else {
      console.error("Failed to create product");
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default NewProduct;
