import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { EditProductModal } from "../components/EditProductModal";

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
	const [userListings, setUserListings] = useState([]);
	const [isEditModal, setOpenEditModal] = useState(false);
	const [editProductData, setEditProductData] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("quantity", quantity);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("image", image);

		const res = await fetch("http://127.0.0.1:8000/api/add-item", {
			method: "POST",
			headers: {
				// "Content-Type": "application/json",
				// Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		if (res.ok) {
			toast.success("Product added to Carsumart!");
			setTimeout(() => {
				navigator("/");
			}, 3000);
		} else {
			// Handle error
		}
	};

	const getUserListings = async () => {
		const res = await fetch(
			`http://127.0.0.1:8000/api/display-user-listing/${school_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (res.ok) {
			const data = await res.json();
			setUserListings(data.data);
		}
	};

	const handleRemoveProduct = async (product) => {
		console.log(product);
		const res = await fetch(
			`http://127.0.0.1:8000/api/delete-user-listing/${product}`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		if (res.ok) {
			toast.success("Remove item permanently");
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	};

	useEffect(() => {
		getUserListings();
	}, []);

	const openEditModal = (product) => {
		console.log(product);
		setOpenEditModal(true);
		setEditProductData(product);
		window.scrollTo({ top: 0 });
	};

	const onChangeCloseModal = (value) => {
		console.log(value);
		if (value) {
			setOpenEditModal(false);
		}
	};

	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="container my-5">
				{isEditModal ? (
					<EditProductModal
						editProductData={editProductData}
						openEditModal={(value) => onChangeCloseModal(value)}
					/>
				) : (
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
									type="number"
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
									type="number"
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
								<label htmlFor="itemCategory" className="form-label">
									Category
								</label>
								<select
									className="form-control"
									id="itemCategory"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									required>
									<option value="" disabled>
										Select category
									</option>
									<option value="mensClothing">Men's Clothing</option>
									<option value="womensClothing">Women's Clothing</option>
									<option value="jewelry">Jewelry</option>
									<option value="electronics">Electronics</option>
								</select>
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
				)}
				<div className="mt-5">
					<h2>My Product Listings</h2>
					<div className="row mt-5">
						{userListings.map((product, index) => {
							return (
								<div
									id={product.product_id}
									key={index}
									className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
									<div className="card text-center h-100">
										<img
											className="card-img-top p-3"
											src={product?.image_url}
											alt={product.name}
											height={300}
										/>
										<div className="card-body">
											<h5 className="card-title">{product.name}</h5>
											<p className="card-text">{product.description}</p>
										</div>
										<ul className="list-group list-group-flush">
											<li className="list-group-item lead">$ {product.price}</li>
										</ul>
										<div className="card-body">
											<button
												onClick={() => openEditModal(product.product_id)}
												className="btn btn-primary">
												Update
											</button>
											<button
												onClick={() => handleRemoveProduct(product.product_id)}
												className="btn btn-danger m-1">
												Remove
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Dashboard;
