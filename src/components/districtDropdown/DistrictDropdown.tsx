import { useEffect } from 'react';
import { DropdownItemProps, Dropdown } from 'semantic-ui-react';
import { districtsApiService } from '../../api/districtsApi/DistrictsApiService';
import { IDistrictsNameResponse } from '../../api/interfaces';
import { ReadApiStateContext } from '../../state/StateContext';

type DistrictDropdownProps = {
  onChange: (value: string) => void;
};

const DistrictDropdown = (props: DistrictDropdownProps) => {
  useEffect(() => {
    districtsApiService.getDistricts.call();
  });

  return (
    <ReadApiStateContext state={districtsApiService.getDistricts}>
      {(data: IDistrictsNameResponse[]) => {
        // prepare drop-down options
        const districtOptions: DropdownItemProps[] = data.map((district) => {
          return {
            text: district.name,
            value: district.ags,
          };
        });

        return (
          <>
            <h4>Select your district to get needed information</h4>
            <Dropdown
              placeholder="Select District"
              options={districtOptions}
              search
              selection
              onChange={(_e, data) => {
                props.onChange(data.value as string);
              }}
            />
          </>
        );
      }}
    </ReadApiStateContext>
  );
};

export default DistrictDropdown;
