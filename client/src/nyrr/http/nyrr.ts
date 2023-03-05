import NyrrApiSingleton from './nyrrApiSingleton';
import * as NyrrTypes from 'nyrr-results-api/build/types';

export const fetchDivisionsResults = async (year:number) : Promise<NyrrTypes.DivisionResults[]> => {
  return await (await NyrrApiSingleton.getInstance()).getDivisionsResults(year);
}

export const fetchClubStandings = async (divisionCode:string, year:number) : Promise<NyrrTypes.TeamResults[]> => {
  return await (await NyrrApiSingleton.getInstance()).getDivisionResults(divisionCode, year);
}

export const fetchYears = async () : Promise<number[]> => {
  return await (await NyrrApiSingleton.getInstance()).getYears();
  // const res = await (await NyrrApiSingleton.getInstance()).getYears();
  // debugger;
  // return res;
}

export const fetchTeamAwards = async (
  eventCode:string, 
  teamCode:string, 
  gender:string | null = null, 
  minimumAge:number | null = null
) : Promise<NyrrTypes.TeamAwards> => {
  return (await (await NyrrApiSingleton.getInstance()).getTeamAwards(eventCode, teamCode, gender, minimumAge))[0];
}

export const fetchTeamAwardRunners = async (
  eventCode:string, 
  teamCode:string, 
  teamGender:string | null = null, 
  teamMinimumAge:number | null = null
) : Promise<NyrrTypes.TeamAwardRunners[]> => {
  return await (await NyrrApiSingleton.getInstance()).getTeamAwardRunners(eventCode, teamCode, teamGender, teamMinimumAge);
}

export const fetchTeams = async (
  year:number
) : Promise<NyrrTypes.Team[]> => {
  console.log();
  return await (await NyrrApiSingleton.getInstance()).getTeams(year);
}

export const fetchEvents = async (
  year: number | null = null,
  searchString:string = "",
  distance: string | null = null,
) : Promise<NyrrTypes.Event[]> => {
  return await (await NyrrApiSingleton.getInstance()).eventsSearch(year, searchString, distance)
}