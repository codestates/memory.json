import React, { Component } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Slide extends Component {
  render(props) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          {props.map((el) => {
            return (
              <div>
                <img src={el.image_name} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
