import React from 'react';
import poster1 from '../img/poster1.png';
import poster2 from '../img/poster2.jpg';
import poster3 from '../img/poster3.jpg';

const Slider = () => {
  return (
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" data-interval="4000">
        <div className="carousel-inner mx-auto">
          <div className="carousel-item active ">
            <img src={poster1} className="d-block w-100" alt="poster1"/>
          </div>
          <div className="carousel-item">
            <img src={poster2} className="d-block w-100" alt="poster2"/>
          </div>
          <div className="carousel-item">
            <img src={poster3} className="d-block w-100" alt="poster3"/>
          </div>
        </div>
      </div>
  )
};

export default Slider;

