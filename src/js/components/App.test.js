import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('enzyme', () => {
  expect(shallow(<App />).contains(<img src="" className="App-logo" alt="logo" />)).toBe(true);
});
