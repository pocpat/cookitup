import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import ThemeButton from "./components/theme-button";

// create the context =>  export const ThemeContext
// provide the context => <ThemeContext.Provider >
// consume the context =>  <ThemeContext.Provider  value ={{  theme, setTheme}}>

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState(false);

  return (
    <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        <ThemeButton />
        <Homepage />
      </ThemeContext.Provider>
    </div>
  );
};
export default App;
