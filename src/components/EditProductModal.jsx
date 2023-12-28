import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProductModal = ({ editProductData, onChangeCloseModal }) => {
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

		const res = await fetch(
			`http://127.0.0.1:8000/api/update-product/${editProductData}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			},
		);
		if (res.ok) {
			toast.success("Updated product");
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		}
	};

	const handleCloseModal = () => {
		console.log("closing modal");
		onChangeCloseModal(true);
	};

	return (
		<div className="card bg-dark text-white border-0 p-4">
			<ToastContainer />
			<h1 className="mb-4">Update product - productname</h1>
			<form>
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
			</form>
			<div className="d-flex justify-content-end">
				<button onClick={handleCloseModal} className="btn btn-danger me-2">
					Cancel
				</button>
				<button onClick={handleSubmit} className="btn btn-primary">
					Update product
				</button>
			</div>
		</div>
	);
};
