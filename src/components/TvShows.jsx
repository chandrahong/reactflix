import axios from 'axios'
import React, {Fragment, useEffect, useState, useContext} from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import NoImg from './noimage.jpg'
import "../Styles/Videos.css"
import { Container } from './Navbar'

function TvShows() {
  const {toogle, inputValue} = useContext(Container)
  const input = inputValue;
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState('')
  const [showData, setShowData] = useState([])
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`
  const Images = "https://image.tmdb.org/t/p/w500"

  const TvShows = async () =>{
    const data = await axios.get(Api, {
        params: {
          api_key: '7481a69c10caca95f00da1e588c2ef5a',
          query: input
        }
      })
    const results = (data.data.results)
    setShowData(results)
  }

  useEffect(() => {
    setTimeout(() => {
      TvShows()
    }, 100)
  },[input])
  
  console.log(showData)

  const TvShowTitle = (shows) =>{
    setTitle(shows.name)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
        {showData.map((shows) => {
          return(
          <Fragment key={shows.id}>
            <div id={trailer ? "container" : "NoContainer"}>
              <AiFillPlayCircle color="white" fontSize={40}  id={trailer ? "playIcon" : "hide"} onClick={()=>TvShowTitle(shows)} />
              <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt="" onClick={()=>TvShowTitle(shows)}/>
              <h3 id="smaller-Text" className={toogle ? 'mainColor' : 'secondaryColor'}>{shows.name}</h3>
            </div>
          </Fragment>
          )
        })}
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme': 'LightThemeClose'} fontSize = {55} color="#fff" cursor={'pointer'} onClick={()=> setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default TvShows
