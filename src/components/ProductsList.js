import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAuthToken } from "./Authenticate";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = fetchAuthToken();
      const response = await fetch("/api/products", {
        headers: {
          authorisation: token,
        },
      });
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
