import "./styles.css";
const FavoriteItem = (props) => {
  const { id, image, title , removeFromFavorites} = props;
  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="favorite recipe view" />
      </div>
      <p>{title}</p>
      <button type="button" onClick={removeFromFavorites}> Remove from favorites</button>
    </div>
  );
};
export default FavoriteItem;
