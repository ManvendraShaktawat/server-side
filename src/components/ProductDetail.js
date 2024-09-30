import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAuthToken } from "./Authenticate";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = fetchAuthToken();
      const response = await fetch(`/api/products/${id}`, {
        headers: {
          authorisation: token,
        },
      });
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {product.name ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      ) : (
        <h2>{product.error.message}</h2>
      )}
    </div>
  );
};

export default ProductDetail;
