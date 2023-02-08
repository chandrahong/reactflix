import React, {Fragment, useState , useContext} from 'react'
import {HiSearch} from 'react-icons/hi'
import { Routes , Route, NavLink} from 'react-router-dom'
import Movies from './Movies'
import TvShows from './TvShows'
import Trending from './Trends'
import MovieInfo from './MovieInfo'
import '../Styles/NavBarStyles.css'


export const Container = React.createContext()

function Navbar() {
    const [toogle, setToogle] = useState(true)
    const [inputValue, setInputValue] =useState("")

  return (
    <Container.Provider value={{toogle, inputValue}}>
    <Fragment>
        <div id="navheader">
        <nav className={toogle?'' : 'navBarColor'}>

            <div className="nav-options">
       
                <h1 id={toogle? '' :"heading"}>ReactFlix</h1>
             
                <NavLink to="" style={({isActive}) => {return {color:isActive? "#fff" : "#EE9B00"}}}>
                <span id={toogle? 'Movies': 'MoviesLight'}>Movies</span>
                </NavLink>

                <NavLink to="/TvShows" style={({isActive}) => {return {color:isActive? "#fff" : "#EE9B00"}}}>
                <span id={toogle? 'Movies': 'MoviesLight'}>Tv Shows</span>
                </NavLink>

                <NavLink to="./Trending" style={({isActive}) => {return {color:isActive? "#fff" : "#EE9B00"}}}>
                <span id={toogle? 'Movies': 'MoviesLight'}>Trending</span>
                </NavLink>


            </div>
            
            <div className="input-group">
                <input type="text" placeholder='Search Movies' onChange={(e) => setInputValue(e.target.value)} />
                <HiSearch fontSize={21} id="search-icons" />

                <div id="Color-switcher" onClick={() => setToogle(!toogle)}>
                    <div id={toogle? 'Color-switcher-mover': 'Color-switcher-moved'}></div>

                </div>
             </div>
        </nav>
        </div>


        <Routes>
            <Route path='' element={<Movies />} />
            <Route path='TvShows' element={<TvShows />}/>
            <Route path='Trending' element={<Trending />}/>
            <Route path='MovieInfo' element={<MovieInfo />}/>
        </Routes>
    </Fragment>
    </Container.Provider>
  )
}

export default Navbar
