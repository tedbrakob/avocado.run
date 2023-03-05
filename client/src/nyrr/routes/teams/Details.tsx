import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../http/nyrr";
import { Event } from "nyrr-results-api/build/types"
import LoadingScreen from "../../components/LoadingScreen";
import ErrorScreen from "../../components/ErrorScreen";

type Props = {
  year: number,
};

export default function Details(props: Props) {
  const { isLoading, error, data} = useQuery(
    ['nyrr-fetchEvents', props.year],
    () => fetchEvents(props.year)
  );


  if (error) {
    return <ErrorScreen message="Events not found."/>
  }

  if (isLoading || data === undefined) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div
      className="
        mx-auto 
        min-w-fit
        max-w-['fit-content + 20px']
      "
    >
      {
        data.map((event: Event) => (
          <div
            className="
            text-light
              text-center
              text-2xl
              font-bold
              p-2
              border-y
              border-dark
              bg-dark-accent
              mx-auto
            "
            key={event.eventCode}
          >
            {event.eventName}
          </div>
        ))
      }
    </div>
  );

}