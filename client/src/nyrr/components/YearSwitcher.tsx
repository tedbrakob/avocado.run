/* This example requires Tailwind CSS v2.0+ */
import { useQuery } from '@tanstack/react-query';
import { fetchYears } from '../http/nyrr';
import LoadingScreen from './LoadingScreen';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  year: number,
  setYear: (year: string) => void,
  allYears?: boolean,
};

export default function YearSwitcher (props: Props) {
  const currentYear = (new Date()).getFullYear();
  let placeholderData = Array.from(
    { length: (2021 - currentYear) / -1 + 1 },
    (_, i) => currentYear + (i * -1)
  );
  
  if (props.allYears) {
    placeholderData = placeholderData.concat([
      2020,
    ]);
  }

  placeholderData = placeholderData.concat([
    2019,
    2018,
    2017,
    2016,
    2015,
  ]);

  if (props.allYears) {
    placeholderData = placeholderData.concat([
      2012,
      2011,
      2010,
      2009,
      2008,
      2007,
      2006,
      2005,
    ]);
  }

  let queryClosure = fetchYears;
  if (props.allYears) {
    queryClosure = async () => placeholderData;
  }

  const { isLoading, error, data: years } = useQuery(
    ['nyrr-fetchYears', props.allYears], 
    queryClosure, 
    { placeholderData },
  );

  if (error) {
    console.log(error);
  }

  if (isLoading || years === undefined) {
    return (
      <LoadingScreen/>
    );
  }

  return (
      <div className="bg-primary relative flex items-center justify-between h-11">
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="flex flex-nowrap whitespace-nowrap overflow-x-auto w-[100vw] max-w-fit h-full hide-scrollbars">
            {years.map((year) => {
              const isActive = props.year === year;              
              return(
                <button
                  key={year}
                  className={classNames(
                    isActive ? 'bg-dark text-light' : 'text-dark hover:bg-dark hover:text-white hover:bg-opacity-50',
                    'mx-2 px-3 py-2 rounded-md text-md font-medium my-auto'
                  )}
                  onClick={() => props.setYear(year.toString())}
                  
                > {year} </button>
              );
            })}
          </div>
        </div>
      </div>
  );
};
