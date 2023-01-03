import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {AiFillPlayCircle, AiOutlineClose} from "react-icons/ai"
import {Container} from "./Navbar"
import NoImg from "./noimage.jpg"
import '../Styles/Videos.css'
import TrailerMovies from '../Trailers/TrailerMovies'

function Movies() {
  const {toogle, inputValue} = useContext(Container);
  const input = inputValue;
  const [moviesData,  setMoviesData] = useState([])
  const [movieTitle, setMovieTitle] = useState('')
  const [trailer, setTrailer] = useState(true);
  const Shown = input ? "search" : "discover"
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`
  const Images = "https://image.tmdb.org/t/p/w500"

  const MovieCall = async () =>{
    const data = await axios.get(Api,{
      params: {
        api_key: '7481a69c10caca95f00da1e588c2ef5a',
        query: input
      }
    })
    const results = data.data.results
    setMoviesData(results)
  }

  useEffect(() => {
    setTimeout(() =>{
      MovieCall()
    }, 100)
  }, [input])

  console.log(moviesData);
  
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
        {moviesData.map((movie) => {
          return(
          <Fragment key={movie.id}>
            <div id={trailer ? "container" : "NoContainer"}>
              <AiFillPlayCircle color="white" fontSize={40}  id={trailer ? "playIcon" : "hide"} onClick={()=>MoviesTitle(movie)} />
              <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" onClick={()=>MoviesTitle(movie)}/>
              <h3 id="smaller-Text" className={toogle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
            </div>
          </Fragment>
          )
        })}
        {trailer ? console.log : <TrailerMovies moviesTitle={movieTitle} />}
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme': 'LightThemeClose'} fontSize = {55} color="#fff" cursor={'pointer'} onClick={()=> setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Movies
