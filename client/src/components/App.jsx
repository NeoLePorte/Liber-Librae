import React, { Component } from 'react';
import '../css/App.css';
import Homepage from './HomePage'




class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
        <Homepage />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
