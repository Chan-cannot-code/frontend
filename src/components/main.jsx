import { useState, useEffect } from "react";
import img1 from "/CARSU-MART/1.png";
import img2 from "/CARSU-MART/2.png";
import img3 from "/CARSU-MART/3.png";

const Main = () => {
 return (
  <div className="container">
   <div
    id="carouselExampleSlidesOnly"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="3000"
   >
    <div className="carousel-inner">
     <div className="carousel-item active">
      <img src={img1} className="d-block w-100 img-fluid" alt="Slide 1" />
     </div>
     <div className="carousel-item">
      <img src={img2} className="d-block w-100 img-fluid" alt="Slide 2" />
     </div>
     <div className="carousel-item">
      <img src={img3} className="d-block w-100 img-fluid" alt="Slide 3" />
     </div>
    </div>
   </div>
  </div>
 );
};

export default Main;
