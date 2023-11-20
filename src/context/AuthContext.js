import { useGoogleLogin,googleLogout } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect } from "react";

export const AuthContext = React.createContext();

const LOGIN_URL = "https://pixilin.social/api/user/login";
const USER_INFO_URL = "https://pixilin.social/api/user/info";
const RECENT_USER_URL = "https://pixilin.social/api/user/recent";
const EMAIL_INFO_URL = "https://pixilin.social/api/user/email";
const ACTIVE_COUNTRIES_URL = "https://pixilin.social/api/country/active";

// set redirect_url to https://pixilin.social for production and http://localhost:3000 for development
// get NODE build mode
const mode = process.env.NODE_ENV;
let redirect_url = (mode === "development") ? "http://127.0.0.1:3000" : "https://app.pixilin.social";




const AuthProvider = ({ children }) => {
  const [User, setUser] = React.useState();
  const [token, setToken] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = React.useState(false);
  const [countryList,setCountryList] = React.useState([]);

  // cached Data
  const [RecentUsers, setRecentUsers] = React.useState([]);

  const Initialize = () => {
    const _token = localStorage.getItem("token");
    if (_token) {
      setIsLoading(true);
      setToken(_token);
      const user = getUserInfo(_token);
      user.then((u) => {
        if (u.data.success) {
          if (u.data.country) {
            setIsProfileCompleted(true);
            setUser(u.data);
            setIsLogin(true);
            setIsLoading(false);
          }else{
            setUser(u.data);
            setIsLoading(false);
          }
        }else{
          localStorage.removeItem("token");
          setIsLogin(false);
          setIsLoading(false);
          setIsProfileCompleted(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }

  const getCountries = async () => {
    await axios.get(ACTIVE_COUNTRIES_URL)
    .then(
      (resp) => {
          setCountryList(resp.data.country)
      }
      )
  }
  useEffect(() => {
    getCountries();
    Initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAuthHeader = (_token) => {
    return { authorization: `bearer ${_token}` };
  };
  const getUserInfo = async (_token) => {
    const headers = setAuthHeader(_token);

    return await axios.post(USER_INFO_URL, "", { headers });
  };

  const getEmailInfo = async (email,_token) => {
    const headers = setAuthHeader(_token);
    return axios.post(EMAIL_INFO_URL,{email},{headers})
  }

  const getRecentUsers = async (_token) => {
    const headers = setAuthHeader(_token);
    return await axios.post(RECENT_USER_URL, "", { headers });
  };

  const LogOut = () => {
    googleLogout();
    localStorage.removeItem('token');
    setIsLoading(true);
    setIsLogin(false);
    Initialize();
  }

  const Login = useGoogleLogin({
    onSuccess: async (resp) => {
      
      await axios
        .post(LOGIN_URL, { authCode: resp.code })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            const _token = response.data.token
            localStorage.setItem("token", _token);
            setToken(_token);
            const user = getUserInfo(_token);
            user.then((resp) => {
              if (resp.data.country) {
                setIsLoading(false);
                setUser(resp.data);
                setIsLogin(true);

              }else{
                setIsLoading(false);
                setUser(resp.data);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    redirect_uri: redirect_url,
    flow: "auth-code",
  });


  return (
    <AuthContext.Provider
      value={{
        User,
        isLogin,
        Login,
        setIsLogin,
        token,
        getRecentUsers,
        countryList,
        isLoading,
        setIsLoading,
        getEmailInfo,
        RecentUsers,
        setRecentUsers,
        LogOut,
        isProfileCompleted,
        setIsProfileCompleted
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
