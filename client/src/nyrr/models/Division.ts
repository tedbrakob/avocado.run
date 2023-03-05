const genders = new Map([
  ['M', "Men"],
  ['W', "Women"],
  ['X', "Non-Binary"],
]);

export const getDivisionName = (divisionCode: string): string => {
  const gender = genders.get(divisionCode.slice(-1));
  let division = divisionCode.slice(0, -1);

  if (!gender || !division) {
    return '';
  }

  const divisionIsAgeGroup = !isNaN(Number(division));

  if (divisionIsAgeGroup) {
    division += '+';
  }

  return `${division} ${gender}`;
}

export const getDivisionAsGenderAndMinimumAge = (divisionCode: string): {gender:string, minimumAge:number} => {
  let gender = divisionCode.slice(-1);

  const division = divisionCode.slice(0, -1);

  const divisionIsAgeGroup = !isNaN(Number(division));

  let minimumAge = 0;
  if (divisionIsAgeGroup) {
    minimumAge = parseInt(division);
  }

  return {
    gender,
    minimumAge,
  };
}