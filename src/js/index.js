import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './modules/store'
import Search from './modules/search'
import { getActions } from './modules/actions'
import { bindActions } from './modules/utils'
import { reducer } from './modules/reducer'
import request from 'superagent'
import { SEACH_API, API_KEY } from './config'

const defaultState = {
  items: [],
  isLoading: false,
  keyword: '',
}
const store = new Store(reducer, defaultState)
const search = new Search(request, SEACH_API, API_KEY)
const { searchBy, loadMore } = getActions(search)
const actions = bindActions({searchBy, loadMore}, store.dispatch, store.getState)

function render() {
  const state = store.getState()
  ReactDOM.render(
    <App {...actions} state={state}/>,
    document.getElementById('root')
  )
}

// Initial render
render()

// Subsequential renders on state change
store.onChange(() => {
  render()
})
