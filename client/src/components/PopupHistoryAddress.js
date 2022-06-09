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
    const location = locationList.filter(el=> el.address_name === eleid);
    props.setAddress({  
      place_id: "",
      place_address: location[0].address_name,
      place_lng: location[0].x,
      place_lat: location[0].y,
    });
    props.setAddressText(`${location[0].address_name}`)
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
