import 'jsdom-global/register';
import { mount } from 'enzyme';
import CountryOverview from './CountryOverview';
import { mockReadApiState, skipTick } from '../../util/testUtil';
import { germanyApiService } from '../../api/germanyApi/GermanyApiService';
import { IGermanyResponse } from '../../api/interfaces';
import InfoCard from '../../components/infoCard/InfoCard';
import GermanyHistoryChart from '../../components/germanyHistoryChart/GermanyHistoryChart';

describe('Tests for CountryOverview', () => {
  const countryOverview = mount(<CountryOverview />);

  it('on mount CountryOverview service should be called', async () => {
    await skipTick();
    countryOverview.update();
    expect(germanyApiService.getGermanyHistory.call).toHaveBeenCalled();
  });

  it('renders title correctly', () => {
    expect(countryOverview.find('h2').text()).toEqual('Germany`s Overview');
  });

  it('renders GermanyHistoryChart', () => {
    expect(countryOverview.find(GermanyHistoryChart).length).toEqual(1);
  });

  it('renders InfoCard', async () => {
    mockReadApiState(germanyApiService.getGermanyHistory, async () =>
      Promise.resolve(testData)
    );

    const testData: IGermanyResponse = {
      cases: 3651640,
      casesPer100k: 4390.747158439391,
      casesPerWeek: 51993,
      deaths: 87423,
      r: { value: 0.96, date: '2021-05-20T00:00:00.000Z' },
      recovered: 3408774,
      weekIncidence: 62.516599941050934,
      delta: {
        cases: 2682,
        deaths: 43,
        recovered: 11691,
      },
      meta: {
        contact: 'Marlon Lueckert (m.lueckert@me.com)',
        info: 'https://github.com/marlon360/rki-covid-api',
        lastCheckedForUpdate: '2021-05-24T16:20:27.555Z',
        lastUpdate: '2021-05-23T23:00:00.000Z',
        source: 'Robert Koch-Institut',
      },
    };

    const countryOverview = mount(<CountryOverview />);

    // jest
    //   .spyOn(germanyApiService.getGermanyHistory, 'data', 'get')
    //   .mockImplementation(() => testData);

    await skipTick();
    countryOverview.update();

    expect(countryOverview.find(InfoCard).length).toEqual(7);
  });
});
