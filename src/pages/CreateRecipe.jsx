import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { rc } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { setData, allData } = useContext(rc);
  const [image, setImage] = useState("");
  const [steps, setSteps] = useState([
    { id: 1, stepImageUrl: "", stepTitle: "", stepText: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Category");
  const options = [
    "Breakfast",
    "Lunch",
    "Meal",
    "Dinner",
    "Snacks",
    "Desserts",
    "Drinks",
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const addStep = () => {
    setSteps([
      ...steps,
      { id: steps.length + 1, stepImageUrl: "", stepTitle: "", stepText: "" },
    ]);
  };
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };
  const onSubmit = async (recipe) => {
    await new Promise((res) => setTimeout(res, 500));
    recipe.id = nanoid();
    recipe.category = selected;
    recipe.description = steps; // ✅ now contains array of step objects
    recipe.imageUrl = image;
    const copyData = [...allData];
    copyData.push(recipe);
    setData(copyData);
    localStorage.setItem("recipes", JSON.stringify(copyData));
    toast.success("Recipe Created!");
    reset();
    setImage("");
    setSteps([{ id: 1, stepImageUrl: "", stepTitle: "", stepText: "" }]);
    navigate("/recipe");
  };
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center overflow-hidden animate-fadeIn">
      {" "}
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 backdrop-blur-xs bg-amber-400/20" />
      <div className="relative mx-auto backdrop-blur-3xl border border-black/10 rounded-2xl mb-30 mt-10 p-10">
        <h1 className="text-4xl font-bold text-center my-5 text-amber-700">
          {" "}
          Create a New Recipe 🍳{" "}
        </h1>
        <form
          name="RecipeForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-2xl gap-6 max-w-4xl bg-linear-to-br from-amber-50/80 to-yellow-50/80 rounded-xl shadow-md p-10 hover:shadow-lg transition-shadow duration-300"
        >
          {" "}
          {/* Image URL */}
          <input
            {...register("imageUrl", {
              required: "URL is required",
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Please enter a valid https:// URL",
              },
            })}
            className="w-full text-gray-700 p-3 border border-amber-700/50 rounded-2xl focus:ring-2 focus:ring-amber-500/40"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Recipe Image URL"
          />{" "}
          {errors.imageUrl && (
            <small className="text-red-700/70">{errors.imageUrl.message}</small>
          )}{" "}
          {/* Title */}
          <input
            {...register("title", {
              required: true,
              minLength: { value: 3, message: "Min length 3" },
            })}
            className="text-gray-700 p-3 border border-amber-700/50 rounded-2xl"
            type="text"
            placeholder="Recipe Title"
          />{" "}
          {errors.title && (
            <small className="text-red-700/70">{errors.title.message}</small>
          )}{" "}
          {/* Dynamic Steps Section */}
          <div className="flex flex-col gap-6 border border-amber-700/30 p-4 rounded-2xl bg-amber-50/40">
            {" "}
            <h2 className="font-bold text-amber-700 text-lg">
              Recipe Steps 🧾
            </h2>{" "}
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-4 border border-amber-500/20 rounded-xl bg-white/40"
              >
                <input
                  type="url"
                  value={step.stepImageUrl}
                  onChange={(e) =>
                    handleStepChange(index, "stepImageUrl", e.target.value)
                  }
                  className="p-2 border rounded-xl"
                  placeholder="Step Image URL"
                />
                <input
                  type="text"
                  value={step.stepTitle}
                  onChange={(e) =>
                    handleStepChange(index, "stepTitle", e.target.value)
                  }
                  className="p-2 border rounded-xl"
                  placeholder="Step Title"
                />
                <textarea
                  value={step.stepText}
                  onChange={(e) =>
                    handleStepChange(index, "stepText", e.target.value)
                  }
                  className="p-2 border rounded-xl min-h-30"
                  placeholder="Step Description..."
                />{" "}
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="self-center mt-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full transition-all"
            >
              {" "}
              + Add Step{" "}
            </button>{" "}
          </div>{" "}
          {/* Category */}{" "}
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-3 border border-amber-700/50 rounded-2xl text-gray-700 flex justify-between"
            >
              {" "}
              {selected} <span>{isOpen ? "∧" : "∨"}</span>
            </button>{" "}
            {isOpen && (
              <ul className="absolute z-10 w-full bg-amber-50/90 border rounded-3xl shadow-md overflow-hidden animate-slideDown">
                {" "}
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-amber-700/20 cursor-pointer"
                  >
                    {" "}
                    {option}{" "}
                  </li>
                ))}{" "}
              </ul>
            )}
          </div>{" "}
          {/* Time */}{" "}
          <div className="flex flex-col items-start gap-3 px-3 py-4 border border-amber-700/50 rounded-2xl">
            {" "}
            <span className="text-amber-700 font-semibold">Time Taken</span>
            <div className="flex flex-wrap gap-6">
              {" "}
              {["5 min", "15 min", "25 min", "45 min", "1 hour+"].map(
                (time, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      {...register("time")}
                      type="radio"
                      value={time}
                      className="accent-amber-700"
                    />{" "}
                    <span>{time}</span>{" "}
                  </label>
                )
              )}{" "}
            </div>{" "}
          </div>{" "}
          {/* Submit */}
          <input
            className={`px-6 py-2 bg-amber-700 text-white font-semibold rounded-2xl hover:bg-amber-800 transition-all ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Creating..." : "Create"}
          />
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default CreateRecipe;
