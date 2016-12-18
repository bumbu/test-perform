import { bindActions } from './utils'

describe('(Utils)', () => {
  const noop = () => {}

  it('bindActions should return an object with the same actions', () => {
    const defaultActions = {
      first: () => {},
      second: () => {}
    }
    const bindedActions = bindActions(defaultActions, noop, noop)
    expect(bindedActions).toIncludeKeys(['first', 'second'])
  })

  it('binded actions should pass on original arguments', () => {
    const defaultActions = {
      firstAction: createSpy().andReturn(noop)
    }
    const { firstAction } = bindActions(defaultActions, noop, noop)

    expect(defaultActions.firstAction).toNotHaveBeenCalled()

    firstAction(2)
    expect(defaultActions.firstAction).toHaveBeenCalled()
    expect(defaultActions.firstAction.calls[0].arguments).toEqual([2])

    firstAction('action', {type: 'TEST'})
    expect(defaultActions.firstAction.calls.length).toBe(2)
    expect(defaultActions.firstAction.calls[1].arguments).toEqual(['action', {type: 'TEST'}])
  })

  it('functions returned by actions should recieve getState and dispatch arguments', () => {
    const actionFn = createSpy()
    const dispatch = () => {}
    const getState = () => {}
    const defaultActions = {
      firstAction: () => actionFn
    }
    const { firstAction } = bindActions(defaultActions, dispatch, getState)

    expect(actionFn).toNotHaveBeenCalled()

    firstAction(2)
    expect(actionFn).toHaveBeenCalled()
    expect(actionFn.calls[0].arguments).toEqual([dispatch, getState])
  })
})
