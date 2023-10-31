import React from "react";
import {useRoutes } from "react-router-dom";

import {Login,Home,Community,Events,Maps,Profile,Layout,PageNotFound} from './pages';

import { AuthContext } from "./context/AuthContext";

import './styles.css'

function App() {

  const {isLogin} = React.useContext(AuthContext);


  const AppRoutes = [
    {
      path : '/',
      element : <Layout/>,
      children : [
        {path:'/',element:<Home/> },
        {path:'/community', element:<Community/> },
        {path:'/maps',element:<Maps /> },
        {path:'/events',element:<Events /> },
        {path:'/profile',element:<Profile /> },
      ],
    },
    { path:'*' , element:<PageNotFound/>}
  ]

  const AppPublicRoute = [
    {
      path : '/',
      element:<Login/>
    },
    { path:'*' , element:<PageNotFound/>}
  ]

 const publicRoutes = useRoutes(AppPublicRoute);
 const appRoutes = useRoutes(AppRoutes);

return(
  <>
  {isLogin && appRoutes}
  {!isLogin && publicRoutes}
  </>
)

}

export default App;
