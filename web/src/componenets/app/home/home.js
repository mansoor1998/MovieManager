import React, { useEffect, useState } from "react";
import Movie from "../movie/movie.js";
import './home.css';

export default function Home() {

    const [list, setList] = useState({
        movieList: [],
        // watchmovieList: [],
        suggestionsList: []
    });

    // component init
    useEffect(() => {
        // load an api from the server and show it 
        // to the users.
        (async () => {
            const movieList = await fetch("http://localhost:4000/movies", {
                method: "GET", 
                headers: {
                    'authorization': localStorage.getItem('auth-token')
                }
            }).then(x => x.json());
            // .then((result) => {
            //     setList({
            //         ...list,
            //         // @ts-ignore
            //         movieList: result
            //     });
            // });

            // const watchmovieList = await fetch("http://localhost:4000/movie-ratings", {
            //     method: "GET", 
            //     headers: {
            //         'authorization': localStorage.getItem('auth-token')
            //     }
            // })

            const suggestList = await fetch("http://localhost:4000/movie-suggestions", {
                method: "GET", 
                headers: {
                    'authorization': localStorage.getItem('auth-token')
                }
            }).then(x => x.json());
            // console.log(suggestList);
            setList({
                ...list,
                movieList: movieList,
                suggestionsList: suggestList
            }); 
            // .then(x => x.json()).then((result) => {
            //     setList({
            //         ...list,
            //         watchmovieList: result
            //     });
            // });
        })();


        
    }, []);

    const toggleWatchlist = async (movie) => {
        let movielist = list.movieList
        .map(m => (m === movie) ? (m.watched = !m.watched, m) : m);
        
        await fetch(`http://localhost:4000/bookmark-movie/${movie.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem('auth-token')
            }
        })
        setList({
            ...list,
            movieList: movielist
        });
    }

    return (
        <div className="container">
            <div className="mb-4">
                <h1 className="text-center">
                    All Movies
                </h1>
                <div className="row">

                    {list?.movieList?.map(x => (
                        <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
                            <Movie id={x.id} toggleWatch={() => toggleWatchlist(x)} key={Math.floor(Math.random() * 10000)} movie={x} />
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="mb-4">
                {list?.watchmovieList.length > 0 ? (<h1 className="text-center">
                    Watched Movies
                </h1>) : (<></>) }
                <div className="row">
                    {list?.suggestionsList?.map(x => (
                        <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
                            <Movie id={x.id} toggleWatch={() => toggleWatchlist(x)} key={Math.floor(Math.random() * 10000)} movie={x}/>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="mb-4">
                {list?.suggestionsList.length > 0 ? (<h1 className="text-center">
                    Suggested Movies
                </h1>) : (<></>) }
                <div className="row">
                    {list?.suggestionsList?.map(x => (
                        <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
                            <Movie showWatchbutton={false} showRatings={false} id={x.id} toggleWatch={() => toggleWatchlist(x)} key={Math.floor(Math.random() * 10000)} movie={x}/>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
}
