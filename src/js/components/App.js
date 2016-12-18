import React, { Component } from 'react';

class App extends Component {
  render() {
    const { searchBy, loadMore } = this.props

    return (
      <div className="App">
        <button onClick={searchBy}>Action</button>
        <img src="" className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;
