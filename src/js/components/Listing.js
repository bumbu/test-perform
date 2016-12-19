import React, { Component } from 'react';
import Item from './ListingItem'
import LoadMore from './ListingLoadMore'
import NoResults from './ListingNoResults'
import Loading from './ListingLoading'

class Listing extends Component {
  render() {
    const { loadMore, state } = this.props

    return (
      <div className="row">
        <div className="col-sm-12 search-results">
          {state.items.map(item => <Item item={item} key={item.id} />)}
          {!state.isLoading && !state.items.length ? <NoResults /> : null}
          {!state.isLoading ? <LoadMore loadMore={loadMore} /> : null}
          {state.isLoading ? <Loading /> : null}
        </div>
      </div>
    )
  }
}

Listing.propTypes = {
  loadMore: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired,
}

export default Listing;
