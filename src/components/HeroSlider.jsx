import { useState } from "react";

const HeroSlider = () => {
  const [slide] = useState([
    {
      id: 1,
      para: "Savor the taste of quality order now and enjoy dining experience",
      title: "Szechwan Vegetable Hakka Noodles",
      image: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
    },
    {
      id: 2,
      para: "Taste the flavour of spice",
      title: "Canadian Butter Tarts",
      image:
        "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
    },
    {
      id: 3,
      para: "Traditional Italian taste",
      title: "Classic Spaghetti Carbonara",
      image:
        "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    },
    {
      id: 4,
      para: "Experience the authentic flavors of India",
      title: "Classic Margherita Pizza",
      image:
        "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 5,
      para: "Indulge in the rich and creamy taste of Italy",
      title: "Creamy Mushroom Risotto",
      image:
        "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
    },
  ]);

  const nextImageHandler = () => {};

  return (
    <div>
      <div className="relative flex justify-center bg-amber-100 pt-2 transition-colors duration-500 hover:bg-amber-200/70">
        <button
          onClick={nextImageHandler}
          className="absolute left-6 top-30 rounded-4xl px-1 z-50 font-bold text-3xl text-stone-600 bg-white/50"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button className="absolute right-10 top-30 rounded-4xl px-1 z-50 font-bold text-3xl text-stone-600 bg-white/50">
          <i className="ri-arrow-right-s-line"></i>
        </button>
        <div className="w-[92%] max-w-6xl overflow-x-auto flex snap-x snap-mandatory space-x-6 py-3 no-scrollbar scroll-smooth">
          {slide.map((item, index) => (
            <div
              key={index}
              className="shrink-0 w-[68em] rounded-3xl py-6 flex flex-col sm:flex-row 
                        items-center justify-around snap-center bg-white/40 backdrop-blur-md 
                        border border-amber-600/20 shadow-md hover:shadow-xl transition-all"
            >
              <div className="sm:w-1/2 px-6">
                <p className="text-xs text-gray-600 tracking-widest uppercase">
                  {item.para}
                </p>
                <h2 className="lg:text-4xl sm:text-3xl text-xl font-semibold tracking-wide my-3 uppercase">
                  {item.title}
                </h2>

                <button className="bg-orange-400/70 hover:bg-orange-500 text-gray-800 font-semibold px-5 py-1 rounded-xl transition">
                  Save Recipe
                </button>
              </div>

              <img
                src={item.image}
                className="w-40 sm:w-48 h-40 sm:h-48 rounded-full object-cover shadow-lg hover:scale-110 transition-transform"
                alt="Food"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
