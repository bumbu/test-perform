import React from 'react';
import App from './App';
import { shallow, mount, render } from 'enzyme'
import Header from './Header'
import Listing from './Listing'

describe('(App)', () => {
  const noop = () => {}
  const obj = {}

  it('renders', () => {
    const wrapper = shallow(<App searchBy={noop} loadMore={noop} state={obj} />);
  })

  it('contains Header and Listing components', () => {
    const wrapper = shallow(<App searchBy={noop} loadMore={noop} state={obj} />);
    expect(wrapper.find(Header).length).toBe(1)
    expect(wrapper.find(Listing).length).toBe(1)
  })
})
