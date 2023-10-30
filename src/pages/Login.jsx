import React from 'react'
import { AuthContext } from '../context/AuthContext'


function Login() {

  const {Login,GetCountries,setIsLogin} = React.useContext(AuthContext);

  const getList = () => {

    Login();
    // setIsLogin(true);
    // GetCountries()
    // .then((res) => {
    //   console.log(res.data)
    // })
  }

  return (
    <div className="main">
      <div style={{color:'white'}}>Pixi.</div>
      <button onClick={()=>getList()} className='signin'>Sign in by Google+</button>
    </div>
  )
}

export default Login