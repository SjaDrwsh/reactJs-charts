import 'jsdom-global/register';
import { mount } from 'enzyme';
import { skipTick } from '../../util/testUtil';
import { IDistrictsResponse } from '../../api/interfaces';
import { ReadApiState } from '../../state/ReadApiState';
import District from './District';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';

describe('Tests for District', () => {
  const testData: IDistrictsResponse = {
    ags: '10044',
    cases: '8367',
    casesPer100k: '4305.806431692217',
    casesPerWeek: '179',
    county: 'LK Saarlouis',
    deaths: '149',
    deathsPerWeek: '0',
    delta: { cases: 1, deaths: 0, recovered: 36 },
    name: 'Saarlouis',
    population: 194319,
    recovered: '7910',
    weekIncidence: '92.1165712050803',
  };

  // mock api call
  districtsApiService.getDistrict = new ReadApiState(
    jest.fn().mockImplementation(async () => Promise.resolve(testData))
  );

  const district = mount(<District ags="10044" />);

  it('renders 2 Accordions', async () => {
    await skipTick();
    district.update();

    expect(district.find('Accordion').length).toEqual(2);
  });

  it('renders first Accordion with title, casesPerWeek, weekIncidence, cases', async () => {
    await skipTick();
    district.update();
    const firstAccordion = district.find('Accordion').at(0);

    // title
    expect(firstAccordion.find('h5').text()).toEqual(
      'Confirmed New Infections'
    );
    // casesPerWeek: '179',
    expect(firstAccordion.find('p').at(1).text()).toEqual('179');
    // weekIncidence: '92.1165712050803',
    expect(firstAccordion.find('p').at(3).text()).toEqual('92.1');
    // cases: '8367',
    expect(firstAccordion.find('p').at(5).text()).toEqual('8,370');
  });

  it('renders second Accordion with title, casesPerWeek, weekIncidence, cases', async () => {
    await skipTick();
    district.update();
    const secondAccordion = district.find('Accordion').at(1);

    // title
    expect(secondAccordion.find('h5').text()).toEqual('7-day Incidence');
    // casesPer100k: '4305.806431692217',
    expect(secondAccordion.find('p').at(1).text()).toEqual('4,310');
  });
});
