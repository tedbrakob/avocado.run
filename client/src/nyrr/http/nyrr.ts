import { z } from 'zod';
import NyrrApi from "nyrr-results-api";

const teamEventDetailsSchema = z.object({
  distanceName: z.string(),
  distanceUnitCode: z.string(),
  eventCode: z.string(),
  eventName: z.string(),
  isClubPointsPublished: z.boolean(),
  isPointsReallyExists: z.boolean(),
  isTeamAwardExists: z.boolean(),
  logoImageExtension: z.string().nullable(),
  logoImageId: z.number().nullable(),
  points: z.number().nullable(),
  startDateTime: z.string(),
});

const teamResultsSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
  teamPlace: z.number(),
  totalPoints: z.number(),
  eventDetails: z.array(
    teamEventDetailsSchema,
  ).optional(),
});

const divisionResultsSchema = z.object({
  divisionCode: z.string(),
  divisionGender: z.enum(["M", "W", "X"]),
  divisionName: z.string(),
  divisionOrder: z.number(),
  teamResults: z.array(
    teamResultsSchema,
  ),
});

const teamAwardsSchema = z.object({
  "awardId": z.number(),
  "teamGroupOrder": z.number(),
  "teamOrder": z.number(),
  "teamCode": z.string(),
  "teamName": z.string(),
  "teamGender": z.string(),
  "minimumAge": z.number(),
  "summaryPlace": z.number(),
  "summaryTime": z.string(),
  "runnersCount": z.number(),
});

const teamAwardRunnersSchema = z.object({
  "runnerId": z.number(),
  "firstName": z.string(),
  "lastName": z.string(),
  "bib": z.string(),
  "gender": z.string(),
  "age": z.number(),
  "city": z.string(),
  "stateProvince": z.string(),
  "country": z.string(),
  "iaaf": z.string(),
  "finishTime": z.string(),
  "finishPlace": z.number(),
});

const teamSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
});

export type DivisionResults = z.infer<typeof divisionResultsSchema>;
export type TeamResults = z.infer<typeof teamResultsSchema>;
export type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;
export type TeamAwards = z.infer<typeof teamAwardsSchema>;
export type TeamAwardRunners = z.infer<typeof teamAwardRunnersSchema>;
export type Team = z.infer<typeof teamSchema>; 

export const fetchDivisionsResults = async (year:number) : Promise<DivisionResults[]> => {
  return await NyrrApi.getDivisionsResults(year);
}

export const fetchClubStandings = async (divisionCode:string, year:number) : Promise<TeamResults[]> => {
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
) : Promise<TeamAwards> => {
  return (await NyrrApi.getTeamAwards(eventCode, teamCode, gender, minimumAge))[0];
}

export const fetchTeamAwardRunners = async (
  eventCode:string, 
  teamCode:string, 
  teamGender:string | null = null, 
  teamMinimumAge:number | null = null
) : Promise<TeamAwardRunners[]> => {
  return await NyrrApi.getTeamAwardRunners(eventCode, teamCode, teamGender, teamMinimumAge);
}

export const fetchTeams = async (
  year:number
) : Promise<Team[]> => {
  return await NyrrApi.getTeams(year);
}
