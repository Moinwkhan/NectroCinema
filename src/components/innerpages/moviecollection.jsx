import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";

function MovieCollection({
  hoverId,
  setHoverId,
  urlTrailer,
  setUrlTrailer,
  fetchTrailer,
}) {
  const [movies, setMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_video=true&page=1",
          {
            params: {
              include_adult: false,
              language: "en-US",
              page: 1,
              sort_by: "popularity.desc",
              api_key: "f14aa7e91f39f8799a64bc7097d18fb0",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const wordOverview = (overview) => {
    const words = overview.split(" ");
    const short = words.slice(0, 15).join(" ");
    return words.length > 15 ? short + "..." : overview;
  };

  const movieName = (title) => {
    const words = title.split(" ");
    const short = words.slice(0, 3).join(" ");
    return words.length > 3 ? short + "..." : title;
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

  return (
    <div className="">
      <h1 className="heads Movies">BlockBluster Movies</h1>
      <div
        ref={containerRef}
        className="horizontal-scroll-container"
        style={{
          overflowX: "auto",
          position: "relative",
        }}
      >
        {movies.map((item, index) => (
          <div
            className="card"
            key={index}
            style={{ display: "inline-block" }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseOut}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
            />
            <div className="card-content">
              <h3>{movieName(item.title)}</h3>
              {!isMobile && <p>{wordOverview(item.overview)}</p>}
              <Icon name="add" size="large" />
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
      <div>
        {!isMobile && scrollPosition > 0 && (
          <Button
            onClick={handleScrollLeft}
            style={{
              position: "absolute",
              top: "54rem",
              left: "2%",
              transform: "translateY(-50%)",
              height: 45,
              width: 50,
              backdropFilter: blur("5px"),
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
                top: "54rem",
                left: "94%",
                transform: "translateY(-50%)",
                height: 45,
                width: 50,
              }}
            >
              {">"}
            </Button>
          )}
      </div>
    </div>
  );
}

export default MovieCollection;
