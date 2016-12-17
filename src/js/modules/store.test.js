import Store from './store'

describe('(Store)', () => {
  it('getState should return default state', () => {
    const defaultState = {one: 'uno'}
    const store = new Store(()=>{}, defaultState)
    expect(store.getState()).toBe(defaultState)
  })

  describe('Dispatching an action', () => {
    it('should invoke the reducer', () => {
      const reducer = createSpy()
      const store = new Store(reducer, {})
      expect(reducer).toNotHaveBeenCalled()
      store.dispatch({})
      expect(reducer).toHaveBeenCalled()
    })

    it('should change the state with the state returned by the reducer', () => {
      const newState = {some: 'state'}
      const reducer = () => newState
      const store = new Store(reducer, {})
      store.dispatch({})
      expect(store.getState()).toBe(newState)
    })

    it('should call the onChange callback with the new state', () => {
      const spy1 = createSpy()
      const spy2 = createSpy()
      const store = new Store((action) => ({value: action.value}), {})
      store.onChange(spy1)
      store.onChange(spy2)
      expect(spy1).toNotHaveBeenCalled()
      expect(spy2).toNotHaveBeenCalled()

      // First action
      store.dispatch({value: 1})
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()

      // Second action
      store.dispatch({value: 2})
      expect(spy1.calls.length).toBe(2)
      expect(spy2.calls.length).toBe(2)
    })

    it('that doesn\'t change the state should not call the noChange callbacks', () => {
      const spy1 = createSpy()
      const defaultState = {default: true}
      const store = new Store(() => defaultState, defaultState)
      store.onChange(spy1)

      expect(spy1).toNotHaveBeenCalled()
      store.dispatch({value: 1})
      expect(spy1).toNotHaveBeenCalled()
    })
  })
})
