import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const EmpNotification = () => {
  return (
    <div className='container bg'>
      <div className="container p-3 google-font">
      <h4><FontAwesomeIcon icon={faBell} size="xl" style={{color: "#4e73df",}} /> <b>Notifications</b></h4>
      </div>
    </div>
  )
}

export default EmpNotification
