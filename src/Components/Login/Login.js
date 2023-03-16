import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import Loading from '../Loading/Loading';
import './Login.css';

function Login() {
  const history = useHistory();
  const [loading,setLoading] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {firebase} = useContext(FirebaseContext)

  const handleLogin = (e)=>{
    e.preventDefault();
    setLoading(true);

    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      setLoading(false);
      history.push("/");
    }).catch((error)=>{
      setLoading(false);
      if(error.code==='auth/too-many-requests'){
        toast.error(error.message);
      }else{
        toast.error("Invalid Username or Password",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const moveToSignUp = (e)=>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/signup');
    }, 1000);
  }


  return (
    <div>
      {loading ? <Loading/> : ""}
      <img src='../../../Images/olx-login-bg.jpg' alt='Background' className='login-bg'></img>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Img'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <span className='password-section'>
            <label htmlFor="lname">Password</label>
            <i>{<FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} style={{cursor:"pointer"}}/>}</i>
          </span>
          <br />
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' onClick={moveToSignUp}>Create an Account : SignUp</Link>
      </div>
      {<ToastContainer/>}
    </div>
  );
}

export default Login;
