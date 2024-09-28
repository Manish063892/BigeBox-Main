import React, { useState } from "react";
import FetchMovieBanner from "../Fetch/FetchMovieBanner";
import FetchNowPlaying from "../Fetch/FetchNowPlaying";
import FetchTrendingMovies from "../Fetch/FetchTrendingMovies";
import FetchTopRatedMovies from "../Fetch/FetchTopRatedMovies";
import FetchPopularMovies from "../Fetch/FetchPopularMovies";
import FetchUpcomingMovies from "../Fetch/FetchUpcomingMovies";

function HomepageElements() {
  var [hello, setHello] = useState(false);
  var [title, setTitle] = useState(null);
  var [backdrop, setBackdrop] = useState(null);
  var [overview, setOverview] = useState(null);
  var [date, setDate] = useState(null);
  var [adult, setAdult] = useState(null);

  const onCardClick = (movieDetail) => {
    setHello(true);
    console.log(movieDetail);
  };

  const onCardClick2 = () => {
    setHello(false);
  };

  return (
    <div>
      <FetchMovieBanner />
      <FetchNowPlaying
        hello={hello}
        onCardClick2={onCardClick2}
        onCardClick={onCardClick}
        setTitle={setTitle}
        setBackdrop={setBackdrop}
        setOverview={setOverview}
        setDate={setDate}
        setAdult={setAdult}
      />
      <FetchTrendingMovies
        hello={hello}
        onCardClick2={onCardClick2}
        onCardClick={onCardClick}
        setTitle={setTitle}
        setBackdrop={setBackdrop}
        setOverview={setOverview}
        setDate={setDate}
        setAdult={setAdult}
      />
      <FetchTopRatedMovies
        hello={hello}
        onCardClick2={onCardClick2}
        onCardClick={onCardClick}
        setTitle={setTitle}
        setBackdrop={setBackdrop}
        setOverview={setOverview}
        setDate={setDate}
        setAdult={setAdult}
      />
      <FetchPopularMovies
        hello={hello}
        onCardClick2={onCardClick2}
        onCardClick={onCardClick}
        setTitle={setTitle}
        setBackdrop={setBackdrop}
        setOverview={setOverview}
        setDate={setDate}
        setAdult={setAdult}
      />
      <FetchUpcomingMovies
        hello={hello}
        onCardClick2={onCardClick2}
        onCardClick={onCardClick}
        setTitle={setTitle}
        setBackdrop={setBackdrop}
        setOverview={setOverview}
        setDate={setDate}
        setAdult={setAdult}
      />
    </div>
  );
}

export default HomepageElements;
