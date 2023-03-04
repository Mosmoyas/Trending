import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import MediaItem from "../../Container/MediaItem/MediaItem";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  // const [people, setTrendingPeople] = useState([]);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=872ab3dea53f36274b9cf100002aa860`
    );
    callback(data.results);
    console.log(data.results);
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    // getTrending('people', setTrendingPeople);
  }, []);

  return (
    <>
      <div className="row py-5 my-body">
        <div className="col-md-4 d-flex align-items-center">        </div>

        <div className="brdr w-25 mb-3"> </div>

        <h2 className="h5">
          Trending Movies <br /> to watch right now
        </h2>
        <p className="py-2 text-muted">Watched Movies To watch right Now </p>


        {trendingMovies.slice(0, 12).map((item, index) => <MediaItem key={index} item={item} />)}

        <div className="brdr w-100 mt-3"> </div>

      </div>
      <div className="row py-5 my-body">
        <div className="col-md-4 d-flex align-items-center">        </div>

        <div className="brdr w-25 mb-3"> </div>

        <h2 className="h5">
          Trending Tv <br /> to watch right now
        </h2>
        <p className="py-2 text-muted">Watched Movies To watch right Now </p>


        {trendingTv.filter((e) => e.profile_path !== null).slice(0, 12).map((item, index) => <MediaItem key={index} item={item} />)}

        <div className="brdr w-100 mt-3"> </div>

      </div>
    </>
  );
};
export default Home;
