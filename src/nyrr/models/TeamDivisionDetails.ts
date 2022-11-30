import { fetchTeamAwardRunners, fetchTeamAwards } from "../http/nyrr";
import { TeamEventDetails } from "../types";
import { getDivisionAsGenderAndMinimumAge } from "./Division";
import { getDivisionsResults } from "./TeamDetails"

export const fetchDetailedResults = async (
  divisionCode: string,
  teamCode: string,
  year: number,
) => {
  const {teamName, events, divisionsResults} = await getDivisionsResults([divisionCode], teamCode, year);
  const {gender, minimumAge} = getDivisionAsGenderAndMinimumAge(divisionCode);

  const teamDivisionDetails : TeamEventDetails[] = await Promise.all(events.map(async (event) => {
    const scorersPromise = fetchTeamAwardRunners(event.eventCode, teamCode, gender, minimumAge);
    const teamAwardPromise = fetchTeamAwards(event.eventCode, teamCode, gender, minimumAge);

    const [scorers, teamAward] = await Promise.all([scorersPromise, teamAwardPromise]);

    const teamScorers = scorers.map(scorer => {
      return {
        runnerId: scorer.runnerId,
        firstName: scorer.firstName,
        lastName: scorer.lastName,
        finishTime: scorer.finishTime,
        finishPlace: scorer.finishPlace,
      };
    });

    const teamEventDetails : TeamEventDetails = {
      ...event,
      teamScorers,
      teamOrder: undefined,
      summaryPlace: undefined,
      summaryTime: undefined,
    };

    if (teamAward !== undefined) {
      teamEventDetails.teamOrder = teamAward.teamOrder;
      teamEventDetails.summaryPlace = teamAward.summaryPlace;
      teamEventDetails.summaryTime = teamAward.summaryTime;
    }

    return teamEventDetails;
  }));
  
  return {
    teamName,
    events,
    divisionsResults, 
    teamDivisionDetails
  };
}