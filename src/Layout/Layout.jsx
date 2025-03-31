import React from 'react'

const Layout = ({children}) => {

  return (
    <div className='App'>
      <div className="mobile-container">
        {children}
      </div>
    </div>
  )
}

export default Layout