/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from "react-router-dom";
import { fetchYears } from '../../http/nyrr';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function YearSwitcher() {
  const { isLoading, error, data: years } = useQuery(['nyrr-fetchYears'], fetchYears, {
    placeholderData: [
      2022,
      2021,
      2019,
      2018,
      2017,
      2016,
      2015
    ]
  },
 );

  if (error) {
    console.log(error);
  }

  if (isLoading || years === undefined) {
    return (
      <div className="w-full">
        <h2 className="w-40 mx-auto">Loading...</h2>
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="bg-primary">
      <div className="sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-nowrap whitespace-nowrap overflow-x-auto w-[100vw] max-w-fit">
              {years.map((item) => (
                <NavLink
                  key={item}
                  to={item.toString()}

                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-dark text-light' : 'text-dark hover:bg-dark hover:text-white hover:bg-opacity-50',
                      'mx-2 px-3 py-2 rounded-md text-md font-medium'
                    )}
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};
