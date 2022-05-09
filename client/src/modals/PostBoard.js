import axios from "axios";
import React, { useState } from "react";
import Button from "../components/Button";

function PostBoard() {
  // 서버로 파일을 전송하기 위해 추가해주는 파일의 상태
  const [myImage, setMyImage] = useState(null);
  // 클라이언트에서 미리보기를 위해 추가한 상태 파일 base64
  const [imgBase64, setImgBase64] = useState("");
  // history 정보
  const [historyInfo, setHistoryInfo] = useState({
    history_title: "",
    history_content: "",
    history_year: "",
    place_id: "",
    user_id: "",
  });
  console.log("historyInfo", historyInfo);

  const onChange = (e) => {
    // 미리 보기를 위한 FileReader 객체 생성
    const reader = new FileReader();
    const files = e.target.files;
    reader.onloadend = () => {
      const base64 = reader.result;
      console.log("base64", base64);
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]); // 파일을 읽어서 버퍼에 저장
      console.log("files", files);
      setMyImage(files[0]);
    }
  };
  const onClick = async () => {
    // 서버로 파일 전송을 위한 FormData 객체 생성
    const formData = new FormData();
    console.log("formData", formData);
    formData.append("file", myImage, myImage.name);
    // 서버의 upload api 호출
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "http://localhost:4000/histories/uploadphoto",
      formData,
      config
    );
    console.log("res", res);
  };
  return (
    <div className="PostBoard">
      <div
        style={{
          background: "white",
          width: "90%",
          height: "auto",
        }}
      >
        <img src={imgBase64} alt="img" />
      </div>
      <input
        type="file"
        multiple
        onChange={onChange}
        style={{ background: "white" }}
      />
      <Button onClick={onClick}>작성</Button>
    </div>
  );
}

export default PostBoard;
