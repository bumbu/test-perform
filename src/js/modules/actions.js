export const SEARCH = 'SEARCH'

function searchBy(search, keyword) {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH,
      payload: keyword,
      status: 'before'
    })
  }
}

function loadMore(search) {
  return (dispatch, getState) => {

  }
}

export const getActions = (search) => {
  return {
    searchBy: searchBy.bind(null, search),
    loadMore: loadMore.bind(null, search)
  }
}
