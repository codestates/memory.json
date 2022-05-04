import React, { Component } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";

const H2 = styled.h2`
  color: white;
`;

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div>
        <H2>Past & Future</H2>
        <Slider {...settings}>
          <div>
            <img src="img/seoul1.png" alt="서울과거사진" />
          </div>
          <div>
            <img src="img/seoul2.png" alt="서울현재사진" />
          </div>
          <div>
            <img src="img/suwon1.png" alt="수원과거사진" />
          </div>
          <div>
            <img src="img/suwon2.png" alt="수원현재사진" />
          </div>
        </Slider>
      </div>
    );
  }
}
