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

export interface IncidenceHistoryResponse {
  date: string;
  weekIncidence: number;
}

export interface IDistrictsApiResponse {
  [key: string]: IDistrictsResponse;
}
export interface IncidenceHistoryApiResponse {
  [key: string]: IncidenceHistoryApi;
}

export interface IncidenceHistoryApi {
  name: string;
  history: IncidenceHistoryResponse[];
  ags: string;
}

interface Delta {
  cases: string;
  deaths: string;
  recovered: string;
}

export interface IDistrictsNameResponse {
  name: string;
  ags: string;
}

export interface IGermanyResponse {
  cases: number;
  casesPer100k: number;
  casesPerWeek: number;
  deaths: number;
  delta: Delta;
  meta: IGermanyMetaData;
  r: RValue;
  recovered: number;
  weekIncidence: number;
}

interface RValue {
  value: number;
  date: string;
}

interface IGermanyMetaData {
  source: string;
  lastCheckedForUpdate: string;
  lastUpdate: string;
  info: string;
  contact: string;
}

export interface IVaccinationStateResponse {
  [key: string]: IVaccinationResponse;
}
export interface IVaccinationResponse {
  vaccination: vaccinationType;
  vaccinated: number;
  administeredVaccinations: number;
  states: IVaccinationStateResponse;
}

interface vaccinationType {
  biontech: number;
  moderna: number;
  astraZeneca: number;
}

export interface IApiVaccinationResponse {
  data: IVaccinationResponse;
  meta: IGermanyMetaData;
}

export interface IGermanyCasesHistoryResponse {
  cases: number;
  date: string;
}
export interface IGermanyCasesHistoryApiResponse {
  data: IGermanyCasesHistoryResponse[];
  meta: IGermanyMetaData;
}

export interface IDeathHistoryResponse {
  deaths: number;
  date: string;
}

export interface IRecoveredHistoryResponse {
  recovered: number;
  date: string;
}

export interface IApiHistoryResponse<T> {
  data: T[];
  meta: IGermanyMetaData;
}

export interface IApiDistrictResponse {
  data: { [key: string]: IDistrictsResponse };
  meta: IGermanyMetaData;
}
