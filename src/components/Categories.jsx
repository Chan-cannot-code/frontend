import { useState } from "react";
import { ProductCategories } from "./Productcategories";

export const Categories = () => {
 const [activeButton, setActiveButton] = useState("mensClothing");

 const handleButtonClick = (category) => {
  setActiveButton(category);
 };

 return (
  <>
   <div className="container mt-5">
    <h3>Categories</h3>
    <div className="d-flex gap-2 flex-row pt-2">
     <button
      className={`btn border rounded category_text ${
       activeButton === "mensClothing" ? "btn-primary" : ""
      }`}
      onClick={() => handleButtonClick("mensClothing")}
     >
      Men's Clothing
     </button>
     <button
      className={`btn border rounded category_text ${
       activeButton === "womensClothing" ? "btn-primary" : ""
      }`}
      onClick={() => handleButtonClick("womensClothing")}
     >
      Women's Clothing
     </button>
     <button
      className={`btn border rounded category_text ${
       activeButton === "jewelry" ? "btn-primary" : ""
      }`}
      onClick={() => handleButtonClick("jewelry")}
     >
      Jewelry
     </button>
     <button
      className={`btn border rounded category_text ${
       activeButton === "electronics" ? "btn-primary" : ""
      }`}
      onClick={() => handleButtonClick("electronics")}
     >
      Electronics
     </button>
    </div>
    <div className="mt-3">
     <ProductCategories category={activeButton} />
    </div>
   </div>
  </>
 );
};
