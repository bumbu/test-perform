export const SEARCH = 'SEARCH'
export const LOAD_MORE = 'LOAD_MORE'

/**
 * Search by
 *
 * @param  {Search} search  Search instance
 * @param  {string} keyword
 * @return {Function}       Function that is meant to be binded to state methods
 */
function searchBy(search, keyword) {
  return (dispatch, getState) => {
    if (getState().isLoading) return null // shortcircuit

    dispatch({
      type: SEARCH,
      payload: keyword,
      status: 'before'
    })

    return search.searchBy(keyword)
      .then((data) => {
        dispatch({
          type: SEARCH,
          payload: data,
          status: 'success'
        })
      })
      .catch((err) => {
        dispatch({
          type: SEARCH,
          payload: err,
          status: 'error'
        })
      })
      .then(() => {
        dispatch({
          type: SEARCH,
          payload: keyword,
          status: 'after'
        })
      })
  }
}

/**
 * Search by
 *
 * @param  {Search} search  Search instance
 * @return {Function}       Function that is meant to be binded to state methods
 */
function loadMore(search) {
  return (dispatch, getState) => {
    if (getState().isLoading) return null // shortcircuit

    dispatch({
      type: LOAD_MORE,
      payload: null,
      status: 'before'
    })

    return search.loadMore()
      .then((data) => {
        dispatch({
          type: LOAD_MORE,
          payload: data,
          status: 'success'
        })
      })
      .catch((err) => {
        dispatch({
          type: LOAD_MORE,
          payload: err,
          status: 'error'
        })
      })
      .then(() => {
        dispatch({
          type: LOAD_MORE,
          payload: null,
          status: 'after'
        })
      })
  }
}

/**
 * Bind search object to actions
 *
 * @param  {Search} search Search instance
 * @return {Object{searchBy, loadMore}}
 */
export const getActions = (search) => {
  return {
    searchBy: searchBy.bind(null, search),
    loadMore: loadMore.bind(null, search)
  }
}
