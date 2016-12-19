import React from 'react';
import Listing from './Listing'
import { shallow, mount, render } from 'enzyme'
import Item from './ListingItem'
import LoadMore from './ListingLoadMore'
import NoResults from './ListingNoResults'
import Loading from './ListingLoading'

describe('(Listing)', () => {
  let noop
  let state

  beforeEach(() => {
    noop = createSpy()
    state = {
      items: [],
      isLoading: false,
    }
  })

  it('renders', () => {
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
  })

  it('renders items if any available', () => {
    state.isLoading = false
    state.items = [{id: 1}, {id: 2}]
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
    expect(wrapper.find(Item).length).toBe(2)
  })

  it('renders no items if no items and not loading', () => {
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
    expect(wrapper.find(Item).length).toBe(0)
    expect(wrapper.find(NoResults).length).toBe(1)
  })

  it('doesn\'t render no items if no items and loading', () => {
    state.isLoading = true
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
    expect(wrapper.find(NoResults).length).toBe(0)
  })

  it('renders load more if not loading and some items', () => {
    state.isLoading = false
    state.items = [{id: 1}, {id: 2}]
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
    expect(wrapper.find(LoadMore).length).toBe(1)
  })

  it('renders loading if loading', () => {
    state.isLoading = true
    const wrapper = shallow(<Listing loadMore={noop} state={state}/>)
    expect(wrapper.find(Loading).length).toBe(1)
  })
})
