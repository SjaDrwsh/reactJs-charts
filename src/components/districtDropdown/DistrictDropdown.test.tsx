import 'jsdom-global/register';
import { mount } from 'enzyme';
import { skipTick } from '../../util/testUtil';
import { ReadApiState } from '../../state/ReadApiState';
import { IDistrictsNameResponse } from '../../api/interfaces';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';
import DistrictDropdown from './DistrictDropdown';
import { Dropdown, DropdownItem } from 'semantic-ui-react';

describe('Tests for DistrictDropdown', () => {
  const testData: IDistrictsNameResponse[] = [
    {
      ags: '01055',
      name: 'Ostholstein',
    },
    {
      ags: '01001',
      name: 'Flensburg',
    },
  ];

  // mock api call
  districtsApiService.getDistricts = new ReadApiState(
    jest.fn().mockImplementation(async () => Promise.resolve(testData))
  );

  const districtDropdown = mount(<DistrictDropdown onChange={jest.fn()} />);

  it('renders Dropdown with two DropdownItems', async () => {
    await skipTick();
    districtDropdown.update();

    expect(districtDropdown.find(Dropdown).length).toEqual(1);
    expect(districtDropdown.find(DropdownItem).length).toEqual(2);
  });

  it('renders Dropdown Items correctly based on mocked api data', async () => {
    await skipTick();
    districtDropdown.update();
    const firstDropdownItem = districtDropdown.find(DropdownItem).at(0);

    expect(firstDropdownItem.text()).toEqual('Ostholstein');
    expect(firstDropdownItem.props().value).toEqual('01055');

    const secondDropdownItem = districtDropdown.find(DropdownItem).at(1);

    expect(secondDropdownItem.text()).toEqual('Flensburg');
    expect(secondDropdownItem.props().value).toEqual('01001');
  });
});
