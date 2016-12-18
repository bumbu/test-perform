/**
 * Binds actions so that when executed:
 * - actions will get called with original arguments
 * - returned functions will get called with dispatch and getState
 *
 * @param  {Object} actions    Object of actions to bind
 * @param  {Function} dispatch Store's dispatch method
 * @param  {Function} getState Store's getState method
 * @return {Object}            Binded actions
 */
export const bindActions = (actions, dispatch, getState) => {
  const bindedActions = {}
  for (let key in actions) {
    bindedActions[key] = (...args) => {
      return actions[key].call(null, ...args).call(null, dispatch, getState)
    }
  }
  return bindedActions
}
