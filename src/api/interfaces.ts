export interface IDistrictsResponse {
  ags: string;
  name: string;
  county: string;
  population: number;
  cases: string;
  deaths: string;
  casesPerWeek: string;
  deathsPerWeek: string;
  recovered: string;
  weekIncidence: string;
  casesPer100k: string;
  delta: Delta;
}

interface Delta {
  cases: string;
  deaths: string;
  recovered: string;
}

export interface IDistrictsApiResponse {
  [key: string]: IDistrictsResponse;
}

export interface IDistrictsNameResponse {
  name: string;
  ags: string;
}
