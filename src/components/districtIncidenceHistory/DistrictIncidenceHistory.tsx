import { useEffect } from 'react';
import { Accordion } from 'semantic-ui-react';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';
import { IncidenceHistoryResponse } from '../../api/interfaces';
import { ReadApiStateContext } from '../../state/StateContext';
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

type DistrictIncidenceHistoryProps = {
  ags: string;
};

const DistrictIncidenceHistory = (props: DistrictIncidenceHistoryProps) => {
  useEffect(() => {
    if (props.ags.length) {
      districtsApiService.getDistrictIncidenceHistory.call(props.ags);
    }
  }, [props.ags]);

  if (!props.ags) {
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

  return (
    <ReadApiStateContext
      state={districtsApiService.getDistrictIncidenceHistory}
    >
      {(data: IncidenceHistoryResponse[]) => {
        return (
          <div className="incident-history-accordion">
            <Accordion styled>
              <h5>District Incidence History</h5>
              <XYPlot xType="time" width={800} height={400}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis
                  title="Incidences"
                  tickFormat={function tickFormat(d) {
                    const date = new Date(d);
                    return `${months[new Date(date).getMonth()]} ${new Date(
                      date
                    ).getFullYear()}`.toString();
                  }}
                  tickLabelAngle={-30}
                />
                <YAxis title="Date" />
                <LineSeries
                  data={data.map((element) => {
                    return {
                      x: new Date(element.date).getTime() + MSEC_DAILY,
                      y: element.weekIncidence,
                    };
                  })}
                />
              </XYPlot>
            </Accordion>
          </div>
        );
      }}
    </ReadApiStateContext>
  );
};

export default DistrictIncidenceHistory;
