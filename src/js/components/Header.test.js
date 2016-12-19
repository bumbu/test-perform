import React from 'react';
import Header from './Header'
import { shallow, mount, render } from 'enzyme'

describe('(Header)', () => {
  let noop
  beforeEach(() => {
    noop = createSpy()
  })

  it('renders', () => {
    const wrapper = shallow(<Header searchBy={noop} />)
  })

  it('clicking on button should work', () => {
    const wrapper = shallow(<Header searchBy={noop} />)
    wrapper.find('button').simulate('click')
    expect(noop).toHaveBeenCalled()
  })

  it('clicking on button should send current input value', () => {
    const wrapper = mount(<Header searchBy={noop} />)
    wrapper.find('input').simulate('change', {target: {value: 'new'}})
    wrapper.find('button').simulate('click')
    expect(noop).toHaveBeenCalled()
    expect(noop.calls[0].arguments).toEqual(['new'])
  })
})
