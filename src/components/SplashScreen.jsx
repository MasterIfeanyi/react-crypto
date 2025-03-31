import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SplashScreen = () => {

    const navigate = useNavigate()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Redirect to main screen after 3 seconds
    const timer = setTimeout(() => {
        // this will set the visibility of the splash screen to false after 2 seconds
        setVisible(false)

        // this will navigate to the welcome screen after the transition
        setTimeout(() => {
            navigate('/welcome')
          }, 700)

    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])





  return (
    <div>SplashScreen</div>
  )
}

export default SplashScreen