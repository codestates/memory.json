import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "./History.style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import Button from "./Button";

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const { kakao } = window;

export default function Map() {
  const [isHistory, setIsHistory] = useState(false);
  const [placeList, setPlaceList] = useState([]);

  // 위도 경도 상태값
  const [statePlace, setStatePlace] = useState({
    center: { lat: 37.565805, lng: 126.975161 },
  });

  // 주소검색창 안 값의 변화
  const [inputText, setInputText] = useState(" ");

  // 입력 시 검색 창 상태 변화.
  const onChange = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // DB로부터 장소에 해당하는 사진 목록을 모두 불러와서 imageList에 담아줌.
  const [imageList, setImageList] = useState([]);

  // 히스토리 목록 불러오기.
  const [historyList, setHistoryList] = useState([]);

  const mapFirst = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        statePlace.center.lat,
        statePlace.center.lng
      ),
      level: 9,
    };

    const map = new kakao.maps.Map(container, options);
    kakao.maps.event.addListener(map, "dragend", function () {
      // 지도 중심좌표를 얻어옵니다
      const latlng = map.getCenter();
      let latCheck = latlng.getLat()
      let lngCheck = latlng.getLng()
      setStatePlace({
        center: { lat: latCheck, lng: lngCheck },
      });
      console.log(statePlace)
    });
  };
  useEffect(() => {
    mapFirst();
  }, [statePlace]);

  const mapSearch = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        statePlace.center.lat,
        statePlace.center.lng
      ),
      level: 9,
    };

    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(inputText, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setStatePlace({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
        console.log(statePlace.center.lat);
      }
    });
  };

  // placeList 가져오기. 문제없음.
  const getPlaceList = () => {
    axios
      .get(`${serverUrl}places?place_address=${inputText}`)
      .then((res) => {
        if (res.status === 200) {
          setPlaceList(res.data.data);
        }
      })
      .then(() => {
        mapscript();
      });
  };

  const mapscript = () => {
    console.log("실행");
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        statePlace.center.lat,
        statePlace.center.lng
      ),
      level: 9,
    };
    const map = new kakao.maps.Map(container, options);

    placeList.map((el) => {
      // 마커 생성
      const marker = new kakao.maps.Marker({
        // 마커가 표시 될 지도
        map: map,
        // 마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.place_lat, el.place_lng),
      });

      // 마커 클릭 시 함수 실행. (historyList 및 imageList 생성)
      kakao.maps.event.addListener(marker, "click", function () {
        // 게시물 노출 => 무한스크롤.
        axios.get(`${serverUrl}histories/place/${el.id}`).then((res) => {
          if (res.status === 200) {
            setHistoryList(res.data.data);
            setIsHistory(true);
            return getImage();
            // 해당 장소의 모든 히스토리의 각각의 이미지 가져오기.
          }
        });
      });
    });
    console.log("history", historyList);
    console.log("imageList", imageList);
    console.log("id", historyList.length);
    console.log(isHistory);
  };

  //사진 가져오기 (수정중)
  const getImage = () => {
    historyList.map((el) => {
      axios
        .get(`${serverUrl}histories/photo?historyid=${el.id}`)
        .then((res) => {
          if (res.status === 200) {
            setImageList(res.data.data);
          }
        });
    });
  };

  const Image = styled.img`
    max-width: 50%;
    max-height: 50%;
  `;

  const Slide = () => {
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
          {imageList.map((el) => {
            return (
              <div>
                <Image
                  src={el.image_name}
                  style={{
                    // objectFit: "contain",
                    display: "block",
                    margin: "auto",
                    justifyContent: "center",
                  }}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  };

  const [listComment, setListComment] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let accessToken = "";
  if (localStorage.accessToken) {
    accessToken = JSON.parse(localStorage.accessToken).accessToken;
  }

  const historyId = 1001; // 이건 ishistoryId가 있을 대체해야 함
  const userId = accessToken ? 1007 : ""; // 이건 isUserId가 있을 때 대체해야 함

  console.log(accessToken);

  function registCommentHandler() {
    const comment = document.querySelector("#comment").value;

    axios
      .post(
        `${serverUrl}comments/${historyId}`,
        { comments_content: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        listCommentHandler();
      })
      .catch((err) => console.log(err));
  }

  function deleteCommentHandler(commentId) {
    axios
      .delete(`${serverUrl}comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        listCommentHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeCommentHandler(commentId) {}

  const listCommentHandler = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    if (!accessToken) {
      headers = { "Content-Type": "application/json" };
    }
    axios
      .get(`${serverUrl}comments/${historyId}`, { headers: headers })
      .then((data) => {
        setListComment(data.data.data.listComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function favoriteHandler() {
    if (!accessToken) {
      return alert("회원만 좋아요 할 수 있습니다.");
    }
    axios
      .post(
        `${serverUrl}favorites/${historyId}`,
        { history_id: historyId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => {
        setIsFavorite(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getFavorite = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    if (!accessToken) {
      headers = { "Content-Type": "application/json" };
    }
    axios
      .get(`${serverUrl}favorites/${historyId}`, { headers: headers })
      .then((data) => {
        setIsFavorite(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(isFavorite);

  useEffect(() => {
    if (isFavorite.like === undefined) {
      getFavorite();
      listCommentHandler();
    }
  }, []);

  return (
    <>
      <S.Searchmapflex>
        <form className="inputForm" onSubmit={handleSubmit}>
          <S.Inputbutton>
            <input
              style={{
                width: "500px",
                height: "50px",
              }}
              placeholder="Search Place..."
              onChange={onChange}
              value={inputText}
            />
            <button
              type="submit"
              onClick={mapSearch}
              style={{ width: "48px", height: "50px" }}
            >
              검색
            </button>
            <button
              type="submit"
              onClick={getPlaceList}
              style={{ width: "130px", height: "50px" }}
            >
              주변 히스토리 검색
            </button>
          </S.Inputbutton>
        </form>
        <S.Kakaomap>
          <div
            id="map"
            style={{
              width: "600px",
              height: "600px",
              zIndex: "0",
            }}
            level={8}
          ></div>
        </S.Kakaomap>
      </S.Searchmapflex>
      <div>
        {!isHistory ? (
          <></>
        ) : (
          <>
            {historyList.map((el) => {
              return (
                <S.OuterDiv>
                  <S.HistoryDiv>
                    <S.Image>
                      <Slide />
                    </S.Image>
                    <S.YearFavorite>
                      <div>{el.history_year}</div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "right",
                        }}
                      >
                        <div>
                          {isFavorite.like === "T" ? (
                            <Button
                              style={{ background: "red" }}
                              onClick={favoriteHandler}
                            >
                              좋아요
                            </Button>
                          ) : (
                            <Button
                              style={{ background: `white`, color: "black" }}
                              onClick={favoriteHandler}
                            >
                              ♥︎
                            </Button>
                          )}
                          <span style={{ padding: "10px", color: "white" }}>
                            {isFavorite.like_count}
                          </span>
                        </div>
                      </div>
                    </S.YearFavorite>
                    <S.Title>
                      <div>{el.history_title}</div>
                    </S.Title>
                    <S.Content>
                      <div>{el.history_content}</div>
                    </S.Content>
                    <S.Commentdiv>
                      <Commentinput>
                        <input
                          id="comment"
                          type="text"
                          style={{
                            width: "100%",
                            height: "50px",
                            backgroundColor: "#DBD0C0",
                            border: "none",
                          }}
                          placehoder="여기에 댓글을 작성하세요"
                        ></input>
                        <div>
                          {!accessToken ? (
                            <Button
                              onClick={registCommentHandler}
                              style={{ display: "none" }}
                            >
                              Comment
                            </Button>
                          ) : (
                            <Button onClick={registCommentHandler}>
                              Comment
                            </Button>
                          )}
                        </div>
                      </Commentinput>
                      <Commentarea>
                        <ul
                          style={{
                            width: "80%",
                          }}
                        >
                          {listComment.map((comment) => {
                            return (
                              <Comment
                                key={comment.id}
                                comment={comment}
                                userId={userId}
                                deleteComment={deleteCommentHandler}
                                changeComment={changeCommentHandler}
                              />
                            );
                          })}
                        </ul>
                      </Commentarea>
                    </S.Commentdiv>
                  </S.HistoryDiv>
                </S.OuterDiv>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

const Commentinput = styled.div`
  width: 98%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px 1px 5px 1px;
`;

const Commentarea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  margin: 5px 1px 5px 1px;
`;

// 지도를 스크롤할때 그 위치정보를 가져와서 inputtext에 넣어준다
