import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/userRoute'
import ProtectedRoute from './components/ProtectedRoute'
import AxiosInstances from './apiManager'
import {Spin} from 'antd'

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false)
  useEffect(() => {
    const initialServerCheck = async () => {
      const response = await AxiosInstances.get("/")
      if(response.data.message){
        setIsBackendReady(true)
      }
    }
    initialServerCheck()
  }, [])

  if(!isBackendReady){
    return (
      <div className='h-screen flex justify-center items-center shadow-xl rounded-xl'>
        <Spin size="large"><p className='text-4xl'>Loading the server...</p></Spin>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen3xl">
      <Toaster position='top-center' />
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<RouteElement route={route} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const RouteElement = ({ route }) => {
  return route.isProtected ? (
    <ProtectedRoute>{route.element}</ProtectedRoute>
  ) : (
    <>{route.element}</>
  )
}

export default App