import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import NewProduct from "./components/NewProduct";

function App() {
  const [isAuthticated, setIsAuthticated] = useState(false);

  return (
    <div>
      <Authenticate
        isAuthticated={isAuthticated}
        setIsAuthticated={setIsAuthticated}
      />
      <Router>
        {isAuthticated && (
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/products/new">Create Product</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route
                path="/"
                element={<h1>Welcome to the Product Management App</h1>}
              />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/new" element={<NewProduct />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
