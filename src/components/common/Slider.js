import React from "react";
import poster1 from "../../img/poster1.jpg";

import poster3 from "../../img/poster3.jpg";

const Slider = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide w-100" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active w-100">
          <img src={poster1} className="d-block w-100" alt="poster1"/>
        </div>
        <div className="carousel-item">
          <img src={poster3} className="d-block w-100" alt="poster2"/>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Slider;