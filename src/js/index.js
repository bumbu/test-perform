import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './modules/store'
import Search from './modules/search'
import { getActions } from './modules/actions'
import { bindActions } from './modules/utils'

const store = new Store(() => {}, {})
const search = new Search()
const { searchBy, loadMore } = getActions(search)
const actions = bindActions({searchBy, loadMore}, store.dispatch, store.getState)

function render() {
  ReactDOM.render(
    <App {...actions} {...store.getState()}/>,
    document.getElementById('root')
  )
}

// Initial render
render()

// Subsequential renders on state change
store.onChange(() => {
  render()
})
