import SideBar from '../../components/SideBar'
import Nav from '../../components/Nav'

function Dashboard({children}) {
  return (
    <div className='bg-green-50'>
      <div className='max-w-screen-xl mx-auto sticky top-0 z-50'>
        <Nav/>
      </div>
      <div className='md:flex'>
        <SideBar/>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default Dashboard