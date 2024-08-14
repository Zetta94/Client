import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { AppDispatch } from '../../store'; // Importa el tipo AppDispatch
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // Usa el tipo AppDispatch
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    dispatch(registerUser({ firstName, lastName, email, password }))
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        // Puedes mostrar un mensaje de error al usuario
      });
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-[url(https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg)] bg-origin-border">

      <div className='w-fit [box-shadow:inset_0_0_10px_#000] bg-slate-300/60 text-2xl rounded-xl p-8'>

      <div className="">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-16 p-2 w-auto bg-white/75 m-3 rounded-full"
        />
      </div>

      <div className="mt-4 w-fit [box-shadow:0_0_10px_#000] bg-white/80 text-2xl rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6 w-[25rem]">
          {error && <p className="text-red-600 text-center">{error}</p>}
          
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="first_name"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="First Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="last_name"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Register;
