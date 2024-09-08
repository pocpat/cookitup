import "./styles.css";
const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe view" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={addToFavorites}> Add to favorites</button>
    </div>
  );
};
export default RecipeItem;
