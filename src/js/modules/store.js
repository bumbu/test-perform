class Store {
  /**
   * Store constructor
   *
   * @constructor
   * @param  {Function} reducer      Reducer function accepts old state and an action, and returns the new state
   * @param  {Object} defaultState
   */
  constructor(reducer, defaultState = {}) {
    this._state = defaultState
    this._reducer = reducer
    this._cbs = []

    this.dispatch = this.dispatch.bind(this)
    this.getState = this.getState.bind(this)
  }

  /**
   * Dispatch an action
   * Actions are consumed by reducers
   *
   * @param  {Object} action
   */
  dispatch(action = {}) {
    const newState = this._reducer(this._state, action)
    if (newState !== this._state) {
      this._state = newState
      this._triggerChanges(this._state)
    }
  }

  /**
   * Register change listeners
   *
   * @param  {Function} cb
   */
  onChange(cb) {
    this._cbs.push(cb)
  }

  /**
   * Call all registered listeners with the new state
   *
   * @private
   * @param  {Object} state   State to send to callbacks
   */
  _triggerChanges(state) {
    this._cbs.forEach((cb) => {
      cb(state)
    })
  }

  /**
   * Returns the state
   *
   * @return {Object}
   */
  getState() {
    return this._state
  }
}

export default Store;
