import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Icon from '@mdi/react'
import { mdiCogOutline, mdiLogout } from '@mdi/js'
import { useNavigate } from 'react-router-dom'


function Profile() {

   const {User,LogOut} = useContext(AuthContext)
   const navigate = useNavigate();

   
  const About = () => {
    return (
      <div className="about_main">
        Biography
      </div>
    )
  }

  const Skills = ({skills}) => {
    return(
      <div className='skills_main'>
        {skills.map((item,index) =>(
          <div className='skills_item' key={index}>
            {item}
            </div>
        ))}
      </div>
    )
  }

  const Interests = ({interests}) => {
    return(
      <div className='interest_main'>
      {interests.map((item,index) =>(
        <div className='interest_item' key={index}>
          {item}
          </div>
      ))}
    </div>
    )
  }

  const doLogOut = () => {
    LogOut();
    navigate('/')
  }

  return (
    <div className="profile_main">
      <div className="profile_top">
        <div className="profile_info">
          <div>
            <img alt="user_img" src={User.picture} width={60} height={60}/>
          </div>
          <div className="profile_data">
            <div><img alt="user_county" src={User.flag} width={20} height={20} />{User.username}</div>
            
            <div>{User.email}</div>
            
          </div>
          <div className="profile_actions">
            <div>
              <Icon path={mdiCogOutline} size={1} color="white" />
              <span>Settings</span>
            </div>
            <div onClick={()=>doLogOut()}>
              <Icon path={mdiLogout} size={1} color="#FA6849" />
              <span>Logout</span>
            </div>
          </div>
        </div>
        <div className="profile_followData">
          <div className="profile_followDataItem">
            <div>{User.followers}</div>
            <div>Followers</div>
          </div>
          <div className="profile_followDataItem">
            <div>{User.followings}</div>
            <div>Followings</div>
          </div>
        </div>
      </div>

      <Tabs defaultFocus>
                <TabList>
                  <Tab>ABOUT</Tab>
                  <Tab>SKILLS</Tab>
                  <Tab>INTERESTS</Tab>
                </TabList>
                <TabPanel>
                  <About />
                </TabPanel>
                <TabPanel><Skills skills={User.skills} /></TabPanel>
                <TabPanel><Interests interests={User.interest} /></TabPanel>
              </Tabs>
    </div>
  )
}

export default Profile