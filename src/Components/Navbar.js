import React, { useState } from "react";
import img1 from "../Media/bingebox.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import userimg from "../Media/user.jpg";

function Navbar() {
  const { user, logOut, profilePic } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [searchValue, setSearchValue] = useState(null);
  searchValue && console.log(searchValue);

  const handleSearch = () => {
    navigate(`/searchresult?searchValue=${searchValue}`);
    setSearchValue(""); // Clear the input
  };

  return (
    <div className="font-abc bg-black overflow-hidden p-4 font-semibold text-white flex items-center justify-between gap-20 h-16">
      <div className="object-cover flex gap-8 items-center justify-center">
        <Link to="/">
          <img className="h-10" src={img1} alt="Logo" />
        </Link>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        {user && (
          <>
            <Link to="/mywatchlist">
              <h2>My Watchlist</h2>
            </Link>
            <div className="flex items-center justify-center gap-4">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                type="text"
                className="h-9 w-64 text-s rounded-md p-2 text-black border-none outline-none focus:ring-0"
                placeholder="Search movie"
              />
              {searchValue && (
                <Link
                  to={{
                    pathname: "/searchresult",
                    search: `?searchValue=${searchValue}`,
                  }}
                >
                  <svg
                    onClick={handleSearch}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {user?.email ? (
        <div className="flex gap-4 items-center justify-center">
          <Link to="/profile">
            <img
              className="h-[35px] w-[35px] rounded-full cursor-pointer"
              src={profilePic || userimg}
              alt="User"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-[100px] rounded-full px-1 py-2 text-l font-semibold bg-red-600 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:opacity-80"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="flex items-center justify-center gap-2 w-[100px] rounded-full px-1 py-2 text-l font-semibold bg-red-600 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:opacity-80">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="flex items-center justify-center gap-2 w-[100px] rounded-full px-1 py-2 text-l font-semibold bg-red-600 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:opacity-80">
              Signup
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
