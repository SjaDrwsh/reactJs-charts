import { useEffect } from 'react';
import { Accordion } from 'semantic-ui-react';
import { IVaccinationResponse } from 'src/api/interfaces';
import { vaccinationsApiService } from 'src/api/vaccinationsApi/VaccinationsApiService';
import InfoCard from 'src/components/infoCard/InfoCard';
import StateBarChart from 'src/components/stateBarChart/StateBarChart';
import { ReadApiStateContext } from 'src/state/StateContext';

const VaccinationsOverview = () => {
  useEffect(() => {
    vaccinationsApiService.getVaccinations.call();
  });

  return (
    <div className="country-overview">
      <Accordion styled>
        <h2>Vaccination Overview</h2>
        <ReadApiStateContext state={vaccinationsApiService.getVaccinations}>
          {(data: IVaccinationResponse) => {
            return (
              <>
                <InfoCard
                  title="Administered Vaccinations"
                  value={data.administeredVaccinations}
                />
                <InfoCard title="Vaccinated" value={data.vaccinated} />
                <StateBarChart data={data.states} />
                {/* state vaccinated people bar chart also on click vaccination type by state */}
                {/* vaccination type pie chart */}
              </>
            );
          }}
        </ReadApiStateContext>
      </Accordion>
    </div>
  );
};

export default VaccinationsOverview;
