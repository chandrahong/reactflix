import React, {Fragment, useState } from 'react'
import {HiSearch} from 'react-icons/hi'
import {NavLink, useNavigate} from 'react-router-dom'
import '../Styles/NavBarStyles.css'
import Movies from './Movies'
import TvShows from './TvShows'
import Trending from './Trends'
import MovieInfo from './MovieInfo'
import Profile from '../Login/Profile'
import {Routes, Route} from "react-router"



export const Container = React.createContext()

const Navbar = () => {
    const [toogle, setToogle] = useState(true)
    const [inputValue, setInputValue] =useState("")
    const history = useNavigate();

    function openSearch(){
        var box = document.getElementById("box")
        if(box.style.display === "none"){
            box.style.display = "block";
        } else{
            box.style.display = "none";
        }
    }

  return (
    <Container.Provider value={{toogle, inputValue}}>
    <Fragment>
        <div id="navheader">
        <nav className={toogle?'' : 'navBarColor'}>

            <div className="nav-options">
       
                <h1 className="reactflix"
                onClick={() => history("/")}
                id={toogle? '' :"heading"}>ReactFlix</h1>
             
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
                <div className="search-box">
                    <div className="input-icon">
                        <HiSearch fontSize={30} id="search-icons" onClick={() => openSearch()} />
                    </div>
                    <div id = "input-box">
                        <input id="box" type="text" placeholder='Search Movies' onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                </div>

                <div id="Color-switcher" onClick={() => setToogle(!toogle)}>
                    <div id={toogle? 'Color-switcher-mover': 'Color-switcher-moved'}></div>
                </div>

                <div className="nav-avatar">
                    <img
                    onClick={() => history("/profile")}
                    className="nav__avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"/>
                </div>
            </div>

        </nav>
        </div>

        <Routes>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/" element={<Movies />}/>
            <Route path='TvShows' element={<TvShows />}/>
            <Route path='Trending' element={<Trending />}/>
            <Route path='MovieInfo' element={<MovieInfo />}/>
        </Routes>
            
    </Fragment>
    </Container.Provider>
  )
}

export default Navbar
