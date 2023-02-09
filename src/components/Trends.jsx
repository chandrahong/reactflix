import axios from 'axios'
import React, { Fragment, useEffect , useState, useContext} from 'react'
import {AiFillPlayCircle, AiOutlineClose} from "react-icons/ai"
import {Container} from "./Navbar"
import NoImg from "./noimage.jpg"
import '../Styles/Videos.css'
import TrailerMovies from '../Trailers/TrailerMovies'

function Trends() {
  const {toogle, inputValue} = useContext(Container)
  const input = inputValue
  const [trendArray , setTrendArray] = useState([])
  const [trendTitle, setTrendTitle] = useState('')
  const [trendId, setTrendId] = useState('')
  const [trendGenre, settrendGenre] = useState('')
  const [trailer, setTrailer] = useState(true)
  const Api = "https://api.themoviedb.org/3"
  const Images = "https://image.tmdb.org/t/p/w500"

  const Trends = async() =>{
    const data = await axios.get(`${Api}/trending/all/week`, {
      params: {
        api_key: '7481a69c10caca95f00da1e588c2ef5a',
        query: input
      }
    })
    const results = data.data.results
    setTrendArray(results)
  }

  useEffect(() => {
    setTimeout(() => {
      Trends()
  },100)},[input])

  console.log(trendArray)

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrendId(trend.id)
    settrendGenre(trend.media_type)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {trendArray.map((trend) => {
            return(
              <div id={trailer ? "container" : "NoContainer"}>
                <AiFillPlayCircle color="white" fontSize={40}  id={trailer ? "playIcon" : "hide"} onClick={()=>TrendTitle(trend)} />
              <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt="" onClick={()=>TrendTitle(trend)}/>
              <h3 id="smaller-Text" className={toogle ? 'mainColor' : 'secondaryColor'}>{trend.media_type === "tv" ? trend.original_name : trend.original_title}</h3>
              </div>
            )
          })}
                {trailer ? console.log : <TrailerMovies genre={trendGenre} moviesId={trendId} />}
                <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme': 'LightThemeClose'} fontSize={35} onClick={() => setTrailer (true)}/>

        </div>
      </div>
    </Fragment>
  )
}

export default Trends
