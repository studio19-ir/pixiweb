/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {  mdiCloseCircleOutline, mdiLoading } from '@mdi/js'
import Icon from '@mdi/react';

const EventModal = ({setIsOpen,username}) => {



    const [isLoading, setIsLoading] = useState(false)
    const [MyUser, setMyUser] = useState();
    const [exiting, setExiting] = useState(false)

    const Close = () => {
        setExiting(true);
        setTimeout(() => {
            setIsOpen(false)
        }, 150);
    }

 
    
  return (
    <div className={`modal_darkBG ${!exiting ? '':'fadeout'}`}>
        <div className="modal_center">
          <div className={`modal_main ${!exiting ? '':'exit'}`}>
            <div className="modal_modalHeader">
             <div className="modal_heading">NEW EVENT</div>
             <div className="modal_closebtn" onClick={()=>Close(false)}>
                <Icon path={mdiCloseCircleOutline} size={1}/>
             </div>
            </div>
             <div className="modal_modalContent">
                {!isLoading &&
                <div className="modal_contentTop">
                    
                    
                    <div className="modal_topActions">
                  <div>Name</div>
                    </div>
                </div>
                }
                {/* {isLoading && <Icon path={mdiLoading} size={2} spin/>} */}
                
             </div>
          </div>
        </div>
    </div>
  )
}

export default EventModal