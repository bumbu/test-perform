import React, { Component } from 'react';

class ListingLoadMore extends Component {
  render() {
    const { loadMore } = this.props

    return (
      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={loadMore}>Load more</button>
      </div>
    )
  }
}

ListingLoadMore.propTypes = {
  loadMore: React.PropTypes.func.isRequired,
}

export default ListingLoadMore;
