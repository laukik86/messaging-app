// src/components/AuthForm.jsx
import React, { useState } from 'react'

function AuthForm() {
  const [activeTab, setActiveTab] = useState('login')
  const [formData, setFormData] = useState({
    login: { email: '', password: '' },
    signup: { name: '', email: '', password: '', confirmPassword: '' }
  })
  const [errors, setErrors] = useState({
    login: { email: '', password: '' },
    signup: { name: '', email: '', password: '', confirmPassword: '' }
  })

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleInputChange = (formType, field, value) => {
    setFormData({
      ...formData,
      [formType]: {
        ...formData[formType],
        [field]: value
      }
    })
    
    // Clear error when typing
    if (errors[formType][field]) {
      setErrors({
        ...errors,
        [formType]: {
          ...errors[formType],
          [field]: ''
        }
      })
    }
  }

  const validateForm = (formType) => {
    const newErrors = { ...errors }
    let isValid = true

    if (formType === 'login') {
      // Validate email
      if (!formData.login.email) {
        newErrors.login.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.login.email)) {
        newErrors.login.email = 'Please enter a valid email'
        isValid = false
      }

      // Validate password
      if (!formData.login.password) {
        newErrors.login.password = 'Password is required'
        isValid = false
      } else if (formData.login.password.length < 6) {
        newErrors.login.password = 'Password must be at least 6 characters'
        isValid = false
      }
    } else {
      // Validate name
      if (!formData.signup.name) {
        newErrors.signup.name = 'Full name is required'
        isValid = false
      }

      // Validate email
      if (!formData.signup.email) {
        newErrors.signup.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.signup.email)) {
        newErrors.signup.email = 'Please enter a valid email'
        isValid = false
      }

      // Validate password
      if (!formData.signup.password) {
        newErrors.signup.password = 'Password is required'
        isValid = false
      } else if (formData.signup.password.length < 6) {
        newErrors.signup.password = 'Password must be at least 6 characters'
        isValid = false
      }

      // Validate confirm password
      if (formData.signup.password !== formData.signup.confirmPassword) {
        newErrors.signup.confirmPassword = 'Passwords do not match'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e, formType) => {
    e.preventDefault()
    
    if (validateForm(formType)) {
      // Submit form data to backend
      console.log(`${formType} form submitted:`, formData[formType])
      
      // Here you would typically make an API call
      // Example:
      // if (formType === 'login') {
      //   loginUser(formData.login)
      // } else {
      //   registerUser(formData.signup)
      // }
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          <button
            type="button"
            className={`w-1/2 py-4 text-center font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'login'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
            }`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`w-1/2 py-4 text-center font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === 'signup'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
            }`}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="px-8 py-6">
          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={(e) => handleSubmit(e, 'login')}>
              <div className="mb-4">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.login.email}
                  onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                />
                {errors.login.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.login.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.login.password}
                  onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                />
                {errors.login.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.login.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={(e) => handleSubmit(e, 'signup')}>
              <div className="mb-4">
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.signup.name}
                  onChange={(e) => handleInputChange('signup', 'name', e.target.value)}
                />
                {errors.signup.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.signup.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.signup.email}
                  onChange={(e) => handleInputChange('signup', 'email', e.target.value)}
                />
                {errors.signup.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.signup.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.signup.password}
                  onChange={(e) => handleInputChange('signup', 'password', e.target.value)}
                />
                {errors.signup.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.signup.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.signup.confirmPassword}
                  onChange={(e) => handleInputChange('signup', 'confirmPassword', e.target.value)}
                />
                {errors.signup.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.signup.confirmPassword}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm