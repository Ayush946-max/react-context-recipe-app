import { useContext, useEffect } from "react";
import { rc } from "../context/RecipeContext";
import HeroSlider from "../components/HeroSlider";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryCards from "../components/CategoryCards";

const Recipe = () => {
  const { data, setData, setAllData, selectedRecipe, searchTerm } = useContext(rc);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("https://dummyjson.com/recipes");
      if (!res.ok) throw new Error("API Error");

      const response = await res.json();
      setData(response?.recipes || []);
      setAllData(response?.recipes || []);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  

  const recipesToShow = selectedRecipe.length > 0 ? selectedRecipe : data;


  return (
    <div className="animate-fadeIn">
      {/* -------- HERO SLIDER -------- */}
      <HeroSlider />

      {/* -------- SEARCH BAR --------- */}
      <SearchBar />

      {/* ------- CATEGORY CARDS ------- */}
      <CategoryCards />

      {/* ------ MAIN RECIPE LIST ------ */}
      <RecipeCard recipesToShow={recipesToShow} />
    </div>
  );
};

export default Recipe;
