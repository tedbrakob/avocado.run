/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from "react-router-dom";

const navigation = [
  { name: 'Cool Running', to: '/pace-calculator' },
  // { name: 'Strava Thing', to: '/strava-thing' },
  // { name: 'Spotify Thing', to: '/spotify-thing' },
  // { name: 'NYRR Thing', to: '/nyrr-thing' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-dark">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-light-accent hover:text-light">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}

                        className={({ isActive }) =>
                          classNames(
                            isActive ? 'bg-dark-accent text-light' : 'text-light hover:bg-dark-accent hover:text-white hover:bg-opacity-50',
                            'px-3 py-2 rounded-md text-md font-medium'
                          )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}

                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-dark-accent text-light' : 'text-light hover:bg-dark-accent hover:text-white hover:bg-opacity-50',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
