import { useEffect, useState } from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import { germanyApiService } from '../../api/germanyApi/GermanyApiService';
import { IGermanyResponse } from '../../api/interfaces';
import GermanyHistoryChart from '../../components/germanyHistoryChart/GermanyHistoryChart';
import InfoCard from '../../components/infoCard/InfoCard';
import { ReadApiStateContext } from '../../state/StateContext';

const CountryOverview = () => {
  const [days, setDays] = useState('');

  const onDaysPicked = (numberOfDays: string): void => {
    setDays(numberOfDays);
  };

  useEffect(() => {
    germanyApiService.getGermanyHistory.call();
  }, [days]);

  return (
    <div className="country-overview">
      <Accordion styled>
        <h2>Germany`s Overview</h2>
        <ReadApiStateContext state={germanyApiService.getGermanyHistory}>
          {(data: IGermanyResponse) => {
            return (
              <>
                <InfoCard title="Cases" value={data.cases} />
                <InfoCard title="Cases Per 100.000" value={data.casesPer100k} />
                <InfoCard title="7-days average" value={data.casesPerWeek} />
                <InfoCard title="Deaths" value={data.deaths} />
                <InfoCard title="R-value" value={data.r.value} />
                <InfoCard title="Recovered" value={data.recovered} />
                <InfoCard title="7-days Incidence" value={data.weekIncidence} />
              </>
            );
          }}
        </ReadApiStateContext>
        <GermanyHistoryChart days={days} />
        <h4>
          <Icon name="info circle" color="blue" /> Please pick duration to see
          overview
        </h4>
        <div className="filter-by">
          <Button content="Last 7 days" onClick={() => onDaysPicked('7')} />
          <Button content="Last Month" onClick={() => onDaysPicked('30')} />
          <Button content="Last 3 Months" onClick={() => onDaysPicked('91')} />
          <Button content="All" onClick={() => onDaysPicked('900')} />
        </div>
      </Accordion>
    </div>
  );
};

export default CountryOverview;
