import { useContext, useEffect, useState } from "react";
import { rc } from "../context/RecipeContext";
import HeroSlider from "../components/HeroSlider";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryCards from "../components/CategoryCards";

const Recipe = () => {
  const { data, setData, setAllData, selectedRecipe, allData } = useContext(rc);
  const [isLoading, setIsLoading] = useState(true);

  const saveWithTTL = (key, data, ttlMs) => {
    const now = Date.now();

    const item = {
      data,
      expiry: now + ttlMs,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithTTL = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

    if (Date.now() > item.expiry) {
      localStorage.removeItem(key); // expired
      return null;
    }

    return item.data;
  };
  
  const fetchRecipes = async () => {
    try {
      const res = await fetch("https://dummyjson.com/recipes");
      const response = await res.json();

      const recipes = response?.recipes || [];      

      setData(recipes);
      setAllData(recipes);

      // cache for 24 hours
      saveWithTTL("recipes", recipes, 24 * 60 * 60 * 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cachedRecipes = getWithTTL("recipes");

    if (cachedRecipes?.length) {
      setData(cachedRecipes);
      setAllData(cachedRecipes);
      setIsLoading(false);
      return;
    }

    fetchRecipes(); // fallback to API
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
      <RecipeCard recipesToShow={recipesToShow} isLoading={isLoading} />
    </div>
  );
};

export default Recipe;
