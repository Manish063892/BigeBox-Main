import React, { useState, useEffect } from "react";
import { apiKEY } from "../Constants/Constants";
import HomeBanner from "../Components/HomeBanner";

function FetchMovieBanner() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results[Math.floor(Math.random() * 20)]);
      });
  }, [url]);

  return (
    <div>
      <HomeBanner data={data} />
    </div>
  );
}

export default FetchMovieBanner;
