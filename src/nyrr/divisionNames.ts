const genders = new Map([
  ['M', "Men"],
  ['W', "Women"],
  ['X', "Non-Binary"],
]);

export default function getDivisionName(divisionCode: string): string{
  const gender = genders.get(divisionCode.slice(-1));
  let division = divisionCode.slice(0, -1);

  const divisionIsAgeGroup = !isNaN(Number(division));

  if (divisionIsAgeGroup) {
    division += '+';
  }

  return `${division} ${gender}`;
}