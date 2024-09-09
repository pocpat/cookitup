import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./styles.css";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("theme", theme, "setTheme", setTheme);

  return (
    <button
      style={theme ? { backgroundColor: " #12343b" } : {}}
      onClick={() => setTheme(!theme)}
      className="themeButton"
    >
      Switch Theme
    </button>
  );
};

export default ThemeButton;
