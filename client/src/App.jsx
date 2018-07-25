import React, { Component } from 'react';
import './css/App.css';
import HomePage from './components/Home/HomePage';
import Footer from './components/Footer';
import BookPage from './components/BookPage';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Animated } from "react-animated-css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route  path="/book-info/:title" component={BookPage} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
        </div>
        </Animated>
        <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default  App;
