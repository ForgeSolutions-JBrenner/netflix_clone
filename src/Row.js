import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  //run code based on specific condition or variable
  useEffect(() => {
    //if [] blank then run once when the row load and dont run again
    //when anything use in useeffect with a variable being pulled from outside and being used inside of useeffect, you have to use that variable in the use effect,
    async function fetchData() {
      const request = await axios.get(fetchUrl); //await is saying when the request is made it will wait for the promise to come back and then do something
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height:"390",
    width:"100%",
    playerVars: {
      autoplay: 1,

    }
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = URLSearchParams(new URL(url).search);
        settrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error));
    }
  };

  //console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/*row posters go here */}
        {movies.map((movie) => (
          <img
		        key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ?  movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
//a deafult is actually renamable you can have one standard export default but can export const many times from single file
