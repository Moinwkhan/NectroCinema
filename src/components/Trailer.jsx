import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieContext from "./movieContext";
import Image from "./images/bookmark.png";

const TrailerShow = () => {
  const { selectedMovieId } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [urlTailer, setUrlTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}`,
          {
            params: {
              language: "en-US",
            },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
            },
          }
        );
        console.log(response.data);
        setMovieDetails(response.data);
        setLoading(false);

        const Tailer = await axios.get(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?language=en-US`,
          {
            params: {
              language: "en-US",
            },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
            },
          }
        );
        const Trailer = Tailer.data.results.find(
          (result) => result.type === "Trailer"
        );
        if (Trailer) {
          setUrlTrailer(
            `https://www.youtube.com/embed/${Trailer.key}?autoplay=1&cc_load_policy=1&controls=1&fs=1`
          );
        } else {
          setUrlTrailer("");
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error);
        setLoading(false);
      }
    };
    if (selectedMovieId) {
      fetchMovieDetails();
    }
  }, [selectedMovieId]);

  const handleback = () => {
    location.href = "/movies";
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  if (loading)
    return (
      <div className="loading spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (error) return <h3>Error: {error.message}</h3>;
  if (!movieDetails) return null;

  return (
    <div>
      <div
        style={{
          padding: "40px",
          display: "flex",
          gap: "80px",
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, .4)",
          }}
        ></div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt=""
            height={500}
            width={300}
            style={{
              filter: "brightness(100%)",
              borderRadius: "20px",
              boxShadow: "10px 20px 80px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "28%",
            color: "wheat",
          }}
        >
          <h3>{movieDetails.original_title}</h3>
          <p>
            {" "}
            Popularity: {Math.round((movieDetails.popularity / 1000) * 100)}%
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <p>
              <img
                src={Image}
                alt=""
                height={30}
                style={{
                  cursor: "pointer",
                }}
              />
            </p>
            <p>
              <img
                src="https://i.pinimg.com/736x/17/dc/d0/17dcd0573cf56ceefa6ed03b028ded0e.jpg"
                alt=""
                height={30}
                style={{
                  cursor: "pointer",
                  fill: liked ? "red" : "none",
                }}
                onClick={handleLikeClick}
              />
            </p>
            <p
              style={{
                cursor: "pointer",
              }}
            >
              <a href={urlTailer} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.freepnglogos.com/uploads/play-button-png/icon-png-play-button-icons-and-png-backgrounds-24.png"
                  alt="play"
                  height={30}
                />{" "}
                Play Tailer
              </a>
            </p>
          </div>
          <p>{movieDetails.tagline}</p>
          <p style={{ width: "60%" }}>{movieDetails.overview}</p>
          <p style={{ width: "60%" }}>
            Release Date : {movieDetails.release_date}
          </p>
          <div style={{ display: "flex", gap: "120px" }}></div>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          style={{
            height: 40,
            width: 120,
            backgroundColor: "rgba(0, 0, 0, .6)",
          }}
          onClick={handleback}
        >
          {" "}
          ~ Back
        </button>
      </div>
    </div>
  );
};

export default TrailerShow;
