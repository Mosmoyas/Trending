import React from "react";

const MediaItem = ({ item }) => {
    return (
        <>
            <div className="col-md-2">
                <div className="movie position-relative">
                    {item.poster_path ? <img className="w-100" src={'https://images.tmdb.org/t/p/w500/' + item.poster_path} alt="" />
                        : <img className="w-100" src={'https://images.tmdb.org/t/p/w500/' + item.profile_path} alt="" />}



                    <h3 className="h6 my-2">{item.title} {item.name}</h3>
                    {/* {item.vote_average ? <div className="vote p-2 text-white position-absolute top-0 end-0">{item.vote_average?.toFixed(1)}</div>
                        : ""} */}
                    {item.vote_average && <div className="vote p-2 text-white position-absolute top-0 end-0">{item.vote_average?.toFixed(1)}</div>}

                </div>
            </div>
        </>
    );
};

export default MediaItem;
