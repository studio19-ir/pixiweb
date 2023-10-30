import axios from "axios";
import React, { useEffect } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [User, setUser] = React.useState();
  const [isLogin, setIsLogin] = React.useState(false);

  const Login = () => {
      setUser({ id: 1, name: "Saeed Poureshghi", picture:"https://lh3.googleusercontent.com/a/ACg8ocJuG5brZkcbmMV6t5KPfCVKXY-2H6idAdEhuDl0_HEXHtA=s96-c" , email: "saeed.po@gmail.com" });
      setIsLogin(true);
  }

  const GetCountries = async () => {
    return await axios.get('http://localhost/api/country/active',{withCredentials:true})
  }
//   useEffect(() => {
//     if (!isLogin) {
//       setUser({ id: 1, name: "Test" });
//       setIsLogin(true);
//     }
//   }, [isLogin]);


  return (
    <AuthContext.Provider value={{ User, isLogin ,Login,GetCountries,setIsLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
