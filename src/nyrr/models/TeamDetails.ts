import { fetchClubStandings, fetchDivisionsResults } from "../http/nyrr"

export const fetchDetailedResults = async (year:number, teamCode:string) => {
  const teamDivisionCodes = await getTeamDivisions(year, teamCode);
  return await getDivisionsResults(teamDivisionCodes, teamCode, year);
}

const getTeamDivisions = async (year:number, teamCode:string):Promise<string[]> => {
  const divisions = await fetchDivisionsResults(year);
  const divisionCodes: string[] = [];

  for (const division of divisions) {
    const teamResults = division.teamResults.filter(
      team => team.teamCode === teamCode
    );

    if (teamResults.length === 1) {
      divisionCodes.push(division.divisionCode);
    }
  }

  return divisionCodes
}

const getDivisionsResults = async (divisionCodes:string[], teamCode:string, year:number) => {
  const divisionsStandings = await Promise.all(divisionCodes.map(async (divisionCode) => {
    const standings = await fetchClubStandings(divisionCode, year);
    const filteredStandings = standings.filter(standing => standing.teamCode === teamCode);

    if (filteredStandings.length !== 1) {
      throw Error("Could not find team result");
    }

    return {
      divisionCode,
      standing: filteredStandings[0]
    };
  }));

  let teamName: string | null = null;
  let events: any[] = [];

  const divisionsResults = divisionsStandings.map( divisionStanding => {
    const {divisionCode, standing} = divisionStanding;

    if (teamName === null) {
      teamName = standing.teamName;
    }

    if (events.length === 0 && standing.eventDetails) {
      events = standing.eventDetails.map(event => {
        return {
          distanceName: event.distanceName, 
          distanceUnitCode: event.distanceUnitCode, 
          eventCode: event.eventCode, 
          eventName: event.eventName, 
          startDateTime: event.startDateTime,
        }
      });
    }

    return {
      divisionCode,
      place: standing.teamPlace,
      points: standing.totalPoints,
      eventsPoints: standing.eventDetails?.map(event => event.points),
    };
  });

  return {
    teamName,
    events,
    divisionsResults,
  };
}