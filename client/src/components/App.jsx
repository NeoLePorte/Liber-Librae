import React, { Component } from 'react';
import '../css/App.css';
import HomePage from './Home/HomePage';
import Footer from './Footer';
import About from './About/About';
import Contact from './Contact/Contact';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <React.Fragment>
        <div className="App">
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          {/* <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} /> */}
        </div>
        <Footer />
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
