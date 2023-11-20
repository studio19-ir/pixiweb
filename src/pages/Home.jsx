import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Modal from '../components/Modal';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

function Home() {
    
  const {token,getRecentUsers,User,RecentUsers,setRecentUsers} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [Email, setEmail] = useState('')
  const openModal = (email) => {
      setEmail(email);
      setIsOpen(true);
    }

    useEffect(() => {
    
     function getRecent() {
        getRecentUsers(token)
        .then(
          (recent) => setRecentUsers(recent.data.result)
          )
      }
      if ( RecentUsers.length === 0){
        getRecent();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
      <div className="home_main">
    <div className="home_recent">
      <div className="title">RECENT USERS</div>
      <div className="home_recent_list">
        {!(RecentUsers?.length > 0) && <Icon path={mdiLoading} spin size={2}/>}
        {
        // eslint-disable-next-line
        (RecentUsers.length > 0) && RecentUsers.map((item,index) => {
          if (item.email !== User.email){
            
            return(
              <div className='home_recent_item' onClick={()=>openModal(item.email)} key={index}>
              <div>
              <img alt="user_image" src={item.picture} width={'50px'} height={'50px'} style={{borderRadius:'50px'}}/>
              </div>
              <div className='name'>
                {item.username}
              </div>
              </div>
          )
        }
        })}
      </div>
    </div>
    <div className="suggest">
      <div className="title">SUGGESTION FOR YOU</div>
      <div className="images">
        <div>
          <img alt="" src="/assets/rest.jpg" width={200} height={200}>
            </img>
          <div className='desc'>Reyhan Resturant</div>
        </div>
      </div>

    </div>
    {isOpen && <Modal setIsOpen={setIsOpen} email={Email}  />}
  </div>
  )
}

export default Home