import { ReadApiState } from '../../state/ReadApiState';
import request, { sendRequest } from '../../util/apiUtil';
import {
  IncidenceHistoryResponse,
  IDistrictsNameResponse,
  IDistrictsResponse,
  IApiDistrictResponse,
} from '../interfaces';
import { getDistrictsURL } from '../urls';

class DistrictsApiService {
  public getDistricts = new ReadApiState<IDistrictsNameResponse[], Error, []>(
    async () => {
      const url = getDistrictsURL();
      const data = await sendRequest<IApiDistrictResponse>(request.get(url));

      const dataToMap = data.data;

      /** mapped data to IDistrictsNameResponse from objects IDistrictsApiResponse returned from API*/
      const mappedData: IDistrictsNameResponse[] = Object.keys(dataToMap).map(
        (entry) => {
          return { name: dataToMap[entry].name, ags: dataToMap[entry].ags };
        }
      );

      return mappedData;
    }
  );

  public getDistrict = new ReadApiState<IDistrictsResponse, Error, [string]>(
    async (ags: string) => {
      const url = `${getDistrictsURL()}/${ags}`;
      const data = await sendRequest<IApiDistrictResponse>(request.get(url));
      const dataToMap = data.data;

      /** mapped data to IDistrictsResponse from objects IDistrictsApiResponse returned from API*/
      const mappedData: IDistrictsResponse = {
        ags: dataToMap[ags].ags,
        cases: dataToMap[ags].cases,
        casesPer100k: dataToMap[ags].casesPer100k,
        casesPerWeek: dataToMap[ags].casesPerWeek,
        county: dataToMap[ags].county,
        deaths: dataToMap[ags].deaths,
        deathsPerWeek: dataToMap[ags].deathsPerWeek,
        delta: dataToMap[ags].delta,
        name: dataToMap[ags].name,
        population: dataToMap[ags].population,
        recovered: dataToMap[ags].recovered,
        weekIncidence: dataToMap[ags].weekIncidence,
      };

      return mappedData;
    }
  );

  public getDistrictHistory = new ReadApiState<
    IDistrictsResponse,
    Error,
    [string]
  >(async (ags: string) => {
    const url = `${getDistrictsURL()}/${ags}/history`;
    const data = await sendRequest<IApiDistrictResponse>(request.get(url));
    const dataToMap = data.data;

    /** mapped data to IDistrictsResponse from objects IDistrictsApiResponse returned from API*/
    const mappedData: IDistrictsResponse = {
      ags: dataToMap[ags].ags,
      cases: dataToMap[ags].cases,
      casesPer100k: dataToMap[ags].casesPer100k,
      casesPerWeek: dataToMap[ags].casesPerWeek,
      county: dataToMap[ags].county,
      deaths: dataToMap[ags].deaths,
      deathsPerWeek: dataToMap[ags].deathsPerWeek,
      delta: dataToMap[ags].delta,
      name: dataToMap[ags].name,
      population: dataToMap[ags].population,
      recovered: dataToMap[ags].recovered,
      weekIncidence: dataToMap[ags].weekIncidence,
    };

    return mappedData;
  });

  public getDistrictIncidenceHistory = new ReadApiState<
    IncidenceHistoryResponse[],
    Error,
    [string]
  >(async (ags: string) => {
    const url = `${getDistrictsURL()}/${ags}/history/incidence`;
    const data = await sendRequest<any>(request.get(url));

    /** mapped data to IDistrictsResponse from objects IncidenceHistoryApiResponse returned from API*/
    const mappedData: IncidenceHistoryResponse[] = data.data[ags]['history'];

    return mappedData;
  });
}

export let districtsApiService = new DistrictsApiService();
