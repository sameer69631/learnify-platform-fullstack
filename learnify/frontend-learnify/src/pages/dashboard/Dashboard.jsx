import React from 'react'
import DashboardNavBar from '../../components/DashboardNavBar'
import SideBar from '../../components/SideBar'

function Dashboard({children}) {
  return (
    <div>
      <DashboardNavBar/>
      <div className='flex'>
        <SideBar/>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default Dashboard