import 'jsdom-global/register';
import { mount } from 'enzyme';
import MainPage from './MainPage';
import { MenuItem, Tab } from 'semantic-ui-react';

describe('Tests for MainPage', () => {
  it('renders MainPage', () => {
    const mainPage = mount(<MainPage />);
    expect(mainPage).toBeDefined();
  });

  it('renders Tab with three Menu items', () => {
    const mainPage = mount(<MainPage />);
    expect(mainPage.find(Tab).length).toEqual(1);
    expect(mainPage.find(MenuItem).length).toEqual(3);

    // Germany`s overview
    const germanyOverviewMenu = mainPage
      .find(MenuItem)
      .filterWhere((x) => x.props().content === 'Germany Overview');
    expect(germanyOverviewMenu.length).toEqual(1);

    // Districts Overview
    const districtsOverviewMenu = mainPage
      .find(MenuItem)
      .filterWhere((x) => x.props().content === 'Districts Overview');
    expect(districtsOverviewMenu.length).toEqual(1);

    // Vaccination overview
    const vaccinationOverviewMenu = mainPage
      .find(MenuItem)
      .filterWhere((x) => x.props().content === 'Vaccination');
    expect(vaccinationOverviewMenu.length).toEqual(1);
  });
});
