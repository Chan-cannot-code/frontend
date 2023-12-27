import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";

const Dashboard = () => {
  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [image, setImage] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("productTitle", productTitle);
    formData.append("price", price);
    formData.append("itemDescription", itemDescription);

    try {

      let response = await fetch("http://127.0.0.1:8000/api/products");

      await axios.post("/api/products", formData);
      alert("Product added successfully!");
      setProductTitle("");
      setPrice("");
      setItemDescription("");
      setImage(null);
      fetchRecentTransactions();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setRecentTransactions(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="card bg-dark text-white border-0 p-4">
          <h1 className="mb-4">Welcome to your dashboard!</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productTitle" className="form-label">
                Product Title
              </label>
              <input
                type="text"
                className="form-control"
                id="productTitle"
                placeholder="Product Title"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemDescription" className="form-label">
                Item Description
              </label>
              <textarea
                className="form-control"
                id="itemDescription"
                placeholder="Item Description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </form>
        </div>
        <div className="mt-5">
          <h2>Recent Transactions</h2>
          <ul className="list-group">
            {/* {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="list-group-item">
                {transaction.description}
              </li>
            ))} */}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
