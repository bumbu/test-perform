import { reducer } from './reducer'
import { SEARCH, LOAD_MORE } from './actions'

describe('(Reducer)', () => {
  let state
  beforeEach(() => {
    state = {
      items: [{key: 1}, {key: 2}],
      isLoading: false,
      keyword: 'old',
    }
  })

  it('before search should update items, keyword and isLoading', () => {
    const newState = reducer(state, {
      type: SEARCH,
      payload: 'new',
      status: 'before'
    })

    expect(newState).toEqual(Object.assign(state, {items: [], isLoading: true, keyword: 'new'}))
  })

  it('before loadMore should update isLoading', () => {
    const newState = reducer(state, {
      type: LOAD_MORE,
      payload: state.keyword,
      status: 'before'
    })

    expect(newState).toEqual(Object.assign(state, {isLoading: true}))
  })

  it('after should update isLoading', () => {
    state.isLoading = true
    const newState = reducer(state, {
      type: SEARCH,
      payload: 'new',
      status: 'after'
    })

    expect(newState).toEqual(Object.assign(state, {isLoading: false}))
  })

  it('seach success should update items', () => {
    const newState = reducer(state, {
      type: SEARCH,
      payload: [{key: 3}],
      status: 'success'
    })

    expect(newState).toEqual(Object.assign(state, {items: [{key: 3}], isLoading: false}))
  })

  it('loadMore success should update items', () => {
    const newState = reducer(state, {
      type: LOAD_MORE,
      payload: [{key: 3}],
      status: 'success'
    })

    expect(newState).toEqual(Object.assign(state, {items: state.items.concat({key: 3}), isLoading: false}))
  })
})
