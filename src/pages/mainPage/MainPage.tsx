import { Tab } from 'semantic-ui-react';
import CountryOverview from '../countryOverview/CountryOverview';
import DistrictOverview from '../districtOverview/DistrictOverview';
import VaccinationsOverview from '../vaccinationsOverview/VaccinationsOverview';

const MainPage = () => {
  const panes = [
    {
      menuItem: 'Germany Overview',
      render: () => (
        <Tab.Pane attached={false}>
          <CountryOverview />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Districts Overview',
      render: () => (
        <Tab.Pane attached={false}>
          <DistrictOverview />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Vaccination',
      render: () => (
        <Tab.Pane attached={false}>
          <VaccinationsOverview />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="main-page">
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  );
};

export default MainPage;
