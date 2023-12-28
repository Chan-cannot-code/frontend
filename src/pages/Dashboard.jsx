import React, { useState } from "react";
import { Navbar, Footer } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const [name, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [category, setCategory] = useState("");
	const [description, setItemDescription] = useState("");
	const [image, setImage] = useState(null);

	const navigator = useNavigate();

	const token = localStorage.getItem("token");
	const school_id = localStorage.getItem("school_id");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("quantity", quantity);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("image", image);

		console.log(quantity);

		const res = await fetch("http://127.0.0.1:8000/api/add-item", {
			method: "POST",
			headers: {
				// "Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const data = await res.json();

		console.log(data);

		if (res.ok) {
			toast.success("Product added to Carsumart!");
			setTimeout(() => {
				navigator("/");
			}, 3000);
		} else {
			// Handle error
		}
	};

	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="container my-5">
				<div className="card bg-dark text-white border-0 p-4">
					<h1 className="mb-4">Welcome to your dashboard!</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="productTitle" className="form-label">
								Product Name
							</label>
							<input
								type="text"
								className="form-control"
								id="productTitle"
								placeholder="Product name"
								value={name}
								onChange={(e) => setProductName(e.target.value)}
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
							<label htmlFor="price" className="form-label">
								Quantity
							</label>
							<input
								type="text"
								className="form-control"
								id="price"
								placeholder="quantity"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
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
								value={description}
								onChange={(e) => setItemDescription(e.target.value)}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="itemDescription" className="form-label">
								Category
							</label>
							<textarea
								className="form-control"
								id="itemDescription"
								placeholder="Item category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
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
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files[0];
									setImage(file);
								}}
								required
							/>
						</div>
						<button onClick={handleSubmit} className="btn btn-primary">
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
