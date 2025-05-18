import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function FeaturesCard({title, description, path}) {
    const navigete = useNavigate()
  return (
    <div className='text-center p-8 rounded-lg shadow-xl max-w-sm hover:scale-105 transition-transform transform'>
        <h2 className='text-xl m-1'>{title}</h2>
        <p className='p-2'>{description}</p>
        <button className='text-green-600 mt-2 text-xl hover:text-green-700' onClick={()=>navigete(path)}>Learn More</button>
    </div>
  )
}

export default FeaturesCard