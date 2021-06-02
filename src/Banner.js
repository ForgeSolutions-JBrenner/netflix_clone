import axios from "./axios";
import React, { useEffect, useState } from "react";
import requests from "./requests";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) //-1 so that we do not risk going over specific length of string this will get one of the netflix originals randomly
        ]
      );
	  return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
	  return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }
  return (
    <header className="banner"
		style={{
			backgroundSize: "cover",
			backgroundImage: `url(
				"${base_url}${movie?.backdrop_path}"
			)`,
			backgroundPosition: "center center",
		}}
		>
		<div className="banner_contents">
	  <h1 className="banner_title">
		  {movie?.title || movie?.name || movie?.original_name}
	  </h1>

	  <div className="banner_buttons">
		  <button className="banner_button">Play</button>
		  <div className="divider"/>
		  <button className="banner_button">My List</button>
		  <h1 className="banner_description">
			  {truncate(movie?.overview, 150)}
		  </h1>
	  </div>
	  </div>
	  <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
