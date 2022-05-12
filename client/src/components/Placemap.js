import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const { kakao } = window;

export default function Map() {
  useEffect(() => {
    mapscript();
  });
  const [placeList, setPlaceList] = useState([]);
  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.565805, 126.975161),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);

    // let marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.565805, 126.975161),
    // });

    // marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(37.564805, 126.975161),
    // });

    placeList.map((el) => {
      // 마커 생성
      let marker = new kakao.maps.Marker({
        // 마커가 표시 될 지도
        map: map,
        // 마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.place_lat, el.place_lag),
      });
      console.log(el.place_lat, el.place_lag);
    });
  };

  // const makeMarker = () => {
  //   placeList.forEach((el) => {
  //     new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(el.place_lat, el.place_lng),
  //     });
  //   });
  // };

  // DB로부터 모든 장소정보를 가져와서 placeList에 담아줌.
  const getAllPlaceMarker = () => {
    axios.get(`${serverUrl}places?place_address=${inputText}`).then((res) => {
      if (res.status === 200) {
        // const allPlaceList = res.data.data;
        // console.log(allPlaceList);
        setPlaceList(res.data.data);
      }
    });
  };
  console.log("placeList", placeList);
  const [inputText, setInputText] = useState(" ");
  const [place, setPlace] = useState("");

  // 입력 시 검색 창 상태 변화.
  const onChange = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };
  console.log("inputText", inputText);
  // 검색 버튼 클릭 시 상태 변화
  const handleSubmit = (e) => {
    e.preventDefault();
    // setPlace(inputText);
    // setInputText(e.target.value);
    console.log(inputText);
  };

  // map

  return (
    <>
      <div>
        <form className="inputForm" onSubmit={handleSubmit}>
          <input
            style={{ width: "1450px", height: "50px" }}
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <button
            type="submit"
            onClick={getAllPlaceMarker}
            style={{ width: "48px", height: "50px" }}
          >
            검색
          </button>
        </form>
        {/* <Map searchPlace={place} /> */}
      </div>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </>
  );
}

// const SearchPlace = () => {};
// return (
//   <>
//     <div>
//       <form className="inputForm" onSubmit={handleSubmit}>
//         <input
//           style={{ width: "1450px", height: "50px" }}
//           placeholder="Search Place..."
//           onChange={onChange}
//           value={inputText}
//         />
//         <button type="submit" style={{ width: "48px", height: "50px" }}>
//           검색
//         </button>
//       </form>
//       <MapArea searchPlace={place} />
//     </div>
//   </>
// );
