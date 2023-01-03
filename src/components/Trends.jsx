import axios from 'axios'
import React, { Fragment, useEffect , useState, useContext} from 'react'
import {AiFillPlayCircle, AiOutlineClose} from "react-icons/ai"
import {Container} from "./Navbar"
import NoImg from "./noimage.jpg"
import '../Styles/Videos.css'

function Trends() {
  const {toogle, inputValue} = useContext(Container)
  const input = inputValue;
  const TrendsShown ="/trending/all/week"
  const Shown = input ? "search" : "discover"
  const [trendArray , setTrendArray] = useState([])
  const [trendTitle, setTrendTitle] = useState('')
  const [trailer, setTrailer] = useState(true)
  const Api = "https://api.themoviedb.org/3"
  const Images = "https://image.tmdb.org/t/p/w500"

  const Trends = async() =>{
    const data = await axios.get(`${Api}${TrendsShown}`, {
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

  console.log(Trends)

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
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
              <h3 id="smaller-Text" className={toogle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
              </div>
            )
          })}

                <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme': 'LightThemeClose'} fontSize={55} onClick={() => setTrailer (true)}/>

        </div>
      </div>
    </Fragment>
  )
}

export default Trends
