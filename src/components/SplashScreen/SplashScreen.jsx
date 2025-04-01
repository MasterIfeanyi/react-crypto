import "./SplashScreen.css"
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
                navigate('/coin')
            }, 700)

        }, 2000)

        return () => clearTimeout(timer)
    }, [navigate])





  return (
    <div className={`splash-screen ${visible ? 'visible' : 'hidden'}`}>
      <div className="splash_logo-container">
        <div className="d-flex align-items-center justify-content-center">
          <img src="./Bitcoin.png" alt="logo" className='splash-logo me-1' />
        </div>
        <p className='fw-bold fs-2 h5 mb-0'>CoinsNest</p>
      </div>
    </div>
  )
}

export default SplashScreen