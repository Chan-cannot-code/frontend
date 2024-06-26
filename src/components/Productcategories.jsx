import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom

export const ProductCategories = ({ category }) => {
 const [data, setData] = useState([]);

 const getProductByCategory = async () => {
  try {
   const res = await fetch(
    `http://127.0.0.1:8000/api/get-product-category/${category}`
   );
   const data = await res.json();
   // console.log(data.products);
   setData(data.products);
  } catch (err) {
   console.log(err);
  }
 };

 useEffect(() => {
  getProductByCategory();
 }, [category]);

 const dispatch = useDispatch();

 const addProduct = (product) => {
  dispatch(addCart(product));
 };

 return (
  <>
   <div className="row">
    {data.map((product, index) => {
     return (
      <div
       id={product.product_id}
       key={index}
       className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
      >
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
         <li className="list-group-item lead">Php {product.price}</li>
        </ul>
        <div className="card-body">
         <Link
          to={"/product/" + product.product_id}
          className="btn btn-dark m-1"
         >
          Buy Now
         </Link>
         <button
          className="btn btn-dark m-1"
          onClick={() => addProduct(product)}
         >
          Add to Cart
         </button>
        </div>
       </div>
      </div>
     );
    })}
   </div>
  </>
 );
};
