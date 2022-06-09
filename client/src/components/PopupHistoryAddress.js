import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const PopupHistoryStyle = styled.div`
  display: "block";
  position: "absolute";
  top: "10%";
  width: "600px";
  height: "600px";
  padding: "7px";
`;

const PopupHistoryAddress = (props) => {
  const locationList = props.addressList;
  console.log(locationList);

  const locationCheck = (id) => {
    const eleid = document.getElementById(`${id}`).innerText;
    console.log(eleid)
    console.log(locationList)
    const abc = locationList.filter(el=> el.address_name === eleid)
    console.log(abc)
    props.onClose(); 
  };

  return (
    <PopupHistoryStyle>
      <div>
        {locationList.map((el, i) => {
          return (
            <div key={i}>
              <button
                id={`${i}`}
                onClick={() => {
                  locationCheck(i);
                }}
              >
                {el.address_name}
              </button>
            </div>
          );
        })}
      </div>
      {/*  닫기 버튼 생성 */}
      <Button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="histrotyAddress_btn"
      >
        닫기
      </Button>
    </PopupHistoryStyle>
  );
};

export default PopupHistoryAddress;
