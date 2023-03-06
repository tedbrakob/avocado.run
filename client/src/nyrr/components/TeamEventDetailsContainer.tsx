import Time from "../../models/time";
import { TeamEventDetails } from "../types";
import TeamEventScorersTable from "./TeamEventScorersTable";

type Props = {
  teamEventDetails : TeamEventDetails
}

function getImageElement(teamEventDetails: TeamEventDetails) {
  if (teamEventDetails.logoImageId === null) {
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
      src={`https://results.nyrr.org/GetImage/${teamEventDetails.logoImageId}.jpg`}
      alt=""
    />
  );
}

function getDateElement(teamEventDetails: TeamEventDetails) {
  const startDateTime = teamEventDetails.startDateTime;
  const formattedDate = new Date(startDateTime).toDateString();

  return (
    <div>
      <b>Date:</b> {formattedDate}
    </div>
  );
}

function getDistanceElement(teamEventDetails) {
  return (
    <div>
      <b>Distance:</b> {teamEventDetails.distanceName}
    </div> 
  );
}

function getPlaceElement(teamEventDetails : TeamEventDetails) {
  return (
    <div>
      <b>Team Place:</b> {teamEventDetails.teamOrder}
    </div>
  );
}

function getAverageScorerPlace(teamEventDetails: TeamEventDetails) {
  let averageScorerPlace: number | undefined = undefined;

  if (teamEventDetails.summaryPlace !== undefined) {
    averageScorerPlace = Math.round(teamEventDetails.summaryPlace / teamEventDetails.teamScorers.length);
  }

  return (
    <div>
      <b>Average Finish Place:</b> {averageScorerPlace}
    </div>
  );
}

function getAverageScorerTime(teamEventDetails: TeamEventDetails) {
  let averageScorerTime: string | undefined = undefined;

  if (teamEventDetails.summaryTime !== undefined) {
    const summaryTime = Time.createFromString(teamEventDetails.summaryTime);
    const averageTimeInSeconds = summaryTime.getTotalSeconds() / teamEventDetails.teamScorers.length;
    averageScorerTime = Time.createFromTotalSeconds(averageTimeInSeconds).toString();
  }

  return (
    <div>
      <b>Average Finish Time:</b> {averageScorerTime}
    </div>
  );
}

function getScorersTable(teamEventDetails : TeamEventDetails) {
  if (teamEventDetails.teamScorers.length === 0) {
    return null;
  }

  return (
    <TeamEventScorersTable
      scorers={teamEventDetails.teamScorers}
    />
  );
}

export default function TeamEventDetailsContainer(props:Props) {
  const teamEventDetails = props.teamEventDetails;

  return (
    <div>
      <div 
        className="
          text-light
          text-center
          font-bold
          text-xl
          w-full
          p-2
          rounded-t-md
          border
          border-dark
          bg-dark
          border-b-0
          px-20
        "
      >
        {props.teamEventDetails.eventName}
      </div>
      <div
        className="text-dark w-full rounded-b-md border border-dark border-t-0 bg-gradient-to-bl from-dark-accent via-transparent"
      >
        {getImageElement(teamEventDetails)}

        <div className="px-3 pt-4">
          {getDateElement(teamEventDetails)}
          {getDistanceElement(teamEventDetails)}
        </div>
        <div className="px-3 p-2">
          {getPlaceElement(teamEventDetails)}
          {getAverageScorerPlace(teamEventDetails)}
          {getAverageScorerTime(teamEventDetails)}
        </div>

        
        <div className="p-2 ">
          {getScorersTable(teamEventDetails)}
        </div>
      </div>
    </div>
  );
}