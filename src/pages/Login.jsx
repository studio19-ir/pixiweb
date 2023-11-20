import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import ProfileComplete from './ProfileComplete';


function Login() {

  const {Login,isLoading,isProfileCompleted,User} = React.useContext(AuthContext);
  
if (!isLoading && !isProfileCompleted && User) {
  return(
    <ProfileComplete/>
  )
}

  return (
    <div className="main">
      <div style={{color:'white'}}>Pixi.</div>
      {isLoading && <Icon path={mdiLoading} size={2} spin color={'white'}/> }
      {!isLoading && <button onClick={()=>Login()} className='signin'>Sign in by Google+</button>}
    </div>
  )
}

export default Login