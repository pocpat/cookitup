import Search from "../../components/search";
import {
  useEffect,
  useState,
  useReducer,
  useContext,
  useCallback,
} from "react";
import "./styles.css";
import RecipeItem from "../../components/recipe-item/index";
import FavoriteItem from "../../components/favorite-item/index";
import { ThemeContext } from "../../App";

const apiKey = process.env.REACT_APP_API_KEY;
const dummydata = "dummy-----data";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log("action", action);
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

const Homepage = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [filteredState, dispatch] = useReducer(reducer, initialState); // useReducer is a hook that is used for state management in React. It is an alternative to useState. It is mostly preferable when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    setLoadingState(true);
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setIsApiSuccess(true);
      }
    }
    getRecipes();
  };

  const addToFavorites=useCallback((getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];
    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      // save the favorites in localStorage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert("Recipe is already in the favorites");
    }

  }, [favorites]);

    

  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  // filter the favorites
  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item) => (
        <RecipeItem
          key={item.id}
          addToFavorites={() => addToFavorites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
        />
      ));
    }
  }, [recipes, addToFavorites]);

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydataCopy={dummydata}
        isApiSuccess={isApiSuccess}
        setIsApiSuccess={setIsApiSuccess}
      />
      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>
        <div className="search-favorites">
          <input
            onChange={(e) =>
              dispatch({ type: "filterFavorites", value: e.target.value })
            }
            value={filteredState.filteredValue}
            type="text"
            name="searchfavorites"
            placeholder="Search Favorites"
          />
        </div>
        <div className="favorites">
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  key={item.id}
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>
      {loadingState && (
        <div className="loading">Loading recipes! Please wait.</div>
      )}
      <div className="items">
        {renderRecipes()}
      </div>
    </div>
  );
};

export default Homepage;
