import axios from "axios";

function Watchlist() {
  const options = {
    method: "POST",
    url: "https://api.themoviedb.org/3/account/account_id/watchlist",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <div>
      <h1>COMING SOON</h1>
    </div>
  );
}

export default Watchlist;
