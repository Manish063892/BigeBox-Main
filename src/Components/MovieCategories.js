import React from "react";
import Card from "./Card";

function MovieCategories({
  data,
  title,
  hello,
  onCardClick,
  setTitle,
  setBackdrop,
  setOverview,
  setDate,
  setAdult,
}) {
  const rowID = Math.floor(Math.random() * 1000);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <div className="mt-4">
      <h1 className="ml-4 font-semibold text-xl text-white">{title}</h1>
      <div className="flex relative items-center group">
        <svg
          onClick={() => {
            slide(-500);
          }}
          className="absolute z-10 left-8 opacity-80 group-hover:block cursor-pointer hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m14 16-4-4 4-4" />
        </svg>
        <div
          id={"slider" + rowID}
          className="w-full h-full px-4 py-4 flex gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth "
        >
          {data.map((items, index) => (
            <Card
              movieDetail={items}
              key={index}
              setOverview={setOverview}
              setDate={setDate}
              setAdult={setAdult}
              hello={hello}
              setTitle={setTitle}
              onCardClick={onCardClick}
              Image={items.poster_path}
              Title={items.title}
              backdropPath={items.backdrop_path}
              setBackdrop={setBackdrop}
              overview={items.overview}
              releaseDate={items.release_date}
              adult={items.adult}
            />
          ))}
        </div>
        <svg
          onClick={() => {
            slide(500);
          }}
          className="absolute opacity-80 z-10 right-8 group-hover:block cursor-pointer hidden "
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m10 8 4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}

export default MovieCategories;
