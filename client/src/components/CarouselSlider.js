import React, { useState, useEffect, useRef } from "react";
import Slide from "./CarouselSlide";
import styled from "styled-components";
// 이미지도 여기서 불러와야 할듯함.

const total_slides = imageList.length - 1;
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  // Next 버튼 클릭 시 실행되는 함수
  const NextButton = () => {
    if (currentSlide >= total_slides) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시 실행되는 함수
  const PrevButton = () => {
    if (currentSlide === 0) {
      setCurrentSlide(total_slides);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <CarouContainer>
        <CarouText>
          <h1>memory</h1>
        </CarouText>
        <SliderContainer ref={slideRef}>
          <Slide />
        </SliderContainer>
        <Center>
          <Button onClick={PrevButton}>prev</Button>
          <Button onClick={NextButton}>next</Button>
        </Center>
      </CarouContainer>
    </>
  );
}
const CarouContainer = styled.div`
  width: 40%;
  margin: auto;
  height: 80%;
  overflow: hidden; // 선을 넘긴 이미지를 숨겨주는 속성
`;
const CarouText = styled.div`
  text-align: center;
  color: burlywood;
  p {
    color: #fff;
    font-size: 20px;
    background-color: burlywood;
    display: inline-block;
    border-radius: 50px;
    padding: 0.5em 1em;
  }
`;
const SliderContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex; // 이미지들을 가로로 나열합니다.
`;
const Button = styled.div`
  all: unset;
  padding: 1em 2em;
  margin: 2em 2em;
  color: burlywood;
  border-radius: 10px;
  border: 1px solid burlywood;
  cursor: pointer;
  &:hover {
    background-color: burlywood;
    color: #fff;
  }
`;
const Center = styled.div`
  text-align: center;
`;
