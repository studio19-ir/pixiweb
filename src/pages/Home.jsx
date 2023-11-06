import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Modal from '../components/Modal';

function Home() {
    const {User} = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

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
    const [Email, setEmail] = useState('')
    
    const openModal = (email) => {
      setEmail(email);
      setIsOpen(true);
    }

  return (
  <div className="home_main">
    <div className="home_recent">
      <div className="title">RECENT USERS</div>
      <div className="home_recent_list">
        {userList.map((item,index) => {
          return(
            <div className='home_recent_item' onClick={()=>openModal(item.name)} key={index}>
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
      <div className="images">
        <div>
          <img src="/assets/rest.jpg" width={200} height={200}>
            </img>
          <div className='desc'>Reyhan Resturant</div>
        </div>
      </div>

    </div>
    {isOpen && <Modal setIsOpen={setIsOpen} username={Email}  />}
  </div>
  )
}

export default Home