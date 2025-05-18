import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes/userRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="mx-auto max-w-screen3xl">
      <Toaster position='top-center' />
      <BrowserRouter>
        <Routes>
          {routes.map((route)=>(
            <Route key={route.path} path={route.path} element={<RouteElement route={route}/>}/>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const RouteElement = ({route})=>{
  return route.isProtected ? (
    <ProtectedRoute>{route.element}</ProtectedRoute>
  ) : (
    <>{route.element}</>
  )
}

export default App