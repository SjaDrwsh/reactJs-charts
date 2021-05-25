import { GermanyHistoryChartProps } from 'src/components/stateBarChart/StateBarChart';
import { LineSeriesChartProps } from '../components/lineSeriesChart/LineSeriesChart';

export function lineSeriesChartMock(): LineSeriesChartProps {
  return {
    cases: [
      {
        cases: 84,
        date: '2020-03-03T00:00:00.000Z',
      },
      {
        cases: 24,
        date: '2020-02-27T00:00:00.000Z',
      },
      {
        cases: 1,
        date: '2020-01-07T00:00:00.000Z',
      },
    ],
    deaths: [
      {
        deaths: 84,
        date: '2020-03-03T00:00:00.000Z',
      },
      {
        deaths: 24,
        date: '2020-02-27T00:00:00.000Z',
      },
      {
        deaths: 1,
        date: '2020-01-07T00:00:00.000Z',
      },
    ],
    incidences: [
      {
        weekIncidence: 84,
        date: '2020-03-03T00:00:00.000Z',
      },
      {
        weekIncidence: 24,
        date: '2020-02-27T00:00:00.000Z',
      },
      {
        weekIncidence: 1,
        date: '2020-01-07T00:00:00.000Z',
      },
    ],
    recoveries: [
      {
        recovered: 84,
        date: '2020-03-03T00:00:00.000Z',
      },
      {
        recovered: 24,
        date: '2020-02-27T00:00:00.000Z',
      },
      {
        recovered: 1,
        date: '2020-01-07T00:00:00.000Z',
      },
    ],
  };
}

export function StateBarChartMockData(): GermanyHistoryChartProps {
  return {
    data: {
      BB: {
        administeredVaccinations: 1264342,
        vaccinated: 892386,
        vaccination: {
          biontech: 605219,
          moderna: 67878,
          astraZeneca: 219289,
        },
      },
      SH: {
        administeredVaccinations: 1264342,
        vaccinated: 892386,
        vaccination: {
          biontech: 605219,
          moderna: 67878,
          astraZeneca: 219289,
        },
      },
    },
  };
}
