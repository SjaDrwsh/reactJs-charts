import 'jsdom-global/register';
import { mount } from 'enzyme';
import {
  DiscreteColorLegend,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import LineSeriesChart, { LineSeriesChartProps } from './LineSeriesChart';
import { lineSeriesChartMock } from '../../util/testData';

describe('Tests for LineSeriesChart', () => {
  const lineSeriesChartMockData: LineSeriesChartProps = lineSeriesChartMock();

  const lineSeriesChart = mount(
    <LineSeriesChart
      recoveries={lineSeriesChartMockData.recoveries}
      cases={lineSeriesChartMockData.cases}
      deaths={lineSeriesChartMockData.deaths}
      incidences={lineSeriesChartMockData.incidences}
    />
  );

  it('renders charts components XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, DiscreteColorLegend', async () => {
    expect(lineSeriesChart.find(XYPlot).length).toEqual(1);
    expect(lineSeriesChart.find(HorizontalGridLines).length).toEqual(1);
    expect(lineSeriesChart.find(VerticalGridLines).length).toEqual(1);
    expect(lineSeriesChart.find(XAxis).length).toEqual(1);
    expect(lineSeriesChart.find(YAxis).length).toEqual(1);
    // all 4 line charts
    expect(lineSeriesChart.find(LineSeries).length).toEqual(4);
    expect(lineSeriesChart.find(DiscreteColorLegend).length).toEqual(1);
  });
});
