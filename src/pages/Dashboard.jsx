import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { EditProductModal } from "../components/EditProductModal";
import { AddProduct } from "../components/AddProduct";
import { UpdateProduct } from "../components/UpdateProduct";

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

 const [productId, setProductId] = useState("");

 const [addProduct, setAddProduct] = useState(false);

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
   }
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
   }
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

 const [updateData, setUpdateData] = useState(null);
 const openEditModal = (id, product) => {
  console.log(id);
  setProductId(id);
  setUpdateData(product);
  setOpenEditModal(true);
  setEditProductData(id);
  window.scrollTo({ top: 0 });
 };

 const onChangeCloseModal = (value) => {
  if (value) {
   setOpenEditModal(false);
   window.location.reload();
  }
 };

 const openAddProductModal = () => {
  setAddProduct(true);
 };

 const closeModal = (e) => {
  e ? setAddProduct(false) : "";
 };
 const closeModalEdit = (e) => {
  e ? setOpenEditModal(false) : "";
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("image", image);

  try {
   console.log(image);
   const res = await fetch("http://127.0.0.1:8000/api/add-item", {
    method: "POST",
    headers: {
     Authorization: `Bearer ${token}`,
    },
    body: formData,
   });
   if (res.ok) {
    toast.success("Product added to Carsumart!");
    setTimeout(() => {
     closeModal(true);
     navigator("/");
    }, 3000);
   }
  } catch (err) {
   console.log(err);
  }
 };

 return (
  <>
   <Navbar />
   <ToastContainer className="toaster" />
   <div className="container my-5">
    {isEditModal ? (
     <UpdateProduct
      product_id={productId}
      updateData={updateData}
      closeModalEdit={(e) => closeModalEdit(e)}
     />
    ) : (
     ""
    )}
    {addProduct ? <AddProduct closeModal={(e) => closeModal(e)} /> : ""}
    <div className="mt-5">
     <div className="d-flex align-items-center justify-content-between">
      <h2>My Product Listings</h2>
      <button onClick={openAddProductModal} className="btn btn-primary">
       + add product
      </button>
     </div>
     <div className="row mt-5">
      {userListings.map((product, index) => {
       return (
        <div
         id={product.product_id}
         key={index}
         className="col-md-4 col-sm-6 col-xs-8 col-12 mb-2"
        >
         <div className="card text-center">
          <img
           className="card-img-top p-3"
           src={product?.image_url}
           alt={product.name}
           height={250}
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
            onClick={() => openEditModal(product.product_id, product)}
            className="btn btn-primary"
           >
            Update
           </button>
           <button
            onClick={() => handleRemoveProduct(product.product_id)}
            className="btn btn-danger m-1"
           >
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
