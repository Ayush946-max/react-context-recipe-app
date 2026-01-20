import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { rc } from "../context/RecipeContext";

const RecipeCard = ({ recipesToShow }) => {
  const navigate = useNavigate();
  const { favorite, setFavorite } = useContext(rc);

  const mealIcons = {
    Breakfast: "🥞",
    Lunch: "🍜",
    Meal: "🍝",
    Dinner: "🍛",
    Desserts: "🍩",
    Beverage: "🍸",
  };

  const favHandeler = (recipe) => {
    if (!recipe || !recipe.id) return;

    const cleaned = favorite.filter((f) => f && f.id);
    const exist = cleaned.find((f) => f.id === recipe.id);
    if (exist) return;

    const updated = [...cleaned, recipe];
    setFavorite(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
    toast.success("Added to Favorites ☺️");
    navigate("/fav");
  };

  const unfavHandeler = (rId) => {
    const filterFav = favorite.filter((f) => f.id !== rId);
    setFavorite(filterFav);
    localStorage.setItem("fav", JSON.stringify(filterFav));
    toast.error("Remove from Favorites 🙂");
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {recipesToShow.length === 0 ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : (
        recipesToShow.map((recipe) => (
          <div
            key={recipe.id}
            className="w-65 min-h-90 bg-amber-100 border border-amber-700/40 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <NavLink
              to={`/recipe/details/${recipe.id}`}
              state={{ from: "recipe" }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt="Recipe"
                  className="w-30 h-30 object-cover rounded-full mx-auto shadow-xl mt-5 hover:shadow-2xl transition-transform duration-1000"
                />
              )}

              <div className="py-4">
                <h3 className="text-lg font-bold text-black mb-5 text-center">
                  {recipe.name}
                </h3>

                <div className="flex justify-around items-center text-sm text-gray-500 my-2">
                  <p className="text-sm text-gray-600">
                    {recipe?.mealType?.map((meal) => (
                      <span key={meal} className="mr-1">
                        {`${mealIcons[meal] || "🍟"} ${meal}`}
                      </span>
                    ))}
                  </p>

                  <p className="text-sm">{recipe.rating} ⭐</p>
                </div>
              </div>
            </NavLink>

            <button
              onClick={() =>
                favorite.some((f) => f.id === recipe.id)
                  ? unfavHandeler(recipe.id)
                  : favHandeler(recipe)
              }
              className="block mx-auto py-1 px-4 bg-orange-400/70 hover:bg-amber-600 font-semibold rounded-full transition-all"
            >
              {favorite.some((f) => f.id === recipe.id)
                ? "Remove Fav"
                : "Add Fav"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeCard;
