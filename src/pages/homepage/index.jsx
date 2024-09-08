import Search from "../../components/search";
import { useEffect, useState } from "react";
import "./styles.css";
import RecipeItem from "../../components/recipe-item/index";
import FavoriteItem from "../../components/favorite-item/index";
import dotenv from 'dotenv';
const apiKey = process.env.API_KEY;
dotenv.config();
const dummydata = "dummy-----data";

const Homepage = () => {
  // 2   Loading state
  const [loadingState, setLoadingState] = useState(false);
  // 3  Save results that we receive from api
  const [recipes, setRecipes] = useState([]);

  // 10 favorites data state
  const [favorites, setFavorites] = useState([]);

  const getDataFromSearchComponent = (getData) => {
    //console.log("getData", getData);
    // 4   Keep the loading state TRUE before we are calling the api
    setLoadingState(true);
    // 1  callin api with getData
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey={apiKey}=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        // 5  sat loading state to false after we receive the data
        // 6  save the results in the state
        setLoadingState(false);
        setRecipes(results); // the "results " we 've got from API
      }
    }
    getRecipes();
  };

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];
    // 11  check if the recipe is already in the favorites
    const isRecipeIndexInFavorites = copyFavorites.findIndex(
      item => item.id === getCurrentRecipeItem.id
      
    );
    // 12  if the recipe is not in the favorites, add it
    if (isRecipeIndexInFavorites === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      // save the favorites in local storage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      // 13  if the recipe is in the favorites, remove it
      alert("Recipe is already in the favorites");
    }
     
    
  };
const removeFromFavorites = (getCurrentId) => {
let copyFavorites = [...favorites];
copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);
setFavorites(copyFavorites);
localStorage.setItem("favorites", JSON.stringify(copyFavorites));
};
  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);
  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydataCopy={dummydata}
      />
   {/* show Favorite Items */}
   <div className="favorites-wrapper">
   <h1 className="favorites-title">Favorites</h1>
   <div className="favorites">
   {favorites && favorites.length > 0 ?
favorites.map((item) => (
<FavoriteItem
key={item.id}
removeFromFavorites={()=>removeFromFavorites(item.id)}
id={item.id}
image={item.image}
title={item.title}
/>
))


    : null
   }
   </div>
   </div>
      {/* show Favorite Items */}


      {/* show loading state */}
      {loadingState && (
        <div className="loading">Loading recipes! Please wait.</div>
      )}
      {/* show loading state */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
              key={item.id}
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>

    </div>
  );
};
export default Homepage;
