import React, { Component } from 'react';

class ListingItem extends Component {
  render() {
    const { item } = this.props
    const imgSrc = `https://image.tmdb.org/t/p/w185/${item.poster_path}`
    const url = `https://www.themoviedb.org/movie/${item.id}`

    return (
      <div className="panel panel-default">
        <div className="panel-heading">{item.title} ({item.release_date})</div>
        <div className="panel-body">
          {item.poster_path ? <a href={url} className="search-results__thumbnail thumbnail pull-left">
            <img src={imgSrc} alt="Thumbnail" />
          </a> : null}
          <p>{item.overview}</p>
        </div>
      </div>
    )
  }
}

ListingItem.propTypes = {
  item: React.PropTypes.object.isRequired,
}

export default ListingItem;
