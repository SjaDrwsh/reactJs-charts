import { ReadApiState } from '../../state/ReadApiState';
import request, { sendRequest } from '../../util/apiUtil';
import {
  IApiHistoryResponse,
  IDeathHistoryResponse,
  IGermanyCasesHistoryApiResponse,
  IGermanyCasesHistoryResponse,
  IGermanyResponse,
  IncidenceHistoryResponse,
  IRecoveredHistoryResponse,
} from '../interfaces';

import { getGermanHistoryURL, getGermanURL } from '../urls';

class GermanyApiService {
  public getGermanyHistory = new ReadApiState<IGermanyResponse, Error, []>(
    async () => {
      const url = getGermanURL();
      const data = await sendRequest<any>(request.get(url));
      return data;
    }
  );

  public getGermanyCasesHistory = new ReadApiState<
    IGermanyCasesHistoryResponse[],
    Error,
    [string?]
  >(async (days?: string) => {
    const url = `${getGermanHistoryURL('cases', days)}`;
    const data = await sendRequest<IGermanyCasesHistoryApiResponse>(
      request.get(url)
    );

    return data.data;
  });

  public getGermanyIncidenceHistory = new ReadApiState<
    IncidenceHistoryResponse[],
    Error,
    [string?]
  >(async (days?: string) => {
    const url = `${getGermanHistoryURL('incidence', days)}`;
    const data = await sendRequest<
      IApiHistoryResponse<IncidenceHistoryResponse>
    >(request.get(url));

    return data.data;
  });

  public getGermanyDeathsHistory = new ReadApiState<
    IDeathHistoryResponse[],
    Error,
    [string?]
  >(async (days?: string) => {
    const url = `${getGermanHistoryURL('deaths', days)}`;
    const data = await sendRequest<IApiHistoryResponse<IDeathHistoryResponse>>(
      request.get(url)
    );

    return data.data;
  });

  public getGermanyRecoveryHistory = new ReadApiState<
    IRecoveredHistoryResponse[],
    Error,
    [string?]
  >(async (days?: string) => {
    const url = `${getGermanHistoryURL('recovered', days)}`;
    const data = await sendRequest<
      IApiHistoryResponse<IRecoveredHistoryResponse>
    >(request.get(url));

    return data.data;
  });
}

export let germanyApiService = new GermanyApiService();
