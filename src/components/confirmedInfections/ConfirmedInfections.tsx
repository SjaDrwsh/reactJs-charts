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

  return (
    <ReadApiStateContext state={districtsApiService.getDistrict}>
      {(data: IDistrictsResponse) => {
        return (
          <>
            <Accordion styled className="district-accordion">
              <h5>Confirmed New Infections</h5>
              7-day Average {data.casesPerWeek}
              Total {data.cases}
            </Accordion>
            <Accordion styled className="district-accordion">
              <h5>7-day Incidence</h5>
              up to yesterday 7-day Incidence {data.weekIncidence}
              {data.casesPer100k}
              confirmed new infections 100.000 residents
            </Accordion>
          </>
        );
      }}
    </ReadApiStateContext>
  );
};

export default ConfirmedInfections;
