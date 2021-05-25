import 'jsdom-global/register';
import { mount } from 'enzyme';
import InfoCard, { InfoCardProps } from './InfoCard';

describe('Tests for InfoCard', () => {
  const testData: InfoCardProps = {
    title: 'Cases',
    value: 164841,
  };
  const infoCard = mount(
    <InfoCard title={testData.title} value={testData.value} />
  );

  it('renders germanyHistoryChart with correct title and value', async () => {
    expect(infoCard.find('h5').text()).toEqual(testData.title);
    expect(infoCard.find('p').at(1).text()).toEqual('1,65,000');
  });
});
