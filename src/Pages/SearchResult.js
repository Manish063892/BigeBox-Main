import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ImageURL } from "../Constants/Constants";

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("searchValue");

  const [recievedValue, setRecievedValue] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzE1MWZkYjA4OWU3ODY3YmI4NmFmYmVhYjdhYmNhMiIsInN1YiI6IjY2MDg0YmQzYTg5NGQ2MDE2MjYzZWE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.atmYo09nYU70vCrBo8S6X533zZCr2EzLmd3nASivvf0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchValue}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const filteredResults = response.results.filter(item => item.poster_path);
        setRecievedValue(filteredResults);
      })
      .catch((err) => console.error(err));
  }, [searchValue]); 

  useEffect(() => {
    if (recievedValue) {
      console.log(recievedValue);
    }
  }, [recievedValue]); 

  return (
    <div className="bg-black text-white font-abc">
      <div className="flex justify-center">
        <h1 className="mt-4 text-s">Search Results</h1>
      </div>
      <div className="w-full mt-8 flex items-center justify-center">
        <div className="flex w-[1024px] flex-wrap gap-4">
          {recievedValue &&
          recievedValue.map((item, index) => (
            <div
              key={index}
              className="relative flex-none overflow-hidden w-48 rounded-md transition-transform duration-300 ease-in-out hover:scale-110 group"
            >
              <img
                src={ImageURL + item.poster_path}
                alt={item.title || item.name}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
