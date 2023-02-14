import React from 'react'
import {useState, Fragment, useEffect} from 'react'
import '../Styles/TrailerMovie.css'
import Youtube from 'react-youtube'
import axios from 'axios'



const TrailerMovies = (genre, moviesId) => {
    const [videoUrl, setVideoUrl] = useState([])
    const [selectedMovie, setSelectedMovie] = useState([])
    const [selectedMovieGenres, setSelectedMovieGenres] = useState([])
    const [selectedCredits, setSelectedCredits] = useState([])
    const Api = "https://api.themoviedb.org/3"
    const trailertype = genre.genre === "tv" ? "/tv/" : "/movie/"
    const Images = "https://image.tmdb.org/t/p/w500"

   
    const fetchMovie = async() => {
        const data = await axios.get(`${Api}${trailertype}${genre.moviesId}`,{
            params: {
                    api_key: '7481a69c10caca95f00da1e588c2ef5a',
                    append_to_response: 'videos'
            }
        })
        setVideoUrl(data.data.videos)
        setSelectedMovie(data.data)
        setSelectedMovieGenres(data.data.genres)
        return setVideoUrl, setSelectedMovie, setSelectedMovieGenres
    }

    const credits = async() => {
        const data = await axios.get(`${Api}${trailertype}${genre.moviesId}/credits`,{
            params: {
                    api_key: '7481a69c10caca95f00da1e588c2ef5a'
            }
        })
        setSelectedCredits(data.data.cast)
        return setSelectedCredits
    }

    const renderVideoUrl = () => {
        try{
            console.log("Movie Data",selectedMovie)
            console.log("Credits", selectedCredits)
            console.log("videos", videoUrl)
            
            const movietrailer = videoUrl.results.find(vid => vid.name === ('Official Trailer' ||  'official trailer' || 'Official Trailer [Subtitled]' || 
'Official Netflix Trailer' || 'trailer'))
            console.log(movietrailer)
            const movietrailer2 = movietrailer !== undefined ? movietrailer.key : "lXnjds5qabY"
            
            const opts = {
                height: '600',
                width: '1200',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                },
              };

        return <Youtube 
                videoId={movietrailer2} opts={opts} id="youtubeplayer"
            />
        } catch (error){
           console.log(error)
        }
    }

    useEffect(() =>{
        fetchMovie();
        credits();
    },[])
  return (
    <Fragment>
        <div className="modalBackground">
            <div className ="modalContainer">
                <div className ="player">
                    {moviesId ? renderVideoUrl() : null}
                </div>

                <div className="movie-info">
                    <div className="title">
                        <h3>{selectedMovie.original_title}</h3>
                        <p>{selectedMovie.overview}</p>
                     
                    
                    </div>

                    <div className="cast">
                        <h3>Release Date : {selectedMovie.release_date}</h3>
                        <h3>Rating : {selectedMovie.vote_average}</h3>
                        <h3 id="h3name">Genres :</h3>
                        <p id="name"> {selectedMovieGenres.map((item) => {return(item.name + " ")})}</p>
                       
                    </div>
                </div>

                <div className="credits"> 
                        <h3> Cast  </h3>
                    <div className="poster">
                        <div className="poster-img">
                                {selectedCredits.map((img) => {
                                    return (
                                        <Fragment>
                                            <div className="container">
                                                {img.profile_path? <img id="credits-img" src={`${Images}${img.profile_path}`} /> : null}
                                                {img.profile_path? <h5 id="credits-character">{img.character}</h5> : null}
                                                {img.profile_path? <h5 id="credits-name">{img.name}</h5> : null}
                                            </div>
                                        </Fragment>
                                    )
                                }
                                )}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </Fragment>
  )
}

export default TrailerMovies
