import axios from 'axios';
import { z } from 'zod';

let token:string;

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

const clubScorerSchema = z.object({
    runnerId: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    bib: z.string(),
    gender: z.string(),
    age: z.number(),
    city: z.string(),
    stateProvince: z.string(),
    country: z.string(),
    iaaf: z.string(),
    finishTime: z.string(),
    finishPlace: z.number(),
  }
);

export type DivisionResults = z.infer<typeof divisionResultsSchema>;
export type TeamResults = z.infer<typeof teamResultsSchema>;
export type ClubScorer = z.infer<typeof clubScorerSchema>;
export type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;

export const fetchToken = async () : Promise<void> => {
  const response = await axios.get(process.env.REACT_APP_API_URL + '/nyrr-token');
  const data = response.data;

  z.object({
    'token': z.string(),
  }).parse(data);

  token = data.token;
}

export const fetchDivisionsResults = async (year:number) : Promise<DivisionResults[]> => {
  const response = await postWithNyrrToken(
    'https://results.nyrr.org/api/ClubStandings/getDivisionsResults', 
    { 
      year,
    }
  );

  const data = response.data.response.items;
  z.array(divisionResultsSchema).parse(data);

  return data;
}

export const fetchClubStandings = async (divisionCode:string, year:number) : Promise<TeamResults[]> => {
  const response = await postWithNyrrToken(
    'https://results.nyrr.org/api/ClubStandings/getDivisionResults', 
    { 
      year,
      divisionCode,
    }
  );

  const data = response.data.response.items;
  z.array(teamResultsSchema).parse(data);

  return data;
}

export const fetchYears = async () : Promise<number[]> => {
  const response = await postWithNyrrToken('https://results.nyrr.org/api/ClubStandings/getYears', {});

  const data = response.data.response.items;
  z.array(z.number()).parse(data);

  return data;
}

const postWithNyrrToken = async (url:string, data:object) => {  
  if (token === undefined) {
    await fetchToken();
  }

  const response = await axios.post(url, data, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      token,
    }
  });

  return response;
}

