import { useEffect } from 'react';
import { Accordion } from 'semantic-ui-react';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';
import { IDistrictsResponse } from '../../api/interfaces';
import { ReadApiStateContext } from '../../state/StateContext';

type ConfirmedInfectionsProps = {
  ags: string;
};

const ConfirmedInfections = (props: ConfirmedInfectionsProps) => {
  console.log(props.ags);
  useEffect(() => {
    if (props.ags.length) {
      districtsApiService.getDistrict.call(props.ags);
    }
  }, [props.ags]);

  if (!props.ags) {
    return null;
  }

  const toDecimal = (number: string): string => {
    const value = Number(parseFloat(number).toFixed(2));
    return Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );
  };

  return (
    <ReadApiStateContext state={districtsApiService.getDistrict}>
      {(data: IDistrictsResponse) => {
        return (
          <div className="district-accordion">
            <Accordion styled>
              <h5>Confirmed New Infections</h5>
              <p className="title">7-day Average</p>
              <p>{toDecimal(data.casesPerWeek)}</p>
              <p className="title">Up to yesterday</p>
              <p>{toDecimal(data.weekIncidence)}</p>
              <p className="title">Total</p>
              <p>{toDecimal(data.cases)}</p>
            </Accordion>
            <Accordion styled className="district-accordion">
              <h5>7-day Incidence</h5>
              <p className="title">Total</p>
              <p>{toDecimal(data.casesPer100k)}</p>
              <small>confirmed new infections per 100.000 residents</small>
            </Accordion>
          </div>
        );
      }}
    </ReadApiStateContext>
  );
};

export default ConfirmedInfections;
