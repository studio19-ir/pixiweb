import React, { useContext } from 'react'
import { Link, Outlet, useLocation,  } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Icon from '@mdi/react';
import { mdiHome,mdiAccountGroup, mdiCompass, mdiCalendarMonth, mdiAccount } from '@mdi/js';

function Layout(props) {

  const {User} = useContext(AuthContext);
  const location = useLocation();

  const Normalize = (str) => {
    
    let path = '';

    if (str === '/') {
      path = 'HOME'
    }else{
      path = str.slice(1).toUpperCase();
      
    }

  return path;
  }

  
  return (
    <div className='layout_main'>
      <div className="mobile_header">
      <div className="logo">Pixi<span className="dot">.</span> </div>
      <div className="route">{Normalize(location.pathname)}</div>
      </div>
      <div className="menubar">
        <div className="logo">Pixi<span className="dot">.</span> </div>
        <div className="profile">
          <div className="image">
            <img src={User.picture} alt="user" width={'70px'} height={'70px'} />
          </div>
          <div className="username">{User.name}</div>
          <div className="email">{User.email}</div>
        </div>
        <ul>
        <li><Icon path={mdiHome} color="white" size={1}  /> <Link to="/">Home</Link></li>
        <li><Icon path={mdiAccountGroup} color="white" size={1}  /><Link to="/community">Community</Link></li>
        <li><Icon path={mdiCompass} color="white" size={1}  /><Link to="/maps">Maps</Link></li>
        <li><Icon path={mdiCalendarMonth} color="white" size={1}  /><Link to="/events">Events</Link></li>
        <li><Icon path={mdiAccount} color="white" size={1}  /><Link to="/profile">Profile</Link></li>


        </ul>
      </div>
      <div className="menubar_mobile">
      <ul>
        <li><Link to="/"><Icon path={mdiHome} color="white" size={2}  /></Link></li>
        <li><Link to="/community"><Icon path={mdiAccountGroup} color="white" size={2}  /></Link></li>
        <li><Link to="/maps"><Icon path={mdiCompass} color="white" size={2}  /></Link></li>
        <li><Link to="/events"><Icon path={mdiCalendarMonth} color="white" size={2}  /></Link></li>
        <li><Link to="/profile"><Icon path={mdiAccount} color="white" size={2}  /></Link></li>


        </ul>
      </div>
      <div className="layout_content">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout