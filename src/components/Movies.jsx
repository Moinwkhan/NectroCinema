import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import Image from "./images/bookmark.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import MovieContext from "./movieContext";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const { setSelectedMovieId } = useContext(MovieContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allMovies = [];
        for (let i = 1; i <= 5; i++) {
          const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                include_adult: false,
                include_video: true,
                language: "en-US",
                page: i,
                sort_by: "popularity.desc",
              },
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
              },
            }
          );
          allMovies = [...allMovies, ...response.data.results];
        }
        setMovies(allMovies);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const wordOverview = (overview) => {
    const words = overview.split(" ");
    const short = words.slice(0, 15).join(" ");
    return words.length > 15 ? short + "..." : overview;
  };

  if (loading)
    return (
      <img
        id="loading"
        src="https://media.giphy.com/media/ycfHiJV6WZnQDFjSWH/giphy.gif"
      />
    );
  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <div
      style={{ marginTop: "90px", overflowX: "hidden", textAlign: "center" }}
    >
      <h1>Movies</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} style={{ padding: "50px" }}>
            <Link to={`/movies/${movie.id}`}>
              <Card
                onMouseEnter={() => setHoveredId(movie.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMovieId(movie.id)}
                style={{
                  textDecoration: "none",
                }}
              >
                <Card.Img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = "https://www.example.com/default-image.jpg"; 
                  }}
                  height={200}
                  style={{
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Card.Body style={{ padding: 8 }}>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{wordOverview(movie.overview)}</Card.Text>
                </Card.Body>
                {hoveredId === movie.id && (
                  <Card.Img
                    src={Image}
                    alt="Save"
                    style={{
                      height: "40px",
                      width: "50px",
                      transition: "transform 0.9s",
                      transform: "rotate(0deg)",
                      position: "absolute",
                      top: 10,
                      right: 10,
                      cursor: "pointer",
                    }}
                  />
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Movies;
