import React, { useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import Loading from '../Loading/Loading';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const [loading,setLoading] = useState(false)
  const history = useHistory();

  const handleLogout = (e)=>{
    e.preventDefault();
    setLoading(true);
    firebase.auth().signOut().then(()=>{
      setTimeout(() => {
        setLoading(false);
        history.push('/login')
      }, 2000);
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

  const moveToHome = (e)=>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/');
    }, 1000);
  }

  const moveToCreate = (e)=>{
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/create')
    }, 1000);
  }

  return (
    <div className="headerParentDiv">
    {loading ? <Loading/> : ""}
      <div className="headerChildDiv">
        <div className="brandName">
          {/* <OlxLogo></OlxLogo> */}
          <Link to='/' onClick={moveToHome}><OlxLogo></OlxLogo></Link>
        </div>
        {/* <div className="placeSearch"> */}
          {/* <Search></Search> */}
          {/* <input type="text" /> */}
          <div>
          <select type='text' className="placeSearch">
              <option value="">Are you looking for something?</option>
              <option value="">Vehicle</option>
              <option value="">Furniture</option>
              <option value="">Mobiles</option>
              <option value="">Kitchen Appliances</option>
              <option value="">Others</option>
            </select>
          </div>
          {/* <Arrow></Arrow> */}
        {/* </div> */}
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Hi ${user.displayName}` : <Link to='/login' onClick={moveToLogin} className='login-logout'>Login</Link>}</span>
          <hr />
        </div>

        {user && <span onClick={handleLogout} className='login-logout'>Logout</span>}
        <div className="sellMenu" onClick={moveToCreate}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
