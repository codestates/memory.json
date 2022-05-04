import React, { useState } from "react";
import MapArea from "./Map";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          style={{ width: "1450px", height: "50px" }}
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit" style={{ width: "48px", height: "50px" }}>
          검색
        </button>
      </form>
      <MapArea searchPlace={place} />
    </>
  );
};
export default SearchPlace;
