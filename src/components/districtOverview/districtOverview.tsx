import { useState } from 'react';
import { Accordion } from 'semantic-ui-react';
import DistrictDropdown from '../../components/districtDropdown/DistrictDropdown';
import ConfirmedInfections from '../confirmedInfections/ConfirmedInfections';

const DistrictOverview = () => {
  const [ags, setAgs] = useState('');

  const rootPanels = [
    {
      key: 'districts',
      title: 'Districts Information',
      content: {
        content: (
          <>
            <DistrictDropdown
              onChange={(ags: string) => {
                setAgs(ags);
              }}
            />
            <ConfirmedInfections ags={ags} />
          </>
        ),
      },
    },
  ];

  return <Accordion defaultActiveIndex={0} panels={rootPanels} styled />;
};

export default DistrictOverview;
