import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US&&page=1",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
          },
        });
        console.log(response.data.results);
        setData(response.data.results);
        // console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h1>{item.title || item.name}</h1>
            <h3>{item.release_date}</h3>
            <div>{item.overview}</div>
            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default App;
