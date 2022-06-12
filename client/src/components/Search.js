import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";

function SearchAddress() {
  // address 정보
  const [address, setAddress] = useState({});
  // 주소 검색 창
  const [addressText, setAddressText] = useState("");
  console.log(addressText);

  const searchInputAddress = (e) => {
    console.log(e);
    setAddressText(e.target.value);
    // console.log("주소 검색 창", addressText);
  };

  const callAddress = async () => {
    const config = {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
      },
      withCredentials: false,
    };
    console.log(config);
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${addressText}`;
    // console.log(url);
    const res = await axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        const location = res.data.documents[0];
        setAddress({
          place_address: location.address_name,
          place_location: [location.x, location.y],
        });
        console.log("address", address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <span style={{ color: "white" }}>장소</span>
        <input
          type={"text"}
          value={addressText}
          placeholder={"주소를 입력해주세요."}
          onChange={searchInputAddress}
        ></input>
        <Button onClick={callAddress}>검색</Button>
      </div>
    </>
  );
}

export default SearchAddress;
