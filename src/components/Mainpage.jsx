import Upcoming from "./innerpages/Upcoming";
import Genre from "./innerpages/genreMovies";
import Moviecollection from "./innerpages/moviecollection";
import Tvshow from "./innerpages/Tvshow";
import { useState } from "react";
import axios from "axios";

function Mainpage() {
  const [hoverId, setHoverId] = useState(null);
  const [urlTrailer, setUrlTrailer] = useState("");

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          params: {
            api_key: "f14aa7e91f39f8799a64bc7097d18fb0",
          },
        }
      );
      console.log(response.data);
      const Trailer = response.data.results.find(
        (result) => result.type === "Trailer"
      );
      if (Trailer) {
        setUrlTrailer(
          `https://www.youtube.com/embed/${Trailer.key}?autoplay=1&mute=1&cc_load_policy=1&controls=0`
        );
      } else {
        setUrlTrailer("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Moviecollection
          hoverId={hoverId}
          setHoverId={setHoverId}
          urlTrailer={urlTrailer}
          setUrlTrailer={setUrlTrailer}
          fetchTrailer={fetchTrailer}
        />
        <Upcoming
          hoverId={hoverId}
          setHoverId={setHoverId}
          urlTrailer={urlTrailer}
          setUrlTrailer={setUrlTrailer}
          fetchTrailer={fetchTrailer}
        />
        <Genre
          hoverId={hoverId}
          setHoverId={setHoverId}
          urlTrailer={urlTrailer}
          setUrlTrailer={setUrlTrailer}
          fetchTrailer={fetchTrailer}
        />
        <Tvshow />
      </div>
      <p
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Movies App Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Moin khan
      </p>
    </>
  );
}

export default Mainpage;
