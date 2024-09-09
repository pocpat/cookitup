import "./styles.css";
import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../App";

const Search = (props) => {
  const {theme} = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");
  const { getDataFromSearchComponent, isApiSuccess,setIsApiSuccess } = props;
  const handleInputValue = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  //console.log("props", props);
  const handleSubmit = (e) => {
    e.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (isApiSuccess) {
      setInputValue("");
      setIsApiSuccess(false);
    }
  }, [isApiSuccess]);
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
      <button style = {theme?{backgroundColor: '#12343b'}:{}} type="submit">Search</button>
    </form>
  );
};

export default Search;
