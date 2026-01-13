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
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex flex-col relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000'></div>

      <Navbar />

      <div className='flex-1 flex items-center justify-center px-4 py-12 relative z-10'>
        <div className='w-full max-w-md'>
          {/* Card */}
          <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-600 border-opacity-30 backdrop-blur-md hover:border-opacity-50 transition-all duration-300'>
            
            {/* Header */}
            <div className='mb-8 text-center'>
              <div className='inline-block mb-4 p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full'>
                <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                </svg>
              </div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent mb-3'>Welcome Back</h1>
              <p className='text-gray-400 text-sm'>Apne MovieDB account mein login karo aur movies dekho</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              
              {/* Email */}
              <div className='group'>
                <label htmlFor='email' className='block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-red-400 transition'>
                  Email Address
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300 backdrop-blur-sm'
                    placeholder='example@email.com'
                  />
                  <svg className='absolute right-3 top-3 w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </div>
                {errors.email && <p className='text-red-400 text-sm mt-2 font-medium'>{errors.email}</p>}
              </div>

              {/* Password */}
              <div className='group'>
                <label htmlFor='password' className='block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-red-400 transition'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300 backdrop-blur-sm'
                    placeholder='Apna password daal'
                  />
                  <svg className='absolute right-3 top-3 w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                  </svg>
                </div>
                {errors.password && <p className='text-red-400 text-sm mt-2 font-medium'>{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between pt-2'>
                <label className='flex items-center cursor-pointer group'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 bg-gray-700 border-2 border-gray-600 rounded cursor-pointer group-hover:border-red-600 transition'
                  />
                  <span className='ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition'>Remember me</span>
                </label>
                <Link href='#' className='text-red-500 hover:text-red-400 text-sm font-medium transition hover:underline'>
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className='bg-red-600 bg-opacity-20 border-l-4 border-red-600 p-3 rounded text-red-400 text-sm font-medium'>
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-600/50 relative overflow-hidden group disabled:cursor-not-allowed'
              >
                <span className='relative z-10 flex items-center justify-center'>
                  {loading ? (
                    <>
                      <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500'></div>
              </button>
            </form>

            {/* Divider */}
            <div className='my-8 flex items-center'>
              <div className='flex-1 border-t border-gray-700'></div>
              <p className='px-3 text-gray-500 text-sm font-medium'>New to MovieDB?</p>
              <div className='flex-1 border-t border-gray-700'></div>
            </div>

            {/* Sign Up Link */}
            <div className='text-center'>
              <p className='text-gray-400'>
                <Link href='/auth/signup' className='text-red-500 hover:text-red-400 font-bold transition hover:underline'>
                  Create a new account
                </Link>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className='text-center text-gray-500 text-xs mt-6'>
            By signing in, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignIn
