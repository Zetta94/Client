import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/authSlice'
import { AppDispatch } from '../../store' 
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>() 
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
      .then((response) => {
        navigate('/home')
      })
      .catch((error) => {
        console.error('Login failed:', error)
      })
  }

  return (
    <>
    <div className="flex min-h-screen min-w-screen flex-col justify-center items-center bg-[url(https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg)] bg-origin-border">

    <div className='min-w-fit [box-shadow:inset_0_0_10px_#000] bg-slate-300/60 text-2xl rounded-xl p-8'>

      <div className="">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-16 p-2 w-auto bg-white/75 m-3 rounded-full"
        />       
      </div>

      <div className="mt-4 w-fit [box-shadow:0_0_10px_#000] bg-white/80 text-2xl rounded-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6 w-[25rem]">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          You don't have an account?{' '}
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </a>
        </p>
      </div>
    </div>

    </div>
    </>
  )
}

export default Login
