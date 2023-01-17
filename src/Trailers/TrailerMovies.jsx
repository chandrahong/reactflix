import React from 'react'
import {useState, Fragment, useEffect} from 'react'
import '../Styles/TrailerMovie.css'
import Youtube from 'react-youtube'
import axios from 'axios'

const TrailerMovies = (genre, moviesId) => {
    const [videoUrl, setVideoUrl] = useState([])
    const [selectedMovie, setSelectedMovie] = useState([])
    const Api = "https://api.themoviedb.org/3"
    const trailertype = genre.genre === "tv" ? "/tv/" : "/movie/"
    console.log(trailertype)
   
    const fetchMovie = async() => {
        const data = await axios.get(`${Api}${trailertype}${genre.moviesId}`,{
            params: {
                    api_key: '7481a69c10caca95f00da1e588c2ef5a',
                    append_to_response: 'videos'
            }
        })
        setVideoUrl(data.data.videos)
        setSelectedMovie(data.data)
        return setVideoUrl, setSelectedMovie
    }

    const renderVideoUrl = () => {
        try{
            console.log("Movie Data",selectedMovie)
            console.log("Video url", videoUrl)
            const movietrailer = videoUrl.results.find(vid => vid.name === ('Official Trailer' ||  'official trailer' || 'Official Trailer [Subtitled]' || 
'Official Netflix Trailer' || 'trailer'))
            console.log(movietrailer)
            const movietrailer2 = movietrailer.key
            
            const opts = {
                height: '800',
                width: '1200',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                },
              };

        return(
            <Youtube 
                videoId={movietrailer2.key} opts={opts} id="youtubeplayer"
            />
         )
        } catch (error){
            console.log("no videos")
        }
    }


    useEffect(() =>{
        fetchMovie()
    },[])

  return (
    <Fragment>
        <div className ="Container">
        </div>
        <div className="player">
            {moviesId ? renderVideoUrl() : null}
        </div>


    </Fragment>
  )
}

export default TrailerMovies
