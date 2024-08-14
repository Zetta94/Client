import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web';


const callouts = [
  {
    name: 'API Movies',
    description: 'Access to movies in the API',
    imageSrc: 'https://cdn.dribbble.com/users/20368/screenshots/3953268/api_anim.gif',
    imageAlt: 'API',
    href: '/apimovies',
  },
  {
    name: 'MONGODB Movies',
    description: 'Access to movies in the MONGODB',
    imageSrc: 'https://www.e-dea.co/hs-fs/hubfs/giphy%20(1)-1.gif?width=490&length=490&name=giphy%20(1)-1.gif',
    imageAlt: 'DB',
    href: '/dbmovies',
  },
];

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { duration: 3000 }
  });

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl min-h-full lg:max-w-none">
            <div className="flex justify-center">
                <animated.img
                    src="https://static.vecteezy.com/system/resources/previews/010/286/340/non_2x/online-cinema-art-movie-watching-with-popcorn-and-film-strip-cinematograph-concept-png.png"
                    alt="Movie watching"
                    className="max-w-xs h-auto rounded-xl"
                    style={props}
                />
            </div>
          <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative text-center">
                <div className="relative h-fit w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 opacity-75 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-100 sm:h-64 mx-auto">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-600">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
