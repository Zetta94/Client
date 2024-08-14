import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://media2.giphy.com/media/6JmX7b4Bdgh1sQzoBZ/giphy.gif?cid=6c09b952wgt8i9u3n191f98rzzgn26bj10biufc3jbnbdvp1&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
};

const navigation = [
  { name: 'Home', href: '/home', current: false },
  { name: 'Favourites', href: '/favourites', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Logout', href: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => { 
    // Despacha la acción de logout para limpiar el token y el estado
    dispatch(logoutUser())
      .then(() => {
        // Redirige al usuario a la página de inicio de sesión o a la página de inicio
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  // Manejador de clic para la lupa
  const handleSearchClick = () => {
    navigate('/searchapi');
  };

  return (
    <div className="min-h-fit">
      <Disclosure as="nav" className="bg-slate-800 [box-shadow:_0_0_15px_#000]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href='/home'>
                  <img
                    alt="ZettaMovies"
                    src="https://media4.giphy.com/media/H1pkM0JAHx87bFS7qD/giphy.gif?cid=6c09b952gpo7e8qat4zyua2v4fanzc82kv4bc0z6842uywk5&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                    className="h-10 w-10"
                  />
                </a>
              </div>
              <div className="hidden md:block w-full max-w-lg">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleSearchClick} // Añadido el manejador de clic
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {item.name === 'Logout' ? (
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
