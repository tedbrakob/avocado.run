import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorScreen from "../../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import TeamEventDetailsContainer from "../components/TeamEventDetailsContainer";
import { getDivisionName } from "../models/Division";
import { getCorrectOpenDivision } from "../models/TeamDetails";
import { fetchDetailedResults } from "../models/TeamDivisionDetails";

type Props = {
  year: number,
};

export default function TeamDivisionDetails(props:Props) {
  const { teamCode, divisionCode } = useParams();

  const divisionCodeQuery = useQuery(
    ['nyrr-team-get-correct-open-division', divisionCode, teamCode, props.year],
    () => getCorrectOpenDivision(divisionCode ?? '', teamCode ?? '', props.year),
    {
      enabled: !!divisionCode && !!teamCode,
    }
  );

  const teamDivisionResultsQuery = useQuery(
    ['nyrr-team-division-details-detailed-results', divisionCode, teamCode, props.year],
    () => fetchDetailedResults(divisionCodeQuery.data ?? '', teamCode ?? '', props.year),
    {
      enabled: !divisionCodeQuery.isLoading && !!teamCode,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  
  if (teamDivisionResultsQuery.isLoading) {
    return <LoadingScreen/>;
  }

  if (!teamDivisionResultsQuery.data) {
    return <ErrorScreen message="Team Division Details not found."/>
  }

  return (
    <div 
      className="
        mx-auto 
        min-w-fit
        max-w-['fit-content + 20px']
      "
    >
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
      >
        <div>
          {teamDivisionResultsQuery.data.teamName}
        </div>
        {getDivisionName(divisionCodeQuery.data ?? '')}
      </div>

      <div className="
        max-w-[80%]
        min-w-fit
        w-fit
        mx-auto
        my-3
        pb-1
      ">
        {
          teamDivisionResultsQuery.data.teamDivisionDetails.map(
            teamEvent =>
            <div 
              className="my-6"
              key={teamEvent.eventCode}>
              <TeamEventDetailsContainer
                teamEventDetails={teamEvent}
                key={teamEvent.eventCode}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}