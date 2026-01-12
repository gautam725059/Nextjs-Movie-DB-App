'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name zaroori hai'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email zaroori hai'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email daal'
    }

    if (!formData.password) {
      newErrors.password = 'Password zaroori hai'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password 6 characters se zyada hona chahiye'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords match nahi kar rahe'
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
      console.log('Sign up data:', formData)
      
      // Demo ke liye - localStorage mein save kar rahe hain
      localStorage.setItem('user', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email
      }))

      // Success message ke sath redirect
      alert('Sign up successful! Ab sign in kar')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Sign up error:', error)
      setErrors({ submit: 'Sign up mein error aya' })
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
              <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
              <p className='text-gray-400'>MovieDB par join karo aur favorite movies dekho</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-5'>
              
              {/* Full Name */}
              <div>
                <label htmlFor='fullName' className='block text-sm font-medium text-gray-300 mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition'
                  placeholder='Aapka naam'
                />
                {errors.fullName && <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>}
              </div>

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
                  placeholder='Min 6 characters'
                />
                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300 mb-2'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition'
                  placeholder='Password confirm karo'
                />
                {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}
              </div>

              {/* Submit Error */}
              {errors.submit && <p className='text-red-500 text-sm text-center bg-red-900 bg-opacity-20 p-2 rounded'>{errors.submit}</p>}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2.5 rounded-lg transition duration-200'
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className='my-6 flex items-center'>
              <div className='flex-1 border-t border-gray-600'></div>
              <p className='px-3 text-gray-400 text-sm'>Already have an account?</p>
              <div className='flex-1 border-t border-gray-600'></div>
            </div>

            {/* Sign In Link */}
            <div className='text-center'>
              <p className='text-gray-300'>
                <Link href='/auth/signin' className='text-red-500 hover:text-red-400 font-semibold transition'>
                  Sign In
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

export default SignUp
