import { useContext, useEffect, useState } from "react";
import { rc } from "../context/RecipeContext";

const SearchBar = () => {
  const {
    suggestions,
    setSuggestions,
    setSelectedRecipe,
    searchTerm,
    setSearchTerm,
  } = useContext(rc);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [servingCounter, setServingCounter] = useState(0);
  const [timeCounter, setTimeCounter] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const diffState = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    if (!searchTerm?.trim()) {
      setSuggestions([]);
      setSelectedRecipe([]); // 🔥 RESET SELECTED
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchTerm}`,
        { signal: controller.signal },
      );
      const data = await res.json();
      setSuggestions(data?.recipes || []);
      setShowDropdown(true);
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const sugHandler = (suggestion) => {
    setSearchTerm(searchTerm);
    setSelectedRecipe([suggestion]);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const filterHandler = () => {
    setFilterDropDown(!filterDropDown);
    setSelectedRecipe([]);
  };

  return (
    <>
      <div className="relative max-w-xl mx-15">
        <div className="bg-orange-400/60 my-5 rounded-full pl-5 flex w-150">
          <div className="text-lg pr-3 py-2 text-gray-700">
            <i className="ri-search-line"></i>
          </div>

          <input
            className="outline-none w-full text-lg ml-4 placeholder:text-stone-800/60 placeholder:italic"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            placeholder="Search recipes, ingredients, or cuisins..."
          />

          <button className="pr-5 text-gray-700">
            <i onClick={filterHandler} className="ri-equalizer-line"></i>
          </button>
        </div>

        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => sugHandler(s)}
                className="flex items-center gap-3 p-2 hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {filterDropDown && (
        <div className="absolute z-99 left-0 bottom-0 bg-[#940D0D] shadow-lg mt-1 w-78 h-170 overflow-y-auto p-2">
          <ul className="w-full mt-5 text-white space-y-10">
            <div className="border p-2 rounded-lg border-orange-500/50">
              <li className="text-lg font-medium mb-3">Serving Size</li>

              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={servingCounter}
                onChange={(e) => setServingCounter(Number(e.target.value))}
                className="w-full accent-orange-400"
              />

              <div className="flex justify-between text-sm mt-2">
                <span>1</span>
                <span className="font-semibold">{servingCounter}</span>
                <span>40</span>
              </div>
            </div>

            <div className="border p-2 rounded-lg border-orange-500/50">
              <li className="text-lg font-medium mb-5">Difficulty</li>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {diffState.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                      selectedDifficulty === diff
                        ? "bg-orange-600/80 text-white"
                        : "bg-white/80 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="border p-2 rounded-lg border-orange-500/50">
              <li className="text-lg font-medium mb-3">Time (min)</li>

              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={timeCounter}
                onChange={(e) => setTimeCounter(Number(e.target.value))}
                className="w-full accent-orange-500"
              />

              <div className="flex justify-between text-sm mt-2">
                <span>0</span>
                <span className="font-semibold">{timeCounter} min</span>
                <span>60</span>
              </div>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;
