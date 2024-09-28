import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Mylist from "./Pages/Mylist";
import { Login } from "./Pages/Login";
import { AuthContextProvider } from "./Context/AuthContext";
import { Signup } from "./Pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";
import VideoPlayer from "./Pages/VideoPlayer";
import SearchResult from "./Pages/SearchResult";
import MoviePlayer from "./Pages/MoviePlayer";

function App() {
  const location = useLocation();

  const shouldShowNavbar = () => {  
    return !["/login", "/signup",].includes(location.pathname);
  };

  return (
    <div>
      <AuthContextProvider>
        {shouldShowNavbar() && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/mywatchlist"
            element={
              <ProtectedRoute>
                <Mylist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchresult"
            element={
              <ProtectedRoute>
                <SearchResult/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videoplayer"
            element={
              <ProtectedRoute>
                <VideoPlayer/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movieplayer"
            element={
              <ProtectedRoute>
                <MoviePlayer/>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
