import { createContext, useEffect, useState } from "react";

export const rc = createContext(null);

const RecipeContext = (props) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("mode")) || "",
  );

  const [allData, setAllData] = useState([]); // original (never change)
  const [data, setData] = useState([]); // UI data

  const [filters, setFilters] = useState({
    search: "",
    category: null,
    difficulty: null,
    servings: null,
    time: null,
    selectedRecipe: null,
  });

  const applyFilters = () => {
    let result = [...allData];

    if (filters.selectedRecipe) {
      setData([filters.selectedRecipe]);
      return;
    }

    if (filters.search) {
      result = result.filter((r) =>
        r.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category) {
      result = result.filter((r) => r.mealType?.includes(filters.category));
    }

    if (filters.difficulty) {
      result = result.filter((r) => r.difficulty === filters.difficulty);
    }

    if (filters.servings) {
      result = result.filter((r) => r.servings >= filters.servings);
    }

    if (filters.time) {
      result = result.filter((r) => r.cookTimeMinutes <= filters.time);
    }

    setData(result);
  };


  useEffect(() => {
    applyFilters();
  }, [filters, allData]);




  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("fav")) || [],
  );

  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState([]);



  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("recipes")) || allData);
  }, []);

  return (
    <rc.Provider
      value={{ data, setData, allData, setAllData, filters, setFilters, favorite, setFavorite, darkMode, setDarkMode, suggestions, setSuggestions, searchTerm, setSearchTerm, selectedRecipe, setSelectedRecipe }}
    >
      {props.children}
    </rc.Provider>
  );
};

export default RecipeContext;
