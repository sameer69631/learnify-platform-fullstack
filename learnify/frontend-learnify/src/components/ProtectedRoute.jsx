import React from 'react'
import useUserStore from '../store/userStore'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute(props) {
  const {children} = props
  const user = useUserStore() //store using zustand
  const location = useLocation()

  if(!user){
    return <Navigate to={`/signin?redirect:${location.pathname}`}/>
  }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute