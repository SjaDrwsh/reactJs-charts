import { useEffect } from 'react';
import { Accordion } from 'semantic-ui-react';
import { IVaccinationResponse } from '../../api/interfaces';
import { vaccinationsApiService } from '../../api/vaccinationsApi/VaccinationsApiService';
import InfoCard from '../../components/infoCard/InfoCard';
import StateBarChart from '../../components/stateBarChart/StateBarChart';
import { ReadApiStateContext } from '../../state/StateContext';

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
              </>
            );
          }}
        </ReadApiStateContext>
      </Accordion>
    </div>
  );
};

export default VaccinationsOverview;
