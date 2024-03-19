import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

function Tvshow() {
  const [shows, setShows] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef(null);

  useEffect(() => {
    // const apiKey = "f14aa7e91f39f8799a64bc7097d18fb0";
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=2",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setShows(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const title = (name) => {
    const words = name.split(" ");
    const short = words.slice(0, 3).join(" ");
    if (words.length > 3) {
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

  const isMobile = window.innerWidth <= 650;

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

  return (
    <>
      <h1 className="mainPageHeads">Tv Shows</h1>
      <div
        className="horizontal-scroll-container Movies"
        ref={containerRef}
        style={{
          overflowX: "auto",
          position: "relative",
        }}
      >
        {shows.map((item, index) => (
          <div className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title}
            />
            <div className="card-content">
              <h3>{title(item.original_name)}</h3>{" "}
              {!isMobile && <p>{overView(item.overview)}</p>}
            </div>
          </div>
        ))}
      </div>

      {!isMobile && scrollPosition > 0 && (
        <Button
          onClick={handleScrollLeft}
          style={{
            position: "absolute",
            top: "161rem",
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
              top: "161rem",
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

export default Tvshow;
