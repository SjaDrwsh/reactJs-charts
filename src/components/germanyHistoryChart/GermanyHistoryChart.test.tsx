import 'jsdom-global/register';
import { mount } from 'enzyme';
import { skipTick } from '../../util/testUtil';
import GermanyHistoryChart from './GermanyHistoryChart';
import LineSeriesChart from '../lineSeriesChart/LineSeriesChart';

describe('Tests for GermanyHistoryChart', () => {
  const germanyHistoryChart = mount(<GermanyHistoryChart days="7" />);

  it('renders germanyHistoryChart with title', async () => {
    expect(germanyHistoryChart.find('h5').text()).toEqual(
      'Germany`s History Overview'
    );
  });

  it('renders LineSeriesChart', async () => {
    await skipTick();
    germanyHistoryChart.update();

    expect(germanyHistoryChart.find(LineSeriesChart).length).toEqual(1);
  });
});
