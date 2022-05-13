import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "../pages/Main.style";

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const { kakao } = window;

export default function Map() {
  useEffect(() => {
    mapscript();
  });
  const [isHistory, setIsHistory] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.565805, 126.975161),
      level: 8,
    };

    const map = new kakao.maps.Map(container, options);

    placeList.map((el) => {
      // 마커 생성
      let marker = new kakao.maps.Marker({
        // 마커가 표시 될 지도
        map: map,
        // 마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.place_lat, el.place_lng),
      });
      console.log(el.place_lat, el.place_lng);
      // if (placeList.length === 1) {
      //   let moveLatLng = new kakao.maps.LatLng(
      //     placeList.place_lat,
      //     placeList.place_lng
      //   );
      //   map.setCenter(moveLatLng);
      // }
      kakao.maps.event.addListener(marker, "click", function () {
        // 게시물 노출
        axios.get(`${serverUrl}histories/place/${el.id}`).then((res) => {
          if (res.status === 200) {
            setHistoryList(res.data.data);
            setIsHistory(true);
            return axios
              .get(`${serverUrl}histories/photo?historyid=${historyList[0].id}`)
              .then((res) => {
                if (res.status === 200) {
                  setImageList(res.data.data);
                }
              });
          }
        });
        // 사진 가져오기 (수정중)
        // .get(`${serverUrl}histories/photo?historyid=${historyList.id}`)
        // .then((res) => {
        //   if (res.status === 200) {
        //     setImageList(res.data.data);
        //   }
        // });
      });
      console.log("imageList", imageList);
      console.log("id", historyList[0].id);
      console.log(isHistory);
    });
  };

  const ShowHistory = () => {
    for (let i = 0; i < placeList.length; i++) {
      return (
        <S.ViewContainer>
          <S.ViewSection>
            <S.ViewDiv>
              <h1
                style={{ color: "white" }}
              >{`${historyList[i].history_title}`}</h1>
              <h1
                style={{ color: "white" }}
              >{`${historyList[i].history_content}`}</h1>
              <h1
                style={{ color: "white" }}
              >{`${historyList[i].history_year}`}</h1>
            </S.ViewDiv>
          </S.ViewSection>
        </S.ViewContainer>
      );
    }
  };
  // const ShowHistory = (i) => {};

  // const makeMarker = () => {
  //   placeList.forEach((el) => {
  //     new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(el.place_lat, el.place_lng),
  //     });
  //   });
  // };
  const [inputText, setInputText] = useState(" ");
  const [place, setPlace] = useState("");
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

  // DB로부터 장소에 해당하는 사진 목록을 모두 불러와서 imageList에 담아줌.
  const [imageList, setImageList] = useState([]);
  const getAllImageList = () => {
    axios
      .get(`${serverUrl}histories/photo?historyid=${historyList.place_id}`)
      .then((res) => {
        if (res.status === 200) {
          setImageList(res.data.data);
        }
      });
  };
  // 히스토리 목록 불러오기.
  const [historyList, setHistoryList] = useState([]);

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
            style={{ width: "1000px", height: "50px" }}
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
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      {!isHistory ? <></> : <ShowHistory></ShowHistory>}
      <>
        {/* {historyList.map(() => {
        return (
          <History
            title={historyList.history_title}
            content={historyList.history_content}
            year={historyList.history_year}
            image={}
            comment={}
            favorite={}
          />
        )
      })} */}
      </>
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
