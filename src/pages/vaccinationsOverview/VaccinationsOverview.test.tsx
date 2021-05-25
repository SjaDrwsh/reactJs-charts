import 'jsdom-global/register';
import { mount, ReactWrapper } from 'enzyme';
import { skipTick } from '../../util/testUtil';
import InfoCard from '../../components/infoCard/InfoCard';
import { ReadApiState } from '../../state/ReadApiState';
import VaccinationsOverview from './VaccinationsOverview';
import StateBarChart from '../../components/stateBarChart/StateBarChart';
import { vaccinationsApiService } from '../../api/vaccinationsApi/VaccinationsApiService';
import { IVaccinationResponse } from '../../api/interfaces';
import { StateBarChartMockData } from '../../util/testData';

describe('Tests for VaccinationsOverview', () => {
  let vaccinationsOverview: ReactWrapper;

  const testData: IVaccinationResponse = {
    administeredVaccinations: 1956520,
    vaccinated: 1392851,
    vaccination: {
      astraZeneca: 315456,
      biontech: 951390,
      moderna: 126005,
    },
    states: StateBarChartMockData().data,
  };

  beforeEach(async () => {
    // mock api call
    vaccinationsApiService.getVaccinations = new ReadApiState(
      jest.fn().mockImplementation(async () => Promise.resolve(testData))
    );
    vaccinationsOverview = mount(<VaccinationsOverview />);

    await skipTick();
    vaccinationsOverview.update();
  });

  it('renders title correctly', () => {
    expect(vaccinationsOverview.find('h2').text()).toEqual(
      'Vaccination Overview'
    );
  });

  it('renders two InfoCards', () => {
    expect(vaccinationsOverview.find(InfoCard).length).toEqual(2);
  });

  it('renders filter 4 buttons', () => {
    expect(vaccinationsOverview.find(StateBarChart).length).toEqual(1);
  });
});
