import React, { useState } from 'react'
import '../styles/Auth.css'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

function Auth({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  const handleSwitchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login')
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-section">
          <div className="auth-branding">
            <h1>✨ Vibe Commerce</h1>
            <p>Discover your favorite products</p>
          </div>

          {authMode === 'login' ? (
            <>
              <LoginForm onSuccess={onAuthSuccess} />
              <div className="auth-switch">
                <p>Don't have an account?</p>
                <button 
                  className="switch-btn"
                  onClick={handleSwitchMode}
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              <SignupForm onSuccess={onAuthSuccess} />
              <div className="auth-switch">
                <p>Already have an account?</p>
                <button 
                  className="switch-btn"
                  onClick={handleSwitchMode}
                >
                  Log In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
