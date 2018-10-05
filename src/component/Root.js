import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import Admin from './Admin/Admin';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      	<Admin />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root