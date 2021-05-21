import { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import DistrictDropdown from '../../components/districtDropdown/DistrictDropdown';
import District from '../../components/district/District';
import DistrictsIncidenceHistory from '../../components/districtIncidenceHistory/DistrictIncidenceHistory';

const DistrictOverview = () => {
  const [ags, setAgs] = useState('');

  return (
    <>
      <div className="district-overview">
        <Accordion styled>
          <h2>Districts Information</h2>
          <DistrictDropdown
            onChange={(ags: string) => {
              setAgs(ags);
            }}
          />
          <District ags={ags} />
          <DistrictsIncidenceHistory ags={ags} />
        </Accordion>
      </div>
    </>
  );
};

export default DistrictOverview;
