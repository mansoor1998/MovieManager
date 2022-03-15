//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";



export default function MovieDetail() {
    const [movie, setMovie] = useState();
    const {id} = useParams();


    useEffect(() => {
        fetch(`http://localhost:4000/movie/${id}`, {
            headers: {
                'method': "GET",
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('auth-token')
            }
        }).then(x => x.json()).then((result) => {
            setMovie(result)
        });
    }, []);

    // arrow function.
    const setRating = async (rate) => {
        await fetch(`http://localhost:4000/set-rating/${movie?.id}/${rate}`, {
            method: "PUT",
            headers: {
                authorization: localStorage.getItem('auth-token')
            }
        });
        // set the rating of the movie.
        setMovie({
            ...movie,
            rate: rate
        }); 
    }


    const deleteRating = async (rate) => {
        await fetch(`http://localhost:4000/delete-rating/${movie.id}`, {
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem('auth-token')
            }
        });

        setMovie({
            ...movie,
            rate: 0
        })
    }

    return (movie) ? (
        <div>
            <h3>
                {movie?.name}
            </h3>
            {movie?.genras?.length > 0 && <div>
                <h5>Genras</h5>
                {movie?.genras?.map(x => ( <p key={Math.random() * 1000000} >{x}</p> ))}
            </div>}
            {movie?.castname[0] !== null && <div>
                <h5>Casts</h5>
                {movie?.castname?.map(x => ( <p key={Math.random() * 1000000} >{x}</p> ))}
            </div>}
            <p>{new Date(movie?.releasedate).toDateString() }</p>
            <Rating onClick={(rate) => { setRating(rate) }} ratingValue={movie?.rate} initialValue={0} />
            <button onClick={deleteRating} >x</button>
        </div>
    ): (<div></div>);
}