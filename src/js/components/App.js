import React from 'react';
import Header from './Header'
import Listing from './Listing'

const App = (props) => {
  const { searchBy, loadMore, state } = props

  return (
    <div className="container">
      <Header searchBy={searchBy} />
      <Listing loadMore={loadMore} state={state} />
    </div>
  )
}

App.propTypes = {
  searchBy: React.PropTypes.func.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired,
}

export default App
