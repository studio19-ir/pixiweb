import React from 'react'
import { AuthContext } from '../context/AuthContext'

function Home() {
    const {User} = React.useContext(AuthContext);

    const userList = [
      {
        name:'Hamed Ghavami',
        pic:'https://lh3.googleusercontent.com/a/ACg8ocKUp0la8F-AZm5RJwzNtLC3-C069a8k2k-fIXcgY3_g=s96-c'
      },
      {
        name:'Ali Ghavam',
        pic:'https://lh3.googleusercontent.com/a/ACg8ocLDGpLkGlPdlxA9mmCEUKjIWTMOuN0cNfF_LdkpTk0E7nI=s96-c'
      }
    ]

  return (
  <div className="home_main">
    <div className="home_recent">
      <div className="title">RECENT USERS</div>
      <div className="home_recent_list">
        {userList.map((item,index) => {
          return(
            <div className='home_recent_item' key={index}>
              <div>
              <img src={item.pic} width={'50px'} height={'50px'} style={{borderRadius:'50px'}}/>
              </div>
              <div className='name'>
                {item.name}
              </div>
              </div>
          )
        })}
      </div>
    </div>
    <div className="suggest">
      <div className="title">SUGGESTION FOR YOU</div>

    </div>
  </div>
  )
}

export default Home