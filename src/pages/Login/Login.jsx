import React from 'react'
import '../Login/login.css'

function Login() {

    const handleGoogleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self")
    }
  return (
    <div className='container'>
      <div className='login-div'>
        <div className='button-div'>
          <div>
          <h2>Hey Canine!!! </h2>
          </div>
          <div>
          <button className='googlelogin' onClick={handleGoogleAuth}>Sign In With Google</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login