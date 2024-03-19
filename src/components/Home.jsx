import { useState, useEffect, useRef } from "react";
import Logo from "./images/ectroCinema-2-12-2024-removebg-preview.png";
import {
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  Navbar,
  Alert,
} from "react-bootstrap";
import screen from "./images/screen.png";
import Signin from "./Signin";
import Accordion from "./Accordion";

function Home({ alert, disabled, handleChange, handleSubmit, loginData }) {
  const [showSignup, setShowSignup] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://wallpapers.com/images/featured/godzilla-vs-kong-d35bic6awbsf6bt2.jpg",
    "https://wallpapershome.com/images/pages/pic_h/24469.jpg",
    "https://wallpapers.com/images/hd/movie-background-4saldhgir0h87q13.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/690/670/desktop-wallpaper-game-of-thrones-all-characters-list.jpg",
    "https://i.pinimg.com/originals/04/c2/64/04c264e4aa75e63bc5eee1d52ac4564a.jpg",
    "https://w0.peakpx.com/wallpaper/51/724/HD-wallpaper-allu-arjun-pushpa-movie.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const handleDoubleClick = (event) => {
      event.preventDefault();
    };
    video.addEventListener("dblclick", handleDoubleClick);
    return () => {
      video.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    video.play();
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  return (
    <>
      <div
        className="imgArray"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 630,
          transition: "0.7s ease-out",
        }}
      >
        <div id="nav">
          <Navbar expand="lg" className="bg-transparent">
            <Container>
              <Navbar.Brand className="logo fs-1" style={{ color: "wheat" }}>
                <img src={Logo} alt="NectroCinema" id="logo" height={100} />
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto fs-5">
                  <Nav.Link
                    href="#"
                    style={{ color: "wheat" }}
                    onClick={handleSignup}
                  >
                    Sign in
                  </Nav.Link>
                  <NavDropdown
                    title="Language"
                    id="basic-nav-dropdown"
                    className="custom-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Hindi
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      English
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      <div className="formposition">
        {alert && (
          <Alert
            variant="danger"
            style={{
              position: "absolute",
              top: "100px",
              transition: "none",
              width: "35%",
            }}
          >
            {" "}
            {alert}
          </Alert>
        )}
        {showSignup ? (
          <div className="signup-animation">
            <Signin setShowSignup={setShowSignup} />
          </div>
        ) : (
          <div id="heading">
            <h1 style={{ fontSize: 70 }}>
              Unlimited movies, TV shows and more
            </h1>
            <Form style={{ display: "grid", rowGap: 20 }}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </Form.Label>
                <div id="Inputlogin">
                  <input
                    className="Input fs-5"
                    type="text"
                    name="name"
                    placeholder="Email address"
                    style={{
                      height: "50px",
                      backgroundColor: "transparent",
                      border: "2px solid grey",
                      borderRadius: "10px",
                      color: "white",
                      padding: "10px",
                    }}
                    value={loginData.name}
                    onChange={handleChange}
                  />
                  <input
                    className="Input fs-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={{
                      height: "50px",
                      backgroundColor: "transparent",
                      border: "2px solid grey",
                      borderRadius: "10px",
                      color: "white",
                      padding: "10px",
                    }}
                    value={loginData.password}
                    onChange={handleChange}
                  />
                  <Button
                    id="startedbtn"
                    className="btn1 btn-danger fs-4"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    disabled={disabled}
                  >
                    {disabled ? (
                      <div
                        className="spinner-border text-light"
                        role="status"
                        style={{ height: 35, width: 35 }}
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Get Started"
                    )}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        )}
      </div>
      <div id="show">
        <div>
          <h1>Enjoy on your TV</h1>
          <p style={{ width: "80%" }}>
            Watch on smart TVs, Chromecast, Apple TV, Blu-ray players and more.
          </p>
        </div>
        <video
          id="homeVideo"
          ref={videoRef}
          src={
            "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
          }
          autoPlay
          playsInline
          loop
          muted
          preload="auto"
          controls={false}
          controlsList="nodownload nofullscreen"
          disablePictureInPicture
          onPlay={handlePlay}
          className="myVideo"
        />
      </div>
      <div className="download">
        <img
          src={
            "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          }
          alt=""
        />
        <div className="content">
          <h1>Download your shows to watch offline</h1>
          <h5>
            Save your favourites easily and always have something to watch.
          </h5>
        </div>
      </div>
      <div className="screen">
        <div style={{ position: "relative", left: "10%" }}>
          <h1>Watch everywhere</h1>
          <h5>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV..
          </h5>
        </div>
        <img src={screen} alt="" />
      </div>

      <div className="downForm">
        <Form id="downForm2">
          <Form.Group className="mb-3 d-flex justify-content-center">
            <Form.Label className="disable">
              Ready to watch? Enter your email to create or restart your
              membership.
            </Form.Label>
            <div
              className="disable"
              style={{
                position: "absolute",
                top: "140%",
                left: "60%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                className="d-flex justify-content-center"
                style={{ gap: 10, width: 600 }}
              >
                <input
                  className="Input fs-5"
                  type="text"
                  name="name"
                  placeholder="Email address"
                  style={{
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "2px solid grey",
                    borderRadius: "10px",
                    color: "white",
                    padding: "10px",
                  }}
                  value={loginData.name}
                  onChange={handleChange}
                />
                <input
                  className="Input fs-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={{
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "2px solid grey",
                    borderRadius: "10px",
                    color: "white",
                    padding: "10px",
                  }}
                  value={loginData.password}
                  onChange={handleChange}
                ></input>
              </div>
              <Button
                className="btn1 btn-danger fs-4"
                onClick={(e) => handleSubmit(e)}
                disabled={disabled}
                style={{
                  position: "absolute",
                  top: "180%",
                  left: "45%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                {disabled ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ height: 40, width: 40 }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>

      <div id="accordion">
        <h1 style={{ fontSize: "3.5rem" }}>Frequently asked question</h1>
        <Accordion />
      </div>
      <footer className="footer sticky-footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Movies App Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by Moin khan
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
