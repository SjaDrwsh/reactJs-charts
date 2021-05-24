import 'jest-enzyme';
import 'raf/polyfill';
import 'jsdom-global/register';
import App from './App';
import { mount } from 'enzyme';
import MainPage from './pages/mainPage/MainPage';

describe('Tests for App', () => {
  jest.useFakeTimers();
  it('renders app', () => {
    const app = mount(<App />);
    expect(app).toBeDefined();
  });

  it('renders correct className', () => {
    const app = mount(<App />);
    expect(app.hasClass('app')).toBeDefined();
  });

  it('renders MainPage', () => {
    const app = mount(<App />);
    expect(app.find(MainPage).length).toEqual(1);
  });
});
