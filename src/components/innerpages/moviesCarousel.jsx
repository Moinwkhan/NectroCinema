import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import image from "../images/ectroCinema-2-12-2024-removebg-preview.png";

function Moviesheaders() {
  const [poster, setPoster] = useState([]);
  const [selectedMoviesind, setSelectedMoviesind] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
            },
          }
        );
        setPoster(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const isMobile = window.innerWidth <= 650;

  const moviesSelect = () => {
    setSelectedMoviesind((prevIndex) => (prevIndex + 1) % poster.length);
  };

  useEffect(() => {
    const internaltime = setInterval(() => {
      moviesSelect();
    }, 6000);

    return () => {
      clearInterval(internaltime);
    };
  }, [poster]);

  return (
    <>
      <div
        className="headerContainer"
        style={{
          backgroundImage: poster[selectedMoviesind]?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1280/${poster[selectedMoviesind]?.backdrop_path})`
            : "none",
          transition: "background-image 1.9s ease-in-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        ></div>
        {poster.map((movie, index) => (
          <div
            className={`headercard ${
              index === selectedMoviesind ? "selected" : "Not-seleted"
            }`}
            style={{
              transform: `translateX(calc(35vw - ${
                isMobile ? "100px" : "150px"
              } - ${selectedMoviesind * 350}px)) scale(${
                index === selectedMoviesind ? 1.4 : 1
              })`,
              transition: "transform 0.7s",
              whiteSpace: "nowrap",
              width: isMobile ? "200px" : "300px",
              height: isMobile ? "80px" : "300px",
              margin: isMobile ? "0 10px" : "0 10px 0 0",
            }}
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              height={150}
            />
          </div>
        ))}
      </div>
      <Navbar
        expand="lg"
        className="bg-transparent"
        variant="dark"
        style={{ position: "absolute", top: "0%" }}
      >
        <Container fluid>
          <Navbar.Brand href="/home">
            <img id="mainLogo" src={image} alt="" height={70} />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll"  style={{position:"absolute",left:"112%"}}/> */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 fs-5"
              style={{
                fontWeight: "500",
                color: "red",
                display: "flex",
                alignContent: "end",
                justifyContent: "end",
                position: "relative",
                left: "150%",
              }}
              navbarScroll
            >
              <NavLink as={Link} to="/home" className="nav-link">
                Home
              </NavLink>
              <NavLink as={Link} to="/movies" className="nav-link">
                Movies
              </NavLink>
              <NavLink as={Link} to="/tvshows" className="nav-link">
                TV shows
              </NavLink>
              <NavLink as={Link} to="/watchlist" className="nav-link">
                My Watchlist
              </NavLink>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isMobile && <div></div>}
    </>
  );
}

export default Moviesheaders;
