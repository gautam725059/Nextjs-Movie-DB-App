'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SignIn = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Error clear karo jab user type kare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email zaroori hai'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email daal'
    }

    if (!formData.password) {
      newErrors.password = 'Password zaroori hai'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Aapka backend API call yahin hoga
      console.log('Sign in data:', formData)

      // Demo ke liye - localStorage se user check kar rahe hain
      const savedUser = localStorage.getItem('user')
      
      if (savedUser) {
        const user = JSON.parse(savedUser)
        localStorage.setItem('currentUser', JSON.stringify({
          ...user,
          email: formData.email
        }))
        
        alert('Sign in successful!')
        router.push('/')
      } else {
        setErrors({ submit: 'Email ya password galat hai' })
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setErrors({ submit: 'Sign in mein error aya' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col'>
      <Navbar />

      <div className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          {/* Card */}
          <div className='bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700'>
            
            {/* Header */}
            <div className='mb-8 text-center'>
              <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
              <p className='text-gray-400'>Apne MovieDB account mein login karo</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-5'>
              
              {/* Email */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition'
                  placeholder='example@email.com'
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition'
                  placeholder='enter your password'
                />
                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
              </div>

              {/* Remember Me */}
              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 bg-gray-700 border border-gray-600 rounded cursor-pointer'
                  />
                  <span className='ml-2 text-sm text-gray-400'>save password</span>
                </label>
                <Link href='#' className='text-red-500 hover:text-red-400 text-sm transition'>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Error */}
              {errors.submit && <p className='text-red-500 text-sm text-center bg-red-900 bg-opacity-20 p-2 rounded'>{errors.submit}</p>}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2.5 rounded-lg transition duration-200'
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className='my-6 flex items-center'>
              <div className='flex-1 border-t border-gray-600'></div>
              <p className='px-3 text-gray-400 text-sm'>New to MovieDB?</p>
              <div className='flex-1 border-t border-gray-600'></div>
            </div>

            {/* Sign Up Link */}
            <div className='text-center'>
              <p className='text-gray-300'>
                <Link href='/auth/signup' className='text-red-500 hover:text-red-400 font-semibold transition'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignIn
