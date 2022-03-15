import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import './movie.css'


export default function Movie(props) {
    const {movie: m} = props;
    const [movie] = useState(m);
    const navigate = useNavigate();
    
    return (
        <div className="portfolio-info movie">
            <h3>{movie?.name}</h3>
            <div className="mb-2">
                {movie?.productioncountry}
            </div>
            <div className="mb-2">
                {new Date(movie?.releasedate).toDateString()}
            </div>
            {props?.showRatings != null && props?.showRatings === false  ? (<></>) : (<div className="mb-2">
                <Rating ratingValue={movie?.rating} size={25} readonly={true} />
            </div>) }
            
            <div className="buttons d-flex justify-content-around">
                <button onClick={ () => navigate(`/app/movie-detail/${movie?.id}`) } className="detail-button w-100">Detials</button>
                {
                    props.showWatchbutton != null && props?.showWatchbutton === false ? 
                    (<></>) : (
                        <button onClick={ props.toggleWatch } className={"detail-button w-100" + (movie?.watched ? " detail-button-checked" : "")}>
                            {(movie?.watched ? "✔" : "+")} Watched
                        </button>
                    )
                }

            </div>

        </div>
    );
    
}