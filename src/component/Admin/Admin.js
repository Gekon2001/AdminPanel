import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Catalog from '../../containers/Catalog';
import AddForm from '../../containers/AddForm';
import InfoPanel from '../../containers/InfoPanel'
import '../../sass/Admin.sass';



const Admin = () => (
    	<React.Fragment>
	    	<CssBaseline />
	    	<div className="app-admin">
				<InfoPanel />
				<Switch>
					<Route path="/" exact component={AddForm}/>
					<Route path="/catalog" component={Catalog} />
				</Switch>
	      		<Header />
	      	</div>
      	</React.Fragment>
    );

export default Admin