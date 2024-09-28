import React, { useEffect, useState } from "react";
import { ImageURL } from "../Constants/Constants";
import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Database/Firebase";
import { UserAuth } from "../Context/AuthContext";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Card({
  movieDetail,
  Image,
  Title,
  onCardClick,
  setTitle,
  setBackdrop,
  backdropPath,
  overview,
  releaseDate,
  adult,
  setOverview,
  setDate,
  setAdult,
}) {
  const [heart, setHeart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (user?.email && movieDetail) {
        const userDoc = await getDoc(doc(db, "users", user.email));
        const favShows = userDoc.data().favShows || [];
        const isFavorite = favShows.some(
          (show) => show.title === movieDetail.title
        );
        setHeart(isFavorite);
      }
    };

    fetchFavoriteStatus();
  }, [user, movieDetail]);

  const toggleFavorite = async () => {
    if (!user?.email) {
      alert("Login to save a movie");
      return;
    }

    const userDoc = doc(db, "users", user.email);

    if (heart) {
      await updateDoc(userDoc, {
        favShows: arrayRemove({ ...movieDetail }),
      });
    } else {
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movieDetail }),
      });
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    setHeart(!heart);
  };

  const handleCardClick = () => {
    onCardClick(movieDetail);
    setTitle(Title);
    setBackdrop(backdropPath);
    setAdult(adult);
    setDate(releaseDate);
    setOverview(overview);
  };

  return (
    <div
      id="crd"
      data-title={Title}
      className="relative object-cover flex-none overflow-hidden w-48 rounded-md transition-transform duration-300 ease-in-out hover:scale-110 group"
    >
      <div onClick={toggleFavorite} className="relative">
        <svg
          className={`absolute left-2 top-2 cursor-pointer heart-icon transition-opacity duration-300 group-hover:opacity-100 ${
            heart ? "fill-red-500" : "fill-white"
          } ${isAnimating ? "animate-heart-pop" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
      {user?.email && (
        <Link
          to={{ pathname: "/movieplayer", search: `?ID=${movieDetail.id}` }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <FaPlayCircle
              style={{ height: "50px", width: "50px", color: "white" }}
            />
          </div>
        </Link>
      )}
      <img
        src={ImageURL + Image}
        alt={Title}
        className="w-full h-full"
        onClick={handleCardClick}
      />
    </div>
  );
}

export default Card;
