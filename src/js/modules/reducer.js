import { SEARCH } from './actions'

export const reducer = (state, action) => {
  const resetItems = action.type === SEARCH ? true : false

  if (action.status === 'before') {
    // Set state as loading
    // Reset items if it is a search
    if (action.payload !== state.keyword) {
      state = Object.assign({}, state, {
        items: resetItems ? [] : state.items,
        keyword: action.payload
      })
    }

    if (!state.isLoading) {
      state = Object.assign({}, state, {isLoading: true})
    }
  } else if (action.status === 'after') {
    // Set state as not loading
    if (state.isLoading) {
      state = Object.assign({}, state, {isLoading: false})
    }
  } else if (action.status === 'success') {
    // Update items list
    // Replace items list if it was a search
    state = Object.assign({}, state, {
      items: resetItems ? action.payload : state.items.concat(action.payload)
    })
  }

  return state
}
