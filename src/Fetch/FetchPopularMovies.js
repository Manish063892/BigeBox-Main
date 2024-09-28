import React, { useState, useEffect } from "react";
import { apiKEY } from "../Constants/Constants";
import MovieCategories from "../Components/MovieCategories";

function FetchPopularMovies({
  onCardClick,
  setTitle,
  setBackdrop,
  setDate,
  setAdult,
  setOverview,
}) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url]);

  return (
    <div>
      {data && (
        <MovieCategories
          setOverview={setOverview}
          setDate={setDate}
          setAdult={setAdult}
          onCardClick={onCardClick}
          setBackdrop={setBackdrop}
          setTitle={setTitle}
          data={data}
          title="Popular Movies"
        />
      )}
    </div>
  );
}

export default FetchPopularMovies;
