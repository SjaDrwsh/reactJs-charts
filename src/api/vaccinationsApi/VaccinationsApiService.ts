import { ReadApiState } from '../../state/ReadApiState';
import request, { sendRequest } from '../../util/apiUtil';
import { IApiVaccinationResponse, IVaccinationResponse } from '../interfaces';
import { getVaccinationURL } from '../urls';

class VaccinationsApiService {
  public getVaccinations = new ReadApiState<IVaccinationResponse, Error, []>(
    async () => {
      const url = getVaccinationURL();
      const data = await sendRequest<IApiVaccinationResponse>(request.get(url));

      const dataToMap = data.data;
      return dataToMap;
    }
  );
}

export let vaccinationsApiService = new VaccinationsApiService();
