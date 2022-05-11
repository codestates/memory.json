import React, { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.565805, 126.975161);
      level: 3,
    };
  }

  // map
  const map = new kakao.maps.Map(container, options);
  
  markerdata.forEach((el) => {
    // 마커 생성
    new kakao.maps.Marker({
      // 마커가 표시 될 지도
      map: map,
      // 마커가 표시 될 위치
      position: new kakao.maps.LatLng({위도, 경도}),
      // 마커에 hover시 나타날 title
      title: el.title,

      // 클릭 이벤트 추가 해야 함.
    })
  })
}

