import 'jsdom-global/register';
import { mount } from 'enzyme';
import {
  HorizontalGridLines,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import StateBarChart, { GermanyHistoryChartProps } from './StateBarChart';
import { StateBarChartMockData } from '../../util/testData';

describe('Tests for StateBarChart', () => {
  const stateBarChartMockData: GermanyHistoryChartProps =
    StateBarChartMockData();

  const stateBarChart = mount(
    <StateBarChart data={stateBarChartMockData.data} />
  );

  it('renders charts components XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, DiscreteColorLegend', async () => {
    expect(stateBarChart.find(XYPlot).length).toEqual(1);
    expect(stateBarChart.find(HorizontalGridLines).length).toEqual(1);
    expect(stateBarChart.find(VerticalGridLines).length).toEqual(1);
    expect(stateBarChart.find(XAxis).length).toEqual(1);
    expect(stateBarChart.find(YAxis).length).toEqual(1);
    expect(stateBarChart.find(VerticalBarSeriesCanvas).length).toEqual(1);
  });
});
