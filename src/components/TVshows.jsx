import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import Copy from "./images/bookmark.png";

function TVshows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchTvshow = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/tv",
          {
            params: {
              include_adult: "false",
              include_null_first_air_dates: "false",
              language: "en-US",
              page: "2",
              sort_by: "popularity.desc",
            },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
            },
          }
        );
        setShows(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setError(error);
      }
    };
    fetchTvshow();
  }, []);

  const title = (title) => {
    const words = title.split(" ");
    const short = words.slice(0, 3).join(" ");
    return words.length > 3 ? short + "..." : title;
  };

  const wordOverview = (overview) => {
    const words = overview.split(" ");
    const short = words.slice(0, 10).join(" ");
    return words.length > 10 ? short + "..." : overview;
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
    <>
      <h1 style={{ position: "absolute", top: "40rem", left: "43%" }}>
        TV Shows
      </h1>
      <div
        style={{
          textAlign: "center",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "50px",
          padding: "50px",
          marginTop: "13%",
        }}
      >
        {shows.map((show) => (
          <Card
            style={{ backgroundColor: "rgba(25, 25, 25, 0.721)" }}
            key={show.id}
            onMouseEnter={() => setHoveredId(show.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            />
            <Card.Content className="p-2">
              <Card.Header>{title(show.name)}</Card.Header>
              <Card.Description>{wordOverview(show.overview)}</Card.Description>
            </Card.Content>
            {hoveredId === show.id && (
              <img
                src={Copy}
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
        ))}
      </div>
    </>
  );
}

export default TVshows;
