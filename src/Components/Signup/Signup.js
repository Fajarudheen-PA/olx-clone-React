import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading'
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [loading,setLoading] = useState(false)
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {firebase} = useContext(FirebaseContext)

  const validateInputs = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[0-9]+$/.test(phone)) {
      errors.phone = 'Phone should contain only numbers';
    } else if (phone.length !== 10) {
      errors.phone = 'Phone should be 10 digits long';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    }

    return errors;
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName: username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          history.push("/login")
        })
      })
    })
  }

  const moveToLogin = (e)=>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/login');
    }, 1000);
  }

  return (
    <div>
      {loading ? <Loading/> : ""}
      <img src='../../../Images/olx-bg-new.jpg' alt='Background' className='signup-bg'></img>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='img'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname" className='label'>Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <br />
          <label htmlFor="fname" className='label'>Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <br />
          <label htmlFor="lname" className='label'>Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
          <br />
          <label htmlFor="lname" className='label'>Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link to="/login" onClick={moveToLogin}>Already have an account? Login</Link>
      </div>
    </div>
  );
}
