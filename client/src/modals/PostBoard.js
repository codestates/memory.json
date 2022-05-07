import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";

function PostBoard() {
  const [myImage, setMyImage] = useState(null);
  const onChange = (e) => {
    setMyImage(e.target.files[0]);
  };
  const onClick = async () => {
    const formData = new FormData();
    formData.append("file", "img");
    // 서버의 upload api 호출
    const res = await axios.post("", formData);
    console.log("res", res);
  };
  return (
    <div className="PostBoard">
      <input type={"img"} onChange={onChange} />
      <Button onClick={onClick}>업로드</Button>
    </div>
  );
}

export default PostBoard;

// const InputLabel = styled.label`
//   width: 300px;
//   height: 300px;
//   margin-top: 10px;
//   padding: 6px 15px;
//   background-color: white;
//   border-radius: 20px;
//   color: black;
//   cursor: pointer;
//   margin-bottom: 30px;
// `;
{
  /* <InputLabel htmlFor="input-file" onChange={PostBoard}>
      <input
        type="file"
        multiple="multiple"
        id="input-file"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.img,.png"
      />
    </InputLabel> */
}

// const [historyInfo, setHistoryInfo] = useState({
//   history_title: "",
//   history_year: "",
//   history_content: "",
// });

// const addressInfoHandler = () => {
//   axios
//     .get(`dapi.kakao.com/v2/local/search/address.${FORMAT}`, {
//       headers: { Authorization: KakaoAK`${REACT_APP_KAKAO_CLIENT_ID}` },
//     })
//     .then((res) => {
//       console.log("res", res);

//     });
// };

// const handleAddImages = (event) => {
//   const selectImageList = event.target.files;
//   const nowImageURLList = [...myImage];

//   for (let i = 0; i < selectImageList.length; i++) {
//     const nowImageURL = URL.createObjectURL(nowImageURLList[i]);
//     nowImageURLList.push(nowImageURL);
//   }

//   if (nowImageURLList.length > 10) {
//     nowImageURLList = nowImageURLList.slice(0, 10);
//   }
//   setMyImage(nowImageURLList);
// };

// const handleDeleteImage = (id) => {
//   setMyImage(myImage.filter((_, index) => index !== id));
// };

// return (
//   <div className="addPic">
//     <label
//       htmlFor="input-file"
//       className="addButton"
//       onChange={handleAddImages}
//     >
//       <input
//         type="file"
//         id="input-file"
//         multiple="multiple"
//         className="addButton"
//       />
//       <span>사진추가</span>
//     </label>
//     {myImage.map((image, id) => (
//       <div className="imageContainer" key={id}>
//         <img src={image} alt={`${image}-${id}`} />
//         <Button onClick={() => handleDeleteImage(id)}></Button>
//       </div>
//     ))}
//   </div>
// );
