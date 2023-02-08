import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {Container} from "./Navbar"
import {MovieIdContainer} from "./Movies"

function MovieInfo() {
    const {toogle, inputValue} = useContext(Container);
    const input = inputValue;
    const [moviesData,  setMoviesData] = useState([])
    const Api = `https://api.themoviedb.org/3`
   
    
    const MovieInfo = async () =>{
        const data = await axios.get(`${Api}`, {
          params: {
            api_key: '7481a69c10caca95f00da1e588c2ef5a',
            query: input
          }
        })
        const results = data.data.results
        setMoviesData(results)
    }

    console.log(moviesData)

    useEffect(() => {
        setTimeout(() =>{
          MovieInfo()
        }, 100)
      }, [])

}

export default MovieInfo
