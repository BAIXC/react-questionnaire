import React from 'react';
import { Provider } from 'react-redux';
import { 
  HashRouter as Router,
  Route
} from 'react-router-dom';
import store from '../../Store/store'
import Header from '../Header/Header.js';
import { view as Home } from '../Home/';
import { view as Edit } from '../Edit/';
import { view as CheckData } from '../CheckData/';
import { view as Fill } from '../Fill/';
import Main from '../Main/Main.js';
import './reset.css';

const App = () => (
  <Provider store = { store }>
    <Router>
    <div>
      <Header/>
      <Main>
        <Route exact path = '/' component = {Home}></Route>
        <Route path = '/checkData' component = {CheckData}></Route>
        <Route path = '/edit' component = {Edit}></Route>
        <Route path = '/fill' component = {Fill}></Route>
      </Main>
    </div>
    </Router>
  </Provider>
)
export default App;