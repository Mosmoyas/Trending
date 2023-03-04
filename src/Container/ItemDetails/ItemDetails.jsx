import axios from "axios";
import { func } from "joi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
    let { id, media_type } = useParams();
    console.log(id, media_type);
    const [itemDetails, setItemDetails] = useState({});

    async function getItemDetails(id, media_type) {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=872ab3dea53f36274b9cf100002aa860&language=en-US&page=1`
        );
        console.log(data)
        function getResults() {
            for (let i = 0; i < data.results.length; i++) {
                return data.results[i];
            }
        }
        // console.log([getResults]);
        setItemDetails(getResults);
    }


    useEffect(() => {
        getItemDetails(id, media_type);
    }, []);
    return (
        <>{itemDetails ? <div className="row my-body pt-5">
            <div className="col-md-3">
                <img
                    className="w-100"
                    src={"https://image.tmdb.org/t/p/w500/" + itemDetails?.poster_path}
                />
            </div>
            <div className="col-md-9 ">
                <h2>
                    {itemDetails?.title}
                    {itemDetails?.name}
                </h2>
                <p className="py-2 text-muted">{itemDetails?.overview}</p>

                <h5 className="py-2">
                    Vote_Average:
                    {itemDetails?.vote_average && (
                        <div className=" p-2 ">
                            {itemDetails.vote_average?.toFixed(1)}
                        </div>
                    )}
                </h5>
                <h5 className="py-2">
                    Vote_Average:
                    {itemDetails?.vote_count && (
                        <div className=" p-2 ">
                            {itemDetails?.vote_count?.toFixed(1)}
                        </div>
                    )}
                </h5>
            </div>
        </div> : <div className="row my-body m-5 p-5 d-flex justify-content-center align-items-center alert alert-dark">Film Is Not Found</div>}
        </>

    );
};

export default ItemDetails;
