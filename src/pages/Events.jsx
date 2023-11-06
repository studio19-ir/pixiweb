import React from 'react'
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

function Events() {
  return (
    <div className="event_main">
    <div>Events</div>
    <div className="FAB">
    <Icon path={mdiPlus} color="white" size={1}  /> 
    </div>
    </div>
  )
}

export default Events