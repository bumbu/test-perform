import { getActions } from './actions'

describe('(Actions)', () => {
  let search
  let getState
  let dispatch
  let actions
  let searchBy
  let isLoading

  beforeEach(() => {
    search = {
      searchBy: () => Promise.resolve([{key: 1}, {key: 2}])
    }

    isLoading = false
    getState = () => ({isLoading})
    dispatch = (action) => {
      actions.push(action)
    }
    actions = []
    searchBy = getActions(search).searchBy
  })

  it('Search should dispatch before, success and after', () => {
    const query = 'test'
    return searchBy(query)(dispatch, getState)
      .then(() => {
        expect(actions.length).toBe(3)
        expect(actions).toEqual([
          {type: 'SEARCH', payload: query, status: 'before'},
          {type: 'SEARCH', payload: [{key: 1}, {key: 2}], status: 'success'},
          {type: 'SEARCH', payload: query, status: 'after'}
        ])
      })
  })

  it('Failed search should dispatch before, error and after', () => {
    search.searchBy = () => Promise.reject('test error')
    const query = 'test'
    return searchBy(query)(dispatch, getState)
      .then(() => {
        expect(actions.length).toBe(3)
        expect(actions).toEqual([
          {type: 'SEARCH', payload: query, status: 'before'},
          {type: 'SEARCH', payload: 'test error', status: 'error'},
          {type: 'SEARCH', payload: query, status: 'after'}
        ])
      })
  })

  it('If state is currently loading then abort', () => {
    isLoading = true
    const query = 'test'
    expect(searchBy(query)(dispatch, getState)).toNotExist()
  })

  // INFO loadMore is tested in the same way
})
