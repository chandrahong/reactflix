import React, {Fragment, useState } from 'react'
import {HiSearch} from 'react-icons/hi'
import {NavLink, useNavigate} from 'react-router-dom'
import {Routes, Route} from "react-router"
import Movies from './Movies'
import TvShows from './TvShows'
import Trending from './Trends'
import MovieInfo from './MovieInfo'
import Profile from '../Login/Profile'
import '../Styles/NavBarStyles.css'
import {FaBars , FaTimes} from 'react-icons/fa'



export const Container = React.createContext()

const Navbar = () => {
    const [toogle, setToogle] = useState(true)
    const [inputValue, setInputValue] =useState("")
    const [bar, setBar] = useState(false);
    const history = useNavigate();

    function openSearch(){
        var box = document.getElementById("box")
        if(box.style.display === "none"){
            box.style.display = "block";
        } else{
            box.style.display = "none";
        }
    }

    function handleClick(){
        setBar(!bar)
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

                <div className={bar ? "nav-menu active" : "nav-menu"}>
                    <div className="mobile-search">
                        <input id="mobile-box" type="text" placeholder='Search Movies' onChange={(e) => setInputValue(e.target.value)} />
                   </div>

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
                    alt="" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"/>
                </div>

                <div classname="nav-icons" onClick={() => handleClick()}>
                    {bar ? <FaTimes className="bars-icon"/> : <FaBars className="bars-icon"/>}
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
