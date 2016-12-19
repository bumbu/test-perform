import React, { Component } from 'react';

class Header extends Component {
  state = {
    searchValue: ''
  }

  render() {
    const { searchBy } = this.props
    const { searchValue } = this.state

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Search for the movies</h1>
        </div>
        <div className="col-sm-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              value={searchValue}
              onChange={(ev) => this._onInputChange(ev)}
              />
            <span className="input-group-btn">
              <button
                className="btn btn-default2 btn-primary"
                type="button"
                onClick={() => this._onSearch()}
                >Search</button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  _onInputChange(ev) {
    this.setState({searchValue: ev.target.value})
  }

  _onSearch() {
    this.props.searchBy(this.state.searchValue)
  }
}

Header.propTypes = {
  searchBy: React.PropTypes.func.isRequired,
}

export default Header;
