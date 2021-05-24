import { useEffect, useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import { germanyApiService } from 'src/api/germanyApi/GermanyApiService';
import {
  IDeathHistoryResponse,
  IGermanyCasesHistoryResponse,
  IncidenceHistoryResponse,
  IRecoveredHistoryResponse,
} from 'src/api/interfaces';
import LineSeriesChart from '../lineSeriesChart/LineSeriesChart';

type GermanyHistoryChartProps = {
  days?: string;
};

const GermanyHistoryChart = (props: GermanyHistoryChartProps) => {
  const [cases, setCases] = useState<
    IGermanyCasesHistoryResponse[] | undefined
  >([]);

  const [incidences, setIncidences] = useState<
    IncidenceHistoryResponse[] | undefined
  >([]);

  const [recoveries, setRecoveries] = useState<
    IRecoveredHistoryResponse[] | undefined
  >([]);

  const [deaths, setDeaths] = useState<IDeathHistoryResponse[] | undefined>([]);

  useEffect(() => {
    if (props.days) {
      germanyApiService.getGermanyRecoveryHistory.call(props.days);
    } else {
      germanyApiService.getGermanyRecoveryHistory.call();
    }

    const recoveriesHistory = germanyApiService.getGermanyRecoveryHistory.data;
    setRecoveries(recoveriesHistory);
  }, [props.days]);

  useEffect(() => {
    if (props.days) {
      germanyApiService.getGermanyCasesHistory.call(props.days);
    } else {
      germanyApiService.getGermanyCasesHistory.call();
    }
    const casesHistory = germanyApiService.getGermanyCasesHistory.data;
    setCases(casesHistory);
  }, [props.days]);

  useEffect(() => {
    if (props.days) {
      germanyApiService.getGermanyIncidenceHistory.call(props.days);
    } else {
      germanyApiService.getGermanyIncidenceHistory.call();
    }

    const incidencesHistory = germanyApiService.getGermanyIncidenceHistory.data;
    setIncidences(incidencesHistory);
  }, [props.days]);

  useEffect(() => {
    if (props.days) {
      germanyApiService.getGermanyDeathsHistory.call(props.days);
    } else {
      germanyApiService.getGermanyDeathsHistory.call();
    }

    const deathsHistory = germanyApiService.getGermanyDeathsHistory.data;
    setDeaths(deathsHistory);
  }, [props.days]);

  if (!props.days) {
    return null;
  }

  return (
    <>
      <div className="incident-history-accordion">
        <Accordion styled>
          <h5>Germany`s History Overview</h5>
          <LineSeriesChart
            cases={cases ? cases : []}
            incidences={incidences ? incidences : []}
            deaths={deaths ? deaths : []}
            recoveries={recoveries ? recoveries : []}
          />
        </Accordion>
      </div>
    </>
  );
};

export default GermanyHistoryChart;
