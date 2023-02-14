import React, { useState, useRef } from 'react'
import SignUp from './SignUp'
import '../Styles/LoginScreen.css'
import { Link } from 'react-router-dom';

function Login() {
  const emailRef = useRef(null);
  const[signIn, setSignIn] = useState(false);

  return(
    <div className="loginScreen">
        <div className="loginScreen__background">
            {!signIn ? (<button
            onClick={()=> setSignIn(true)}
            className="loginScreen__button">Sign in</button>): null}


            <div className="loginScreen__gradient">
              <h1 onClick={()=> setSignIn(false)}> Reactflix </h1>
              <div className="loginScreen__head">
              {signIn ? ( 
                <div className="database">
                  <h2>Firebase-database User</h2>
                  <h3>email: chandra@gmail.com</h3>
                  <h3>password: 123456</h3>
                </div>):(null)}

        </div>
            </div>

        </div>

        <div className="loginScreen__body">
          {signIn ? (<SignUp email={emailRef.current.value}/>) : (
            <>
              <h1>Unlimited films, TV programmes and more.</h1>
              <h2>Watch anywhere, cancel at any time.</h2>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

              <div className="loginScreen__input">
                <form>
                  <input type="email" ref={emailRef} placeholder="Email Address"/>
                  <button className="loginScreen__getStarted" onClick={() => setSignIn(true)}>Get Started </button>
                </form>
              </div>
            </>
          )}
        </div>
    </div>
  );
}

export default Login
