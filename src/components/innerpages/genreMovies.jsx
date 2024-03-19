import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function Moviesgenre({
  hoverId,
  setHoverId,
  urlTrailer,
  setUrlTrailer,
  fetchTrailer,
}) {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setUpcoming(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const title = (name) => {
    const words = name.split(" ");
    const short = words.slice(0, 4).join(" ");
    if (words.length > 4) {
      return short + "...";
    } else {
      return short;
    }
  };

  const overView = (overview) => {
    const words = overview.split(" ");
    const short = words.slice(0, 15).join(" ");
    if (words.length > 15) {
      return short + "...";
    } else {
      return short;
    }
  };

  const handleScrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      const newPosition = container.scrollLeft - 900;
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    if (container) {
      const newPosition = container.scrollLeft + 920;
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const handleMouseEnter = (type) => {
    fetchTrailer(type);
    setHoverId(type);
  };

  const handleMouseOut = () => {
    setUrlTrailer("");
    setHoverId(null);
  };

  const isMobile = window.innerWidth <= 650;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="mainPageHeads">Genre Movies </h1>
      <div
        className="horizontal-scroll-container Movies"
        ref={containerRef}
        style={{
          overflowX: "auto",
          position: "relative",
        }}
      >
        {upcoming.map((item, index) => (
          <div
            className="card"
            key={index}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseOut}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
            />
            <div className="card-content">
              <h3>{title(item.original_title)}</h3>{" "}
              {!isMobile && <p>{overView(item.overview)}</p>}
            </div>
            {hoverId === item.id && urlTrailer && (
              <iframe
                style={{
                  position: "absolute",
                  top: -34,
                  left: -0.5,
                  borderRadius: "15px 15px 0px 0px",
                }}
                width="300"
                height="265"
                src={urlTrailer}
                title="Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                autoPlay={!!urlTrailer}
                loading="eager"
                referrerPolicy="no-referrer"
              ></iframe>
            )}
          </div>
        ))}
      </div>
      {!isMobile && scrollPosition > 0 && (
        <Button
          onClick={handleScrollLeft}
          style={{
            position: "absolute",
            top: "125rem",
            left: "1%",
            transform: "translateY(-50%)",
            height: 45,
            width: 50,
          }}
        >
          {"<"}
        </Button>
      )}
      {!isMobile &&
        scrollPosition <
          containerRef.current?.scrollWidth -
            containerRef.current?.clientWidth && (
          <Button
            onClick={handleScrollRight}
            style={{
              position: "absolute",
              top: "125rem",
              left: "94%",
              transform: "translateY(-50%)",
              height: 45,
              width: 50,
            }}
          >
            {">"}
          </Button>
        )}
    </>
  );
}

export default Moviesgenre;
