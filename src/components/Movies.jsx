import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {AiFillPlayCircle, AiOutlineClose } from "react-icons/ai"
import {Container} from "./Navbar"
import {Link} from 'react-router-dom'
import NoImg from "./noimage.jpg"
import '../Styles/Videos.css'
import Navbar from "./Navbar";
import TrailerMovies from '../Trailers/TrailerMovies'


const Movies = () => {

  const {toogle, inputValue} = useContext(Container);
  const input = inputValue;
  const [moviesData,  setMoviesData] = useState([])
  const [movieId, setMovieId] = useState('')
  const [trailer, setTrailer] = useState(true);
  const [movieGenre, setMovieGenre] = useState('')
  const Shown = input ? "search" : "discover"
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`
  const Images = "https://image.tmdb.org/t/p/w500"
  const genre = "movie";

  const MovieCall = async () =>{
    const data = await axios.get(Api,{
      params: {
        api_key: '7481a69c10caca95f00da1e588c2ef5a',
        query: input
      }
    })
    const results = data.data.results
    setMoviesData(results)
    console.log(data)
  }


  useEffect(() => {
    setTimeout(() =>{
      MovieCall()
    }, 100)
  }, [input])

  console.log(moviesData);
  
  const MoviesTitle = (movie) => {
    setMovieId(movie.id)
    setMovieGenre(genre)
    setTrailer(!trailer)
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    setTrailer(true)
    document.body.style.overflow = 'unset';
  }
  


  return (
      <Fragment>
      <div className={toogle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle color="white" fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MoviesTitle(movie)} />
                  <Link to="/MovieInfo" relative="path">
                   
                  </Link>
                  
                <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" onClick={() => MoviesTitle(movie)}  />
                  <h3 id="smaller-Text" className={toogle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>


                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TrailerMovies genre={movieGenre} moviesId={movieId} />}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme' : 'LightThemeClose'} border="1px solid" fontSize={35} color="white" cursor={'pointer'} onClick={() => closeModal()} />
        </div>
      </div>

    </Fragment>
  )
}

export default Movies
