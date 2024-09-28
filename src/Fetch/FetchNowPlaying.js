import React, { useState, useEffect } from "react";
import { apiKEY } from "../Constants/Constants";
import MovieCategories from "../Components/MovieCategories";

function FetchNowPlaying({onCardClick,setTitle,setBackdrop,setOverview,setDate,setAdult }) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKEY}`;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url]);

  return <div>{data && <MovieCategories setOverview={setOverview} setDate={setDate} setAdult={setAdult}  onCardClick={onCardClick} setBackdrop={setBackdrop} setTitle={setTitle}  data={data} title='Now Playing'/>}</div>;
}

export default FetchNowPlaying;
 