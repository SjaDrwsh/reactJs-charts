import { ReadApiState } from '../../state/ReadApiState';
import request, { sendRequest } from '../../util/apiUtil';
import {
  IDistrictsApiResponse,
  IDistrictsNameResponse,
  IDistrictsResponse,
} from '../interfaces';
import { getDistrictsURL } from '../urls';

class DistrictsApiService {
  public getDistricts = new ReadApiState<IDistrictsNameResponse[], Error, []>(
    async () => {
      const url = getDistrictsURL();
      const data = await sendRequest<IDistrictsApiResponse>(request.get(url));

      /** mapped data to IDistrictsNameResponse from objects IDistrictsApiResponse returned from API*/
      const mappedData: IDistrictsNameResponse[] = Object.keys(data).map(
        (entry) => {
          return { name: data[entry].name, ags: data[entry].ags };
        }
      );

      return mappedData;
    }
  );

  public getDistrict = new ReadApiState<IDistrictsResponse, Error, [string]>(
    async (ags: string) => {
      const url = `${getDistrictsURL()}/${ags}`;
      const data = await sendRequest<IDistrictsApiResponse>(request.get(url));

      /** mapped data to IDistrictsResponse from objects IDistrictsApiResponse returned from API*/
      const mappedData: IDistrictsResponse = {
        ags: data[ags].ags,
        cases: data[ags].cases,
        casesPer100k: data[ags].casesPer100k,
        casesPerWeek: data[ags].casesPerWeek,
        county: data[ags].county,
        deaths: data[ags].deaths,
        deathsPerWeek: data[ags].deathsPerWeek,
        delta: data[ags].delta,
        name: data[ags].name,
        population: data[ags].population,
        recovered: data[ags].recovered,
        weekIncidence: data[ags].weekIncidence,
      };

      return mappedData;
    }
  );
}

export let districtsApiService = new DistrictsApiService();
