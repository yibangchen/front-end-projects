import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ArticleBlock from './ArticleBlock/ArticleBlock';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const content = {}

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />
        <Footer />
        
      </div>
    );
  }
}

export default App;
