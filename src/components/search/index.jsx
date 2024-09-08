import "./styles.css";
import React, { useState } from "react";

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { getDataFromSearchComponent } = props;
  const handleInputValue = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  //console.log("props", props);
  const handleSubmit = (e) => {
    e.preventDefault();
    getDataFromSearchComponent(inputValue);
  };
  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        id="search"
        type="text"
        placeholder="Search for recipes"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
