import React, { useState } from 'react'
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import EventModal from '../components/EventModal';

const  Events = () => {

  const [isOpen, setIsOpen] = useState(false)
  const Email = 'Saeed.po@gmail.com'

  const openModal = (email) => {
    
    setIsOpen(true);
  }


  return (
    <div className="event_main">
    <div>Events</div>
    <div className="FAB" onClick={()=>openModal()}>
    <Icon path={mdiPlus} color="white" size={1}  /> 
    </div>
    {isOpen && <EventModal setIsOpen={setIsOpen} username={Email}  />}
    </div>
  )
}

export default Events