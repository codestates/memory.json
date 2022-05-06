import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";

function PostBoard() {
  const [myImage, setMyImage] = useState([]);
  const handleAddImages = (event) => {
    const selectImageList = event.target.files;
    const nowImageURLList = [...myImage];

    for (let i = 0; i < selectImageList.length; i++) {
      const nowImageURL = URL.createObjectURL(nowImageURLList[i]);
      nowImageURLList.push(nowImageURL);
    }

    if (nowImageURLList.length > 10) {
      nowImageURLList = nowImageURLList.slice(0, 10);
    }
    setMyImage(nowImageURLList);
  };

  const handleDeleteImage = (id) => {
    setMyImage(myImage.filter((_, index) => index !== id));
  };

  return (
    <div className="addPic">
      <label
        htmlFor="input-file"
        className="addButton"
        onChange={handleAddImages}
      >
        <input
          type="file"
          id="input-file"
          multiple="multiple"
          className="addButton"
        />
        <span>사진추가</span>
      </label>
      {myImage.map((image, id) => (
        <div className="imageContainer" key={id}>
          <img src={image} alt={`${image}-${id}`} />
          <Button onClick={() => handleDeleteImage(id)}></Button>
        </div>
      ))}
    </div>
  );
}

export default PostBoard;

const InputLabel = styled.label`
  width: 300px;
  height: 300px;
  margin-top: 10px;
  padding: 6px 15px;
  background-color: white;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  margin-bottom: 30px;
`;
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
