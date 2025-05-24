import React from 'react'
import DashboardNavBar from '../../components/DashboardNavBar'
import SideBar from '../../components/SideBar'

function Dashboard({children}) {
  return (
    <div className='bg-green-50'>
      <div className='max-w-screen-xl mx-auto sticky top-0 z-50'>
        <DashboardNavBar/>
      </div>
      <div className='md:flex'>
        <SideBar/>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default Dashboard