import 'jsdom-global/register';
import { mount } from 'enzyme';
import DistrictOverview from './DistrictOverview';
import DistrictsIncidenceHistory from '../../components/districtIncidenceHistory/DistrictIncidenceHistory';
import District from '../../components/district/District';

describe('Tests for DistrictOverview', () => {
  const districtOverview = mount(<DistrictOverview />);

  it('renders title correctly', () => {
    expect(districtOverview.find('h2').text()).toEqual('Districts Information');
  });

  it('renders District', () => {
    expect(districtOverview.find(District).length).toEqual(1);
  });

  it('renders DistrictsIncidenceHistory', () => {
    expect(districtOverview.find(DistrictsIncidenceHistory).length).toEqual(1);
  });
});
