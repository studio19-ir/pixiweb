import React, { useEffect, useState } from 'react'
import {  mdiCloseCircleOutline, mdiLoading } from '@mdi/js'
import Icon from '@mdi/react';

const Modal = ({setIsOpen,username}) => {

    const userList = [
        {
          name:'Hamed Ghavami',
          email:'hamed@gmail.com',
          follow:true,
          following:true,
          pic:'https://lh3.googleusercontent.com/a/ACg8ocKUp0la8F-AZm5RJwzNtLC3-C069a8k2k-fIXcgY3_g=s96-c'
        },
        {
            name:'Ali Ghavam',
            email:'ali@gmail.com',
            follow:false,
            following:false,
          pic:'https://lh3.googleusercontent.com/a/ACg8ocLDGpLkGlPdlxA9mmCEUKjIWTMOuN0cNfF_LdkpTk0E7nI=s96-c'
        }
      ]

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
        const foundUser = userList.filter((n) => (n.name == username));
        setMyUser(foundUser[0]);
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }, [])
    
  return (
    <div className={`modal_darkBG ${!exiting ? '':'fadeout'}`}>
        <div className="modal_center">
          <div className={`modal_main ${!exiting ? '':'exit'}`}>
            <div className="modal_modalHeader">
             <div className="modal_heading">USER PROFILE</div>
             <div className="modal_closebtn" onClick={()=>Close(false)}>
                <Icon path={mdiCloseCircleOutline} size={1}/>
             </div>
            </div>
             <div className="modal_modalContent">
                {!isLoading &&
                <div className="modal_contentTop">
                    <div className="modal_topImage">
                        <img src={MyUser.pic} width={'40px'} height={'40px'} style={{borderRadius:"40px"}}/>
                    </div>
                    <div className="modal_topData">
                        <div className="dname">{MyUser.name}</div>
                        <div className="demail">{MyUser.email}</div>
                        {MyUser?.follow && <div className="dfollow">Follows you</div>}
                        <div className="modal_followData">
                            <div className="modal_followDataItem">
                                <div>1</div>
                                <div>Followers</div>
                            </div>
                            <div className="modal_followDataItem">
                                <div>1</div>
                                <div>Followings</div>
                            </div>
                            <div className="modal_followDataItem">
                                <div>0</div>
                                <div>Events</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal_topActions">
                    {MyUser?.following && <div className="following">Following</div>}
                    {!MyUser?.following && <div className="follow">Follow</div>}
                    </div>
                </div>
                }
                {isLoading && <Icon path={mdiLoading} size={2} spin/>}
                
             </div>
          </div>
        </div>
    </div>
  )
}

export default Modal