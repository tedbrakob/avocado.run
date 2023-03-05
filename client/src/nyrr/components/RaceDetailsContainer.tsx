import { Event } from "nyrr-results-api/build/events";
import { LinkWithQuery } from "../../components/LinkWithQuery";

type Props = {
  event: Event;
};

function getImageElement(event: Event) {
  if (event.logoImageId === null || event.logoImageExtension === null) {
    return null;
  }

  return (
    <img
      className="
          float-right
          object-cover
          m-2
          p-2
          rounded-2xl
          h-24
          w-24
        "
      src={`https://results.nyrr.org/GetImageAds/${event.logoImageId}.png`}
      alt=""
    />
  );
}

export default function RaceDetailsContainer(props:Props) {
  const event = props.event;

  return (
    <li
      className="
        mx-2
        bg-white
        rounded-md
        border-b
        border-dark-accent
        bg-gradient-to-l
        from-dark-accent 
        via-transparent
        h-28
      "
    >
      <LinkWithQuery
        to={`/nyrr-thing/races/${event.eventCode}`}
        className="block mt-2 p-4"
      >
        {event.eventName}
        {getImageElement(event)}
      </LinkWithQuery>
    </li>
  );
}
