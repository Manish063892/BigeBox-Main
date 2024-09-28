import React, { useEffect, useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../Database/Firebase";
import { ImageURL } from "../Constants/Constants";
import { doc, onSnapshot, arrayRemove, updateDoc } from "firebase/firestore";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Mylist() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "users", `${user.email}`),
        (doc) => {
          if (doc.data()) setMovies(doc.data().favShows);
        }
      );
    }
  }, [user?.email]);

  if (!user) {
    return (
      <div className="bg-black h-screen flex items-center justify-center text-white font-abc">
        <h1>You need to login to access this page</h1>
      </div>
    );
  }

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  return (
    <div className="bg-black text-white font-abc ">
      <div className="flex justify-center">
        {movies.length > 0 && (
          <h1 className="mt-4 text-s">
            Here are the movies you've added to your watchlist.
          </h1>
        )}
      </div>
      <div className="w-full mt-8 flex items-center justify-center">
        <div className="flex w-[1024px] flex-wrap gap-4">
          {movies.length > 0 ? (
            movies.map((item, index) => (
              <div
                key={index}
                className="relative flex-none overflow-hidden w-48 rounded-md transition-transform duration-300 ease-in-out hover:scale-110 group"
              >
                <svg
                  onClick={() => {
                    handleUnlikeShow(item);
                  }}
                  className="absolute top-4 right-4 cursor-pointer svg-icon opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                <Link to={{ pathname: "/movieplayer", search: `?ID=${item.id}` }}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <FaPlayCircle
                      style={{ height: "50px", width: "50px", color: "white" }}
                    />
                  </div>
                </Link>
                <img
                  src={ImageURL + item.poster_path}
                  alt={item.title}
                  className="rounded-md"
                />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h2>Your watchlist is empty !</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mylist;
