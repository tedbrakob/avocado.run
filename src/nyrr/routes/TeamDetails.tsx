import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getDivisionName from "../divisionNames";
import { fetchTeamDivisionsResults, fetchTeamName } from "../http/nyrr";

type Props = {
  year: number,
};

export default function TeamDetails(props: Props) {
  const { teamCode } = useParams()
  const { error: fetchTeamNameError, data:teamName } = useQuery(
    ['nyrr-fetchTeamName', props.year, teamCode],
    () => fetchTeamName(props.year, teamCode ?? ""), 
    {
      enabled: !!teamCode,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const { error: fetchTeamDivisionsResultsError, data: teamDivisionResults, isLoading } = useQuery(
    ['nyrr-fetchTeamDivisionsResults', props.year, teamName],
    () => fetchTeamDivisionsResults(props.year, teamName ?? ""),
    {
      enabled: !!teamName,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (!!fetchTeamNameError) {
    return (
      <div className="w-full whitespace-nowrap">
        <h2 className="w-40 mx-auto">{fetchTeamNameError.toString()}</h2>
      </div>
    );
  }

  if (!!fetchTeamDivisionsResultsError) {
    return (
      <div className="w-full whitespace-nowrap">
        <h2 className="w-40 mx-auto">{fetchTeamDivisionsResultsError.toString()}</h2>
      </div>
    );
  }

  if (isLoading || teamName === undefined || teamDivisionResults === undefined) {
    return (
      <div className="w-full">
        <h2 className="w-40 mx-auto">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto whitespace-nowrap">
      <h1 className="text-xl">{teamCode} - {teamName}</h1>
      {
        teamDivisionResults.map((divisionResult) => (
          <div
            key={divisionResult.divisionCode}
          >{getDivisionName(divisionResult.divisionCode)}</div>
        ))
      }
    </div>
  );
}