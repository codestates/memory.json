import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const PostCodeStyle = styled.div`
  display: "block";
  position: "absolute";
  top: "10%";
  width: "600px";
  height: "600px";
  padding: "7px";
`;

const PopupPostCode = (props) => {

  // 우편번호 검색 후 주소 클릭 시 실행 함수
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    console.log(data);

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
    console.log(data.zonecode);

    props.onClose();
    props.setZoneCode(data.zonecode);
    props.setAddressDetail(fullAddress);
  };

  return (
    <PostCodeStyle>
      <DaumPostcode onComplete={handlePostCode} />
      {/*  닫기 버튼 생성 */}
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </button>
    </PostCodeStyle>
  );
};

export default PopupPostCode;
