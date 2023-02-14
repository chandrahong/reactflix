
import Login from "./Login/Login"
import Navbar from "./components/Navbar"
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout, SelectUser} from "./features/userSlice"
import { getAuth } from "firebase/auth" ;

function App() {
  const user = useSelector(SelectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = getAuth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Logged in
        console.log(userAuth);
        dispatch(login({
          uid : userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="App">
        {!user ? (
          <Login />
        ) : (
            <Navbar />
        )}
    </div>
      )
}

export default App;
