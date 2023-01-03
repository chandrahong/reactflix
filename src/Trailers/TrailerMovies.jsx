import React from 'react'
import ReactPlayer from 'react-player'
import {useState, Fragment, useEffect} from 'react';
import movieTrailer from 'movie-trailer';
import '../Styles/TrailerMovie.css'

const TrailerMovies = (moviesTitle) => {
    const [video, setVideo] = useState("")
    const [videoURL, setVideoURL] = useState("")

    function handleSearch() {
        setVideo(moviesTitle)
        movieTrailer(video).then((res) =>{
            setVideoURL(res);
        });
    }
    useEffect(() =>{
        handleSearch()
    },[videoURL])
  return (
    <Fragment>
        <div className ="Container">
        </div>
        <div className="player">
            <ReactPlayer url={videoURL} controls={true}/>
        </div>


    </Fragment>
  )
}

export default TrailerMovies
