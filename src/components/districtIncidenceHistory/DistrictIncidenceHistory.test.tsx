import 'jsdom-global/register';
import { mount } from 'enzyme';
import { skipTick } from '../../util/testUtil';
import { ReadApiState } from '../../state/ReadApiState';
import { IncidenceHistoryResponse } from '../../api/interfaces';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';
import DistrictIncidenceHistory from './DistrictIncidenceHistory';
import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

describe('Tests for DistrictIncidenceHistory', () => {
  const testData: IncidenceHistoryResponse[] = [
    {
      date: '2020-03-17T00:00:00.000Z',
      weekIncidence: 11.321589757048978,
    },
    {
      date: '2020-03-16T00:00:00.000Z',
      weekIncidence: 8.233883459671983,
    },
    {
      date: '2020-03-15T00:00:00.000Z',
      weekIncidence: 7.7192657434424845,
    },
  ];

  // mock api call
  districtsApiService.getDistrictIncidenceHistory = new ReadApiState(
    jest.fn().mockImplementation(async () => Promise.resolve(testData))
  );

  const districtIncidenceHistory = mount(
    <DistrictIncidenceHistory ags="10044" />
  );

  it('renders districtIncidenceHistory with title', async () => {
    await skipTick();
    districtIncidenceHistory.update();

    expect(districtIncidenceHistory.find('h5').text()).toEqual(
      'District Incidence History'
    );
  });

  it('renders chart component XYPlot, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, LineSeries chart', async () => {
    await skipTick();
    districtIncidenceHistory.update();

    expect(districtIncidenceHistory.find(XYPlot).length).toEqual(1);
    expect(districtIncidenceHistory.find(HorizontalGridLines).length).toEqual(
      1
    );
    expect(districtIncidenceHistory.find(VerticalGridLines).length).toEqual(1);
    expect(districtIncidenceHistory.find(XAxis).length).toEqual(1);
    expect(districtIncidenceHistory.find(YAxis).length).toEqual(1);
    expect(districtIncidenceHistory.find(LineSeries).length).toEqual(1);
  });
});
