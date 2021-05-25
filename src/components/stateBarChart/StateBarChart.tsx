import {
  HorizontalGridLines,
  VerticalBarSeriesCanvas,
  VerticalBarSeriesPoint,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import { Accordion } from 'semantic-ui-react';
import { IVaccinationStateResponse } from '../../api/interfaces';

export type GermanyHistoryChartProps = {
  data?: IVaccinationStateResponse;
};

const StateBarChart = (props: GermanyHistoryChartProps) => {
  // map data to UI compatible values
  const barChartData = (
    data: IVaccinationStateResponse
  ): VerticalBarSeriesPoint[] => {
    const dataArray: VerticalBarSeriesPoint[] = [];
    for (const key in data) {
      const element = data[key];
      dataArray.push({ x: key, y: element.vaccinated });
    }
    return dataArray;
  };

  if (!props.data) {
    return null;
  }

  console.log(props.data);
  return (
    <>
      <div className="incident-history-accordion">
        <Accordion styled>
          <h5>States Vaccination Overview</h5>
          <XYPlot xType="ordinal" width={800} height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-30} title="state" />
            <YAxis
              title="Vaccinated"
              tickLabelAngle={30}
              tickFormat={(d) => {
                return d / 1000000 + 'Mill';
              }}
            />
            <VerticalBarSeriesCanvas
              barWidth={20}
              className="vertical-bar-series-example"
              data={barChartData(props.data)}
            />
          </XYPlot>
        </Accordion>
      </div>
    </>
  );
};

export default StateBarChart;
