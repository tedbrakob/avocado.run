export const mile = 'mile';
export const yard = 'yard';
export const kilometer = 'kilometer';
export const meter = 'meter';

export const distanceUnits = [
    mile,
    yard,
    kilometer,
    meter,
];

export const metersPerUnit = {
  mile: 1609.34,
  yard: 1609.34 / 1760,
  kilometer: 1000,
  meter: 1,
};

export const distanceUnitOptions = [
  {label: 'Miles', value: mile},
  {label: 'Kilometers', value: kilometer},
  {label: 'Meters', value: meter},
  {label: 'Yards', value: yard},
];

export const eventDistanceOptions = [
  {label: '', distance: {quantity: null, unit: mile}},
  {label: 'Marathon', distance: {quantity: 26.21875, unit: mile}},
  {label: 'Half Marathon', distance: {quantity: 26.21875 / 2, unit: mile}},
  {label: '5K', distance: {quantity: 5, unit: kilometer}},
  {label: '5M', distance: {quantity: 5, unit: mile}},
  {label: '8K', distance: {quantity: 8, unit: kilometer}},
  {label: '10K', distance: {quantity: 10, unit: kilometer}},
  {label: '15K', distance: {quantity: 15, unit: kilometer}},
  {label: '10M', distance: {quantity: 10, unit: mile}},
  {label: '20K', distance: {quantity: 20, unit: kilometer}},
  {label: '15M', distance: {quantity: 15, unit: mile}},
  {label: '25K', distance: {quantity: 25, unit: kilometer}},
  {label: '30K', distance: {quantity: 30, unit: kilometer}},
  {label: '20M', distance: {quantity: 20, unit: mile}},
];

export const paceDistanceOptions = [
  {label: mile, distance: {quantity: 1, unit: mile}},
  {label: kilometer, distance: {quantity: 1, unit: kilometer}},
  {label: 'Half Mile', distance: {quantity: 0.5, unit: mile}},
  {label: 'Quarter Mile', distance: {quantity: 0.25, unit: mile}},
  {label: 'Eigth Mile', distance: {quantity: 0.125, unit: mile}},
  {label: '1500M', distance: {quantity: 1500, unit: meter}},
  {label: '800M', distance: {quantity: 800, unit: meter}},
  {label: '400M', distance: {quantity: 400, unit: meter}},
  {label: '200M', distance: {quantity: 200, unit: meter}},
  {label: meter, distance: {quantity: 1, unit: meter}},
  {label: yard, distance: {quantity: 1, unit: yard}},
];