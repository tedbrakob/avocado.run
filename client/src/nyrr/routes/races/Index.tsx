import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/LoadingScreen";
import { fetchEvents } from "../../http/nyrr";
import { FormEvent, useState } from "react";
import { LinkWithQuery } from "../../../components/LinkWithQuery";

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
                <li
                  className="mx-2 bg-white rounded-md border-b border-dark-accent"
                  key={event.eventCode}
                >
                  <div className="block mt-2 p-4">
                    <LinkWithQuery
                      to={`/nyrr-thing/races/${event.eventCode}`}
                    >
                      {event.eventName}
                    </LinkWithQuery>
                  </div>
                </li>
            )
          )
        }
      </ul>
    </div>
  );
}