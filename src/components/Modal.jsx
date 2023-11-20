import React, { useContext, useEffect, useState } from 'react'
import { mdiCloseCircleOutline, mdiLoading } from '@mdi/js'
import Icon from '@mdi/react';
import { AuthContext } from '../context/AuthContext';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './Tabs/style.css'




const Modal = ({ setIsOpen, email }) => {


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


  const { getEmailInfo, token } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [MyUser, setMyUser] = useState();
  const [exiting, setExiting] = useState(false)

  const Close = () => {
    setExiting(true);
    setTimeout(() => {
      setIsOpen(false)
    }, 150);
  }

  useEffect(() => {

    async function getData() {

      await getEmailInfo(email, token)
        .then(
          (u) => {
            setMyUser(u.data)
            setIsLoading(false);
          }
        )
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={`modal_darkBG ${!exiting ? '' : 'fadeout'}`}>
      <div className="modal_center">
        <div className={`modal_main ${!exiting ? '' : 'exit'}`}>
          <div className="modal_modalHeader">
            <div className="modal_heading">USER PROFILE</div>
            <div className="modal_closebtn" onClick={() => Close(false)}>
              <Icon path={mdiCloseCircleOutline} size={1} />
            </div>
          </div>
          <div className="modal_modalContent">
            {!isLoading && <>
            <div className='modal_top'>
              <div className="modal_contentTop">
                <div className="modal_topImage">
                  <img alt="" src={MyUser.picture} width={60} height={60} style={{ borderRadius: "60px" }} />
                </div>
                <div className="modal_topData">
                  <div className="dname">{MyUser.username}</div>
                  <div className="demail">{MyUser.email}</div>
                  {MyUser?.isfollower && <div className="dfollow">Follows you</div>}

                </div>
                <div className="modal_topActions">
                  {MyUser?.isfollowing && MyUser?.isfollower && <div className="following">Following</div>}
                  {!MyUser?.isfollowing && MyUser?.isfollower && <div className="follow">Follow Back</div>}
                  {!MyUser?.isfollowing && !MyUser?.isfollower && <div className="following">Follow</div>}

                </div>
              </div>

              <div className="modal_followData">
                <div className="modal_followDataItem">
                  <div>{MyUser.followers}</div>
                  <div>Followers</div>
                </div>
                <div className="modal_followDataItem">
                  <div>{MyUser.followings}</div>
                  <div>Followings</div>
                </div>
                <div className="modal_followDataItem">
                  <div>{MyUser.events.length}</div>
                  <div>Events</div>
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
                <TabPanel><Skills skills={MyUser?.skills} /></TabPanel>
                <TabPanel><Interests interests={MyUser?.interest} /></TabPanel>
              </Tabs>

            </>}
            {isLoading && <Icon path={mdiLoading} size={2} spin />}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal