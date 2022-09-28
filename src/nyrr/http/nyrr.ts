import { z } from 'zod';
import NyrrApiSingleton from './nyrrApiSingleton';

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
  divisionGender: z.enum(["M", "F", "X"]),
  divisionName: z.string(),
  divisionOrder: z.number(),
  teamResults: z.array(
    teamResultsSchema,
  ),
});

// const clubScorerSchema = z.object({
//   runnerId: z.number(),
//   firstName: z.string(),
//   lastName: z.string(),
//   bib: z.string(),
//   gender: z.string(),
//   age: z.number(),
//   city: z.string(),
//   stateProvince: z.string(),
//   country: z.string(),
//   iaaf: z.string(),
//   finishTime: z.string(),
//   finishPlace: z.number(),
// });

export type DivisionResults = z.infer<typeof divisionResultsSchema>;
export type TeamResults = z.infer<typeof teamResultsSchema>;
// export type ClubScorer = z.infer<typeof clubScorerSchema>;
export type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;

export const fetchDivisionsResults = async (year:number) : Promise<DivisionResults[]> => {
  return await (await NyrrApiSingleton.getInstance()).getDivisionsResults(year);
}

export const fetchClubStandings = async (divisionCode:string, year:number) : Promise<TeamResults[]> => {
  return await (await NyrrApiSingleton.getInstance()).getDivisionResults(divisionCode, year);
}

export const fetchYears = async () : Promise<number[]> => {
  return await (await NyrrApiSingleton.getInstance()).getYears();
}
