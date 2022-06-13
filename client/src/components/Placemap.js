import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "./History.style";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Comment from "./Comment";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { userinfoAction } from "../store/actions";

axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
const { kakao } = window;

export default function Map() {
  // 유저 정보 가져오기
  const dispatch = useDispatch();

  useEffect(() => {
    bringUserinformation();
  }, []);

  const bringUserinformation = () => {
    // console.log(accessToken)
    axios
      .get(`${serverUrl}users`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const userInformation = res.data.data;
          console.log(userInformation);
          console.log(userInformation.profile);
          dispatch(
            userinfoAction(
              userInformation.address,
              userInformation.age,
              userInformation.email,
              userInformation.id,
              userInformation.mobile,
              userInformation.provider,
              userInformation.sex,
              userInformation.social_id,
              userInformation.user_account,
              userInformation.user_name
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  const [isHistory, setIsHistory] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  console.log("placeList", placeList);

  const [kakaoMap, setKakaoMap] = useState(null);
  // 위도 경도 상태값
  const [statePlace, setStatePlace] = useState({
    center: { lat: 37.565805, lng: 126.975161 },
  });

  // 줌 값
  const [zoomLevel, setZoomLevel] = useState(9);

  // 주소검색 마커
  const [addressMarker, setAddressMarker] = useState(null);
  // 인포윈도우
  const [kakaoInfo, setKakaoInfo] = useState(null);
  // 히스토리 마커
  const [historyMakrer, setHistoryMarker] = useState(null);

  // 주소검색창 안 값의 변화
  const [inputText, setInputText] = useState(" ");
  console.log(inputText);

  // 입력 시 검색 창 상태 변화.
  const onChange = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [error, setError] = useState(false);

  // DB로부터 장소에 해당하는 사진 목록을 모두 불러와서 imageList에 담아줌.
  const [imageList, setImageList] = useState([]);
<<<<<<< HEAD
  // const [imgList, setImgList] = useState();
=======
  console.log("imageList", imageList);
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b

  // 히스토리 목록 불러오기.
  const [historyList, setHistoryList] = useState([]);
  console.log("historyList", historyList);

  const mapFirst = () => {
    console.log("mapFirst실행");
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        statePlace.center.lat,
        statePlace.center.lng
      ),
      level: zoomLevel,
    };
    const map = new kakao.maps.Map(container, options);
    setKakaoMap(map);

    kakao.maps.event.addListener(map, "dragend", function () {
      // 지도 중심좌표를 얻어옵니다
      const geocoder = new kakao.maps.services.Geocoder();
      const latlng = map.getCenter();
      const latCheck = latlng.getLat();
      const lngCheck = latlng.getLng();
      const coords = new kakao.maps.LatLng(latCheck, lngCheck);
      setStatePlace({
        center: { lat: coords.Ma, lng: coords.La },
      });
      console.log(coords);
      map.panTo(coords);
      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
<<<<<<< HEAD
          console.log(result[0]);
=======
          // console.log(result[0]);
          let searchAddress = result[0];
          // console.log(searchAddress.address.region_1depth_name)
          setInputText(
            `${searchAddress.address.region_1depth_name}` +
              " " +
              `${searchAddress.address.region_2depth_name}` +
              " " +
              `${searchAddress.address.region_3depth_name}`
          );
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b
        }
      };
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    });
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      // 지도의 현재 레벨을 얻어옵니다
      const level = map.getLevel();
      // console.log(level);
      setZoomLevel(level);
    });
  };
  useEffect(() => {
    mapFirst();
    console.log("1번째 렌더링");
  }, []);

  const mapSearch = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    // 이전 마크 사라짐
    if (addressMarker !== null) {
      addressMarker.setMap(null);
    }

    if (kakaoInfo !== null) {
      kakaoInfo.close(kakaoMap);
    }

    geocoder.addressSearch(inputText, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setStatePlace({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
        const coords = new kakao.maps.LatLng(newSearch.y, newSearch.x);
        kakaoMap.panTo(coords);

        console.log(statePlace);

        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: coords,
          clickable: true,
        });
        setAddressMarker(marker);

        marker.setMap(kakaoMap);

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${inputText}</div>`,
        });
        setKakaoInfo(infowindow);
        infowindow.open(kakaoMap, marker);

        kakao.maps.event.addListener(marker, "click", function () {
          // 클릭시 마커 윈포윈도우 삭제
          infowindow.close(kakaoMap, marker);
          marker.setMap(null);
        });
      }
    });
  };

  // placeList 가져오기. 문제없음.
  const getPlaceList = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}places?place_address=${inputText}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        setPlaceList(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    mapscript();
    console.log("2번째 렌더링");
  }, [placeList]);

  const mapscript = () => {
    // console.log("mapScript실행");

    if (addressMarker !== null) {
      addressMarker.setMap(null);
    }
    if (kakaoInfo !== null) {
      kakaoInfo.close(kakaoMap);
    }
    if (historyMakrer !== null) {
      historyMakrer.setMap(null);
    }

    const imageSrc = "../img/historyMarker.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    placeList.map((el) => {
      // 마커 생성
      const marker = new kakao.maps.Marker({
        // 마커가 표시 될 지도
        map: kakaoMap,
        // 마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.place_lat, el.place_lng),
        clickable: true,
        image: markerImage,
        level: zoomLevel,
      });

      setHistoryMarker(marker);
      console.log(marker);

      // 마커 클릭 시 함수 실행. (historyList 및 imageList 생성)
      kakao.maps.event.addListener(marker, "click", function () {
        // 게시물 노출 => 무한스크롤.
        axios.get(`${serverUrl}histories/place/${el.id}`).then((res) => {
          if (res.status === 200) {
            setHistoryList(res.data.data);
            setIsHistory(true);
            // 해당 장소의 모든 히스토리의 각각의 이미지 가져오기.
          }
        });
      });
    });
<<<<<<< HEAD

    console.log("imageList", imageList);
    console.log("id", historyList.length);
    console.log(isHistory);
  };
  console.log("history", historyList);
  //사진 가져오기 (수정중)
  // map으로 반복하더라도 결국 imageList에는 하나의 히스토리에 대한 내용이 갱신되는 것이기 때문에,
  // imgList라는 빈배열을 하나 만들어서, 여기에 map으로 반복된 결과물을 담아주는 식으로 바꿨음.
  const getImage = () => {
    // const imgList = [];
    // setImageList();
=======
  };

  //사진 가져오기
  const getImage = () => {
    console.log("stop");
    const arr = [];
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b
    historyList.map((el) => {
      axios
        .get(`${serverUrl}histories/photo?historyid=${el.id}`)
        .then((res) => {
          if (res.status === 200) {
<<<<<<< HEAD
            setImageList((prev) => [...prev, [...res.data.data]]);
            // imgList.push(imageList);

            // console.log("imageList", imageList);
=======
            arr.push(...[res.data.data]);
            if (arr.length === historyList.length) {
              setImageList([]);
              for (let n = 0; n < arr.length; n++) {
                setImageList((prev) => [...prev, ...arr[n]]);
              }
            }
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b
          }
        });
    });
  };
  useEffect(() => {
    getImage();
    console.log("3번째 렌더링");
  }, [historyList]);

<<<<<<< HEAD
  console.log("imageList", imageList);
=======
  const [historyIdArr, setHistoryIdArr] = useState([]);
  console.log(historyIdArr);

  const checklist = () => {
    // imagelist에서 히스토리 아이디만 가져오기
    const searchHistoryId = imageList.map(function (data) {
      return data.history_id;
    });

    //중복제거
    const idUnique = {};
    searchHistoryId.forEach((el) => {
      idUnique[el] = true;
    });
    const searchHistoryIdUnique = Object.keys(idUnique);

    // 중복제거 숫자로 바꾸기
    const numberUnique = searchHistoryIdUnique.map((el) => Number(el));

    setHistoryIdArr(numberUnique);
    console.log("historyId 실행시점");
  };
  useEffect(() => {
    checklist();
  }, [imageList]);
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b

  const Image = styled.img`
    max-width: 50%;
    max-height: 50%;
  `;

  const Slide = (id) => {
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
<<<<<<< HEAD
          {imageList.map((el) =>
            el.map((ele) => {
              return (
                <div>
                  <Image
                    src={ele.image_name}
=======
          {imageList
            .filter((el) => el.history_id === id)
            .map((el, i) => {
              return (
                <div key={i}>
                  <Image
                    src={el.image_name}
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b
                    style={{
                      // objectFit: "contain",
                      display: "block",
                      margin: "auto",
                      justifyContent: "center",
                    }}
                  />
                </div>
              );
<<<<<<< HEAD
            })
          )}
=======
            })}
>>>>>>> 0d0ba3126a28d3c93ce69c4cddfce98643e55e9b
        </Slider>
      </div>
    );
  };

  // 댓글 , 좋아요 부분
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let accessToken = "";
  if (localStorage.accessToken) {
    accessToken = JSON.parse(localStorage.accessToken).accessToken;
  }
  console.log(accessToken);

  // 아이디 값 가져오기
  const userState = useSelector((state) => state.userinfoReducer);

  const { id } = userState;
  const userId = id;

  // 댓글 목록
  const [listComment, setListComment] = useState([]);
  console.log("listComment", listComment);

  // 커맨트 입력 값
  const [commentInput, setCommentInput] = useState("");
  const [isFavorite, setIsFavorite] = useState({});

  const commentOnChange = (e) => {
    setCommentInput(e.target.value);
    console.log(e.target.value);
  };
  const onReset = () => {
    setCommentInput("");
  };

  function registCommentHandler(historyId) {
    axios
      .post(
        `${serverUrl}comments/${historyId}`,
        { comments_content: commentInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        updateCommentHandler(historyId);
      })
      .catch((err) => console.log(err));
  }

  function deleteCommentHandler(commentId, historyId) {
    console.log(historyId)
    axios
      .delete(`${serverUrl}comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res)
        updateCommentHandler(historyId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeCommentHandler(commentId) {}

  const updateCommentHandler = (historyId) => {
    console.log(historyId)
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
        // 댓글이 없는 경우
        if (listComment.length === 0) {
          setListComment(data.data.data.listComment);
          return;
        }
        // 댓글이 있는 경우
        if (listComment.length > 0) {
          const searchHistoryId = listComment.map(function (dataId) {
            return dataId.history_id;
          });
          const idUnique = {};
          searchHistoryId.forEach((el) => {
            idUnique[el] = true;
          });
          const searchHistoryIdUnique = Object.keys(idUnique);
          const commentIdNumber = searchHistoryIdUnique.map((el) => Number(el));
          console.log(commentIdNumber); // [1,7,8,9] // historyId 8
          let count = 0;
          for (let n = 0; n < commentIdNumber.length; n++) {
            let arr = listComment;
            count++;
            console.log(arr);
            console.log(data.data.data.listComment);
            if (commentIdNumber[n] === historyId) {
              // 기존에 댓글이 있는 게시글에 댓글을 추가 하는 경우// 댓글을 삭제하는 경우
              let tempComment = arr.filter(
                (element) => element.history_id !== historyId
              );
              console.log(tempComment);
              setListComment(() => [
                ...tempComment,
                ...data.data.data.listComment,
              ]);
              break;
            } else {
              // 여러 게시글이 있는데 다른 게시글에는 댓글이 있는데, 내가 쓰려는 게시글 댓글 처음 쓰는 경우
              if (count === commentIdNumber.length) {
                setListComment((prev) => [
                  ...prev,
                  ...data.data.data.listComment
                ]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 초기 게시글 커맨트 랜더링
  const listCommentHandler = (historyId) => {
    console.log("listId", historyId);
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
        console.log("data", data);
        setListComment((prev) => [...prev, ...data.data.data.listComment]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setListComment([]);
    historyIdArr.map((id) => {
      console.log("몇번실행됫니?");
      listCommentHandler(id);
    });
  }, [historyIdArr]);

  function favoriteHandler(historyId) {
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

  const getFavorite = (historyId) => {
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
                height: "px",
                marginBottom: "5px",
              }}
              placeholder="Search Place..."
              onChange={onChange}
              value={inputText}
            />
            <button
              type="submit"
              onClick={mapSearch}
              style={{ width: "50px", height: "50px" }}
            >
              검색
            </button>
            <button
              type="submit"
              onClick={getPlaceList}
              style={{ width: "100px", height: "50px" }}
            >
              주변 히스토리
            </button>
          </S.Inputbutton>
        </form>
        <S.Kakaomap>
          <div
            id="map"
            style={{
              width: "52vw",
              height: "60vh",
              zIndex: "0",
            }}
            level={zoomLevel}
          ></div>
        </S.Kakaomap>
      </S.Searchmapflex>
      <div>
        {!isHistory ? (
          <></>
        ) : (
          <>
            {historyList.map((el, i) => {
              return (
                <div key={i}>
                  <S.OuterDiv>
                    <S.HistoryDiv>
                      <S.Image>
                        {historyIdArr.map((ele) => {
                          if (ele === el.id) return Slide(ele);
                        })}
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
                                onClick={() => favoriteHandler(el.id)}
                              >
                                좋아요
                              </Button>
                            ) : (
                              <Button
                                style={{ background: `white`, color: "black" }}
                                onClick={() => favoriteHandler(el.id)}
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
                            value={commentInput}
                            onChange={commentOnChange}
                          ></input>
                          <div>
                            {!accessToken ? (
                              <Button
                                onClick={() => registCommentHandler(el.id)}
                                style={{ display: "none" }}
                              >
                                Comment
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  registCommentHandler(el.id);
                                  onReset();
                                }}
                              >
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
                              if (comment.history_id === el.id)
                                return (
                                  <Comment
                                    key={comment.id}
                                    comment={comment}
                                    historyid ={comment.history_id}
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
                </div>
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

// 문제 사항
// (1) 삭제가 안먹힘 ( 화면에 안나타남 렌더링 문제)
