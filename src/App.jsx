import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MoviesCarousel from "./components/innerpages/moviesCarousel";
import Mainpage from "./components/Mainpage";
import Movies from "./components/Movies";
import TVshows from "./components/TVshows";
import Tvshowcarousel from "./components/innerpages/Tvshowcarousel";
import Trailer from "./components/Trailer";
import { MovieProvider } from "./components/movieContext";

function App() {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post(
        "https://cinemaapi.onrender.com/login",
        loginData
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        setDisabled(false);
      } else {
        window.alert("Invalid username or password.");
      }
    } catch (error) {
      setAlert("Invalid username or password");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      setDisabled(false);

      console.log(`Error occurred during Login: ${error.message}`);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div>
      <MovieProvider>
        <Router>
          <Routes>
            {!isLoggedIn ? (
              <Route
                path="/"
                element={
                  <Home
                    alert={alert}
                    disabled={disabled}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loginData={loginData}
                  />
                }
              />
            ) : (
              <Route path="/" element={<Navigate to="/home" />} />
            )}
            <Route
              path="/home"
              element={
                <>
                  <MoviesCarousel />
                  <Mainpage />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <MoviesCarousel />
                  <Movies />
                </>
              }
            />
            <Route
              path="/tvshows"
              element={
                <>
                  <Tvshowcarousel />
                  <TVshows />
                </>
              }
            />
            <Route
              path="/watchlist"
              element={
                <>
                  <MoviesCarousel />
                  <h1>COMING SOON</h1>
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  <Trailer />
                </>
              }
            />
          </Routes>
        </Router>
      </MovieProvider>
    </div>
  );
}

export default App;
