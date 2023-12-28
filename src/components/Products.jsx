import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Products = () => {
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState([]);
	const [loading, setLoading] = useState(false);
	let componentMounted = true;

	const dispatch = useDispatch();

	const addProduct = (product) => {
		dispatch(addCart(product));
	};

	const getProducts = async () => {
		setLoading(true);
		const response = await fetch("http://127.0.0.1:8000/api/display-products");
		const data = await response.json();
		console.log(data);
		if (componentMounted) {
			setData(data);
			setLoading(false);
			setFilter(data);
		}

		return () => {
			componentMounted = false;
		};
	};

	useEffect(() => {
		getProducts();
	}, []);

	const Loading = () => {
		return (
			<>
				<div className="col-12 py-5 text-center">
					<Skeleton height={40} width={560} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
				<div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
					<Skeleton height={592} />
				</div>
			</>
		);
	};

	// const filterProduct = (cat) => {
	// 	const updatedList = data.filter((item) => item.category === cat);
	// 	setFilter(updatedList);
	// };
	const ShowProducts = () => {
		return (
			<>
				{filter.map((product, index) => {
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
									{/* <li className="list-group-item">Dapibus ac facilisis in</li>
	                   <li className="list-group-item">Vestibulum at eros</li> */}
								</ul>
								<div className="card-body">
									<Link
										to={"/product/" + product.product_id}
										className="btn btn-dark m-1">
										Buy Now
									</Link>
									<button
										className="btn btn-dark m-1"
										onClick={() => addProduct(product)}>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</>
		);
	};
	return (
		<>
			<div className="container my-3 py-3">
				<div className="row">
					<div className="col-12">
						<h2 className="display-5 text-center">Latest Products</h2>
						<hr />
					</div>
				</div>
				<div className="row justify-content-center">
					{loading ? <Loading /> : <ShowProducts />}
				</div>
			</div>
		</>
	);
};

export default Products;
