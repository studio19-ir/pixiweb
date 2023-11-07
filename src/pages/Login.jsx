import React, { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'


function Login() {

  const {Login,GetCountries,setIsLogin} = React.useContext(AuthContext);
  
  const handleSignin = (res) => {
    console.log('resp : ',res)
  }

  useEffect(() => {
    if (typeof window.google.accounts != 'undefined') {

      window.google.accounts.id.initialize({
        // client_id : "179248842120-7kkpjhr66l5i8uf5nqfjn5618il5vdiv.apps.googleusercontent.com",
        client_id : "179248842120-pk01lcml5t0pmq9u5751dauralh6ba8i.apps.googleusercontent.com",
        callback: handleSignin
      })

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignIn'),
        {theme : 'outline', size:'large'}
      )
    }
   }, [])
  

  const getList = () => {
    Login();
  }

  return (
    <div className="main">
      <div style={{color:'white'}}>Pixi.</div>
      <div id="googleSignIn"></div>
      {/* <button onClick={()=>getList()} className='signin'>Sign in by Google+</button> */}
    </div>
  )
}

export default Login