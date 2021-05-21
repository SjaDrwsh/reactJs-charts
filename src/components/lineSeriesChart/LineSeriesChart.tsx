import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeriesPoint,
  DiscreteColorLegend,
} from 'react-vis';
import {
  IDeathHistoryResponse,
  IGermanyCasesHistoryResponse,
  IncidenceHistoryResponse,
  IRecoveredHistoryResponse,
} from 'src/api/interfaces';

type LineSeriesChartProps = {
  cases: IGermanyCasesHistoryResponse[];
  incidences: IncidenceHistoryResponse[];
  deaths: IDeathHistoryResponse[];
  recoveries: IRecoveredHistoryResponse[];
};

type AllowedKeys = 'recovered' | 'deaths' | 'cases' | 'weekIncidence';

type LineSeriesChartData = Partial<
  {
    [key in AllowedKeys]: number;
  }
> & {
  date: string;
};

function LineSeriesChart(props: LineSeriesChartProps) {
  const { cases, deaths, incidences, recoveries } = props;

  if (!cases && !deaths && !incidences && !recoveries) {
    return null;
  }

  const MSEC_DAILY = 86400000;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  /** convert data coming into UI line charts compatible */
  function mapDataToLineChartData<T extends LineSeriesChartData>(
    data: T[],
    type: AllowedKeys
  ): LineSeriesPoint[] {
    return data.map((element: T) => {
      return {
        x: new Date(element['date']).getTime() + MSEC_DAILY,
        y: element[type] ?? -1,
      };
    });
  }

  const items = [
    {
      title: 'cases',
      color: 'black',
    },
    {
      title: 'deaths',
      color: 'red',
    },
    {
      title: 'recovered',
      color: 'orange',
    },
    {
      title: 'weekIncidence',
      color: 'purple',
    },
  ];

  return (
    <div className="line-chart-container">
      <XYPlot xType="time" width={800} height={400}>
        <HorizontalGridLines />
        <VerticalGridLines />

        <XAxis
          title="date"
          tickFormat={function tickFormat(d) {
            const date = new Date(d);
            return `${months[new Date(date).getMonth()]} ${new Date(
              date
            ).getFullYear()}`.toString();
          }}
          tickLabelAngle={-30}
        />
        <YAxis title="count" tickLabelAngle={45} />

        {cases && (
          <LineSeries
            color="black"
            data={mapDataToLineChartData(cases, 'cases')}
          />
        )}
        {deaths && (
          <LineSeries
            color="red"
            data={mapDataToLineChartData(deaths, 'deaths')}
          />
        )}
        {recoveries && (
          <LineSeries
            color="orange"
            data={mapDataToLineChartData(recoveries, 'recovered')}
          />
        )}
        {incidences && (
          <LineSeries
            color="purple"
            data={mapDataToLineChartData(incidences, 'weekIncidence')}
          />
        )}
      </XYPlot>
      <DiscreteColorLegend
        orientation="vertical"
        height={200}
        width={300}
        items={items}
      />
    </div>
  );
}

export default LineSeriesChart;
