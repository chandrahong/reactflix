import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import { SelectUser } from '../features/userSlice';
import { auth } from '../firebase'
import "../Styles/ProfileScreen.css"
import {Container} from "../components/Navbar"

const Profile = () => {
    const {toogle} = useContext(Container);
    const user = useSelector(SelectUser);
  return (
    <div className={toogle?'profileScreen' : "secondColor"}>
        <div className="profileScreen__body">
            <h1 id={toogle ? "" : "secondaryColor"}>Edit Profile</h1>

            <div className="profileScreen__info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt=""/>
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <button 
                        onClick={()=> auth.signOut()}
                        className="profileScreen__signOut">
                    Sign Out</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
