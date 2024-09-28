import React, { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImageURL } from "../Constants/Constants";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../Database/Firebase";
import { UserAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function HomeBanner({ data }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      if (user?.email && data) {
        const userDoc = await getDoc(doc(db, "users", user.email));
        const favShows = userDoc.data().favShows || [];
        const isWatchlisted = favShows.some(
          (show) => show.title === data.title
        );
        setIsInWatchlist(isWatchlisted);
      }
    };

    fetchWatchlistStatus();
  }, [user, data]);

  const toggleWatchlist = async () => {
    if (!user?.email) {
      alert("Login to save a movie");
      return;
    }

    const userDoc = doc(db, "users", user.email);

    if (isInWatchlist) {
      await updateDoc(userDoc, {
        favShows: arrayRemove({ ...data }),
      });
    } else {
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...data }),
      });
    }

    setIsInWatchlist(!isInWatchlist);
  };

  const handlePlayClick = () => {
    if (!user?.email) {
      alert("Login to play a movie");
      return;
    }
    navigate(`/movieplayer?ID=${data.id}`);
  };

  return (
    data && (
      <div className="relative h-[550px] text-white overflow-hidden">
        <img
          className="w-full"
          src={ImageURL + data.backdrop_path}
          alt={data.title}
        />
        <div className="absolute left-6 top-[150px] h-[300px] w-[600px]">
          <h1 className="font-extrabold text-4xl mb-4 uppercase">
            {data.title}
          </h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handlePlayClick}
              className="gap-2 flex items-center justify-center w-[140px] rounded-md bg-black px-3 py-2 text-l font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <CiPlay1 />
              Play
            </button>
            <button
              type="button"
              onClick={toggleWatchlist}
              className={`flex items-center justify-center gap-2 min-w-[190px] rounded-md px-3 py-2 text-l font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors duration-300 ${
                isInWatchlist
                  ? "bg-green-500 text-white"
                  : "bg-white text-black hover:opacity-80"
              }`}
            >
              {isInWatchlist ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <IoIosAddCircleOutline />
              )}
              {isInWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
            </button>
          </div>
          <div className="mt-4">
            <p className="font-semibold">{data.overview}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default HomeBanner;

