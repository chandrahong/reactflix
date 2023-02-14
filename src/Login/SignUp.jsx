import React, { useRef} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from  "firebase/auth";
import { auth }  from '../firebase'
import "../Styles/SignUpScreen.css"

const SignUp = (email) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    console.log(email);
  const register = (e) =>{
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser);
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const signIn = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,
      emailRef.current.value,
      passwordRef.current.value
      ).then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
      <div className="signupScreen">
        <form>
          <h1><span>Sign In</span></h1>
          <input value={email ? email.email : null} ref={emailRef} placeholder="email" type="email" />
          <input ref={passwordRef} placeholder="password" type="password"/> 
          <button type="submit" onClick={signIn}>Sign In</button>

          <h4> 
            <span className="signupScreen__gray">New to Reactflix? </span> 
            <span className="signupScreen__link" onClick={register}>Sign Up Now.</span>
            </h4>
        </form>
      </div>
  )
}

export default SignUp
