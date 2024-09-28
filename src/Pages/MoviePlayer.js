import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviePlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoID = searchParams.get("ID");
  videoID && console.log(videoID);

  const [fetchedData, setFetchedData] = useState(null);
  const [movieKEY, setMovieKEY] = useState(null);
  movieKEY && console.log(movieKEY);

  useEffect(() => {
    if (videoID) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzE1MWZkYjA4OWU3ODY3YmI4NmFmYmVhYjdhYmNhMiIsInN1YiI6IjY2MDg0YmQzYTg5NGQ2MDE2MjYzZWE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.atmYo09nYU70vCrBo8S6X533zZCr2EzLmd3nASivvf0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${videoID}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const officialTrailer = response.results.find(
            (video) => video.name === "Official Trailer"
          );
          setFetchedData(officialTrailer);
          if (officialTrailer) {
            setMovieKEY(officialTrailer.key);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [videoID]);

  return (
    <div className="text-white font-abc flex items-center justify-center">
      {movieKEY ? (
        <div className="mt-10">
          <iframe
            src={`https://www.youtube.com/embed/${movieKEY}?autoplay=1`}
            width="1100"
            height="500"
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
            Your browser does not support iframes.
          </iframe>
        </div>
      ) : (
        <p>No Official Trailer found.</p>
      )}
    </div>
  );
}

export default MoviePlayer;
