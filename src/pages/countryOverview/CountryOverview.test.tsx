import 'jsdom-global/register';
import { mount } from 'enzyme';
import CountryOverview from './CountryOverview';
import { skipTick } from '../../util/testUtil';
import { germanyApiService } from '../../api/germanyApi/GermanyApiService';
import { IGermanyResponse } from '../../api/interfaces';
import InfoCard from '../../components/infoCard/InfoCard';
import GermanyHistoryChart from '../../components/germanyHistoryChart/GermanyHistoryChart';
import { ReadApiState } from '../../state/ReadApiState';
import { Button } from 'semantic-ui-react';

describe('Tests for CountryOverview', () => {
  const countryOverview = mount(<CountryOverview />);

  it('renders title correctly', () => {
    expect(countryOverview.find('h2').text()).toEqual('Germany`s Overview');
  });

  it('renders GermanyHistoryChart', () => {
    expect(countryOverview.find(GermanyHistoryChart).length).toEqual(1);
  });

  it('renders filter 4 buttons', () => {
    expect(countryOverview.find(Button).length).toEqual(4);
  });

  it('renders InfoCard', async () => {
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

    // mock api call
    germanyApiService.getGermanyHistory = new ReadApiState(
      jest.fn().mockImplementation(async () => Promise.resolve(testData))
    );

    const countryOverview = mount(<CountryOverview />);

    await skipTick();
    countryOverview.update();

    expect(countryOverview.find(InfoCard).length).toEqual(7);
  });
});
