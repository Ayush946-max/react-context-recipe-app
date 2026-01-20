import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = (props) => {
  const {
    isClosing,
    setIsClosing,
    image,
    name,
    time,
    steps,
    selected,
    isOpen,
    setShowForm,
    data,
    id,
    setData,
    setIsOpen,
    setSteps,
    ingredients,
    mealType,
    allData,
    setSelected,
    setImage,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      image: image,
      name: name,
      time: time,
      ingredients: ingredients,
    },
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setIsClosing(false);
    }, 300);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const updateHandle = async (updatedRecipe) => {
    updatedRecipe.category = selected;
    updatedRecipe.description = steps;
    updatedRecipe.image = image;

    const index = allData.findIndex((r) => r.id === id);
    const newData = [...allData];
    newData[index] = { ...newData[index], ...updatedRecipe };
    setData(newData);
    localStorage.setItem("recipes", JSON.stringify(newData));

    toast.success("Recipe Updated!");
    handleClose();
  };

  const addStep = () => {
    setSteps([
      ...steps,
      { id: steps.length + 1, stepImageUrl: "", stepTitle: "", stepText: "" },
    ]);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div className="relative bg-white/90 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-red-600 text-2xl font-bold"
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          Update Recipe 🍳
        </h1>
        <form
          name="UpdateForm"
          onSubmit={handleSubmit(updateHandle)}
          className="flex flex-col gap-4"
        >
          {/* Image URL */}
          <input
            {...register("image", {
              required: "URL is required",
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Enter valid URL",
              },
            })}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl w-full"
            placeholder="Recipe Image URL"
          />
          {errors.imageUrl && (
            <small className="text-red-600">{errors.imageUrl.message}</small>
          )}

          {/* Title */}
          <input
            {...register("name", { required: true, minLength: 3 })}
            className="p-3 border border-gray-300 rounded-xl w-full"
            placeholder="Recipe Title"
          />
          {errors.name && <small className="text-red-600">Min length 3</small>}
          {/* Steps */}
          <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-2xl">
            <h2 className="font-bold text-amber-700">Steps 🧾</h2>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-3 border border-gray-200 rounded-xl"
              >
                <textarea
                  value={step.stepText}
                  onChange={(e) =>
                    handleStepChange(idx, "stepText", e.target.value)
                  }
                  placeholder="Step Description..."
                  className="p-2 border border-gray-300 rounded-xl min-h-24"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="self-center mt-2 px-4 py-2 rounded-full bg-amber-700 text-white hover:bg-amber-800 transition"
            >
              + Add Step
            </button>
          </div>

          {/* Category */}
          <div className="relative mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-3 border border-gray-300 rounded-xl flex justify-between"
            >
              {selected} <span>{isOpen ? "∧" : "∨"}</span>
            </button>
            {isOpen && (
              <ul className="absolute z-10 w-full bg-white border rounded-xl shadow-md mt-1">
                {mealType.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-amber-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Time */}
          <div className="mt-4 flex flex-wrap gap-4">
            {["5 min", "15 min", "25 min", "45 min", "1 hour+"].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  {...register("time")}
                  type="radio"
                  value={t}
                  className="accent-amber-700"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 mt-4 rounded-2xl text-white bg-green-600 hover:bg-green-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
