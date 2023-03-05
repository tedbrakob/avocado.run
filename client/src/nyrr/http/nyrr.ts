import * as NyrrTypes from 'nyrr-results-api/build/types';
import NyrrApi from "nyrr-results-api";

export const fetchDivisionsResults = async (year:number) : Promise<NyrrTypes.DivisionResults[]> => {
  return await NyrrApi.getDivisionsResults(year);
}

export const fetchClubStandings = async (divisionCode:string, year:number) : Promise<NyrrTypes.TeamResults[]> => {
  return await NyrrApi.getDivisionResults(divisionCode, year);
}

export const fetchYears = async () : Promise<number[]> => {
  return await NyrrApi.getYears();
}

export const fetchTeamAwards = async (
  eventCode:string, 
  teamCode:string, 
  gender:string | null = null, 
  minimumAge:number | null = null
) : Promise<NyrrTypes.TeamAwards> => {
  return (await NyrrApi.getTeamAwards(eventCode, teamCode, gender, minimumAge))[0];
}

export const fetchTeamAwardRunners = async (
  eventCode:string, 
  teamCode:string, 
  teamGender:string | null = null, 
  teamMinimumAge:number | null = null
) : Promise<NyrrTypes.TeamAwardRunners[]> => {
  return await NyrrApi.getTeamAwardRunners(eventCode, teamCode, teamGender, teamMinimumAge);
}

export const fetchTeams = async (year: number): Promise<NyrrTypes.Team[]> => {
  return await NyrrApi.getTeams(year);
};

export const fetchEvents = async (
  year: number | null = null,
  searchString:string = "",
  distance: string | null = null,
) : Promise<NyrrTypes.Event[]> => {
  return await NyrrApi.searchEvents(year, searchString, distance)
}