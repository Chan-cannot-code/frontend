import React from "react";
import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const AddProduct = ({ closeModal }) => {
 const [name, setProductName] = useState("");
 const [price, setPrice] = useState("");
 const [quantity, setQuantity] = useState(0);
 const [category, setCategory] = useState("");
 const [description, setItemDescription] = useState("");
 const [image, setImage] = useState(null);

 const navigator = useNavigate();

 const token = localStorage.getItem("token");

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
     window.location.reload();
    }, 3000);
   }
  } catch (err) {
   console.log(err);
  }
 };

 const [renderImg, setRenderImg] = useState("");

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   setRenderImg(URL.createObjectURL(file));
   setImage(file);
  }
 };

 useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
   document.body.style.overflow = "auto";
  };
 }, []);
 const handleClose = () => {
  closeModal(true);
 };

 return (
  <>
   <ToastContainer />

   <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center bg-blur container-fluid">
    <div className="modal-container bg-white shadow rounded p-4">
     <div className="d-flex align-items-center justify-content-between mb-3">
      <h4>Add Product</h4>
      <IoIosCloseCircle
       onClick={handleClose}
       size={24}
       className="text-danger cursor-pointer"
      />
     </div>
     <p className="fs-6">Add new item to sell on the carsumart platform</p>
     <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between gap-3">
       <div className="">
        <label
         htmlFor="image"
         className="img_label_container border rounded-2 d-flex align-items-center justify-content-center cursor-pointer p-2"
        >
         <div className="d-flex flex-column align-items-center text-center">
          <IoMdCloudUpload size={75} />
          <p className="img_text">Upload image</p>
         </div>
         <input
          type="file"
          className="form-control form-control-sm d-none"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
         />
        </label>
       </div>
       {renderImg && (
        <img
         src={renderImg}
         alt="Selected Product"
         className="border selected_img rounded-2"
         style={{ maxHeight: "100px" }}
        />
       )}
       {/* Product Name input */}
       <div className="mb-3 w-100">
        <label htmlFor="productTitle" className="form-label">
         <p className="fs-6 m-0">Product Name</p>
        </label>
        <input
         type="text"
         className="form-control form-control-sm"
         id="productTitle"
         placeholder="Product name"
         value={name}
         onChange={(e) => setProductName(e.target.value)}
         required
        />
       </div>
      </div>
      {/* Price input */}
      <div className="mb-3">
       <label htmlFor="price" className="form-label">
        <p className="fs-6 m-0">Price</p>
       </label>
       <input
        type="number"
        className="form-control form-control-sm"
        id="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
       />
      </div>
      {/* Quantity input */}
      <div className="mb-3">
       <label htmlFor="quantity" className="form-label">
        <p className="fs-6 m-0">Quantity</p>
       </label>
       <input
        type="number"
        className="form-control form-control-sm"
        id="quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
       />
      </div>
      {/* Item Description input */}
      <div className="mb-3">
       <label htmlFor="itemDescription" className="form-label">
        <p className="fs-6 m-0">Item Description</p>
       </label>
       <textarea
        className="form-control form-control-sm"
        id="itemDescription"
        placeholder="Item Description"
        value={description}
        onChange={(e) => setItemDescription(e.target.value)}
        required
       />
      </div>
      {/* Category input */}
      <div className="mb-3">
       <label htmlFor="itemCategory" className="form-label">
        <p className="fs-6 m-0">Category</p>
       </label>
       <select
        className="form-control form-control-sm"
        id="itemCategory"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
       >
        <option value="" disabled>
         Select category
        </option>
        <option value="mensClothing">Men's Clothing</option>
        <option value="womensClothing">Women's Clothing</option>
        <option value="jewelry">Jewelry</option>
        <option value="electronics">Electronics</option>
       </select>
      </div>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-sm">
       Add Item
      </button>
     </form>
    </div>
   </div>
   <style jsx>{`
    .bg-blur {
     backdrop-filter: blur(10px);
     background-color: rgba(255, 255, 255, 0.7);
     z-index: 9999;
    }
    .cursor-pointer {
     cursor: pointer;
    }
    .modal-container {
     width: 100%;
     max-width: 500px; /* Adjust the max-width as needed */
     margin: auto;
     padding: 20px;
     position: relative;
    }
   `}</style>
  </>
 );
};
