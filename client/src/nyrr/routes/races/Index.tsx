import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchEvents } from "../../http/nyrr";
import { FormEvent, useState } from "react";
import RaceDetailsContainer from "../../components/RaceDetailsContainer";

type Props = {
  year: number,
}

export default function Index(props: Props) {
  const [searchText, setSearchText] = useState('');

  const onSearchTextChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const eventsQuery = useQuery(
    ['nyrr-races', props.year],
    () => fetchEvents(props.year)
  );

  if (eventsQuery.error) {
    console.log(eventsQuery.error);
  }

  if (eventsQuery.isLoading || eventsQuery.data === undefined) {
    return (
      <LoadingScreen />
    );
  }

  const filteredEvents = eventsQuery.data.filter(event =>
    event.eventCode.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    || event.eventName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  return (
    <div className="p-4 m-auto 
      w-full
      sm:w-3/4
      md:w-1/2
      xl:min-w-1/3 xl:w-fit
    ">
      <input
        className="w-full my-2 p-4 rounded-md border border-dark"
        placeholder="Search..."
        value={searchText}
        onChange={onSearchTextChange}
      ></input>
      <ul>
        {
          filteredEvents.map(event =>
            (
              <RaceDetailsContainer
                key={event.eventCode}
                event={event}
              />
            )
          )
        }
      </ul>
    </div>
  );
}