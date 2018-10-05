import { combineReducers } from 'redux';

import catalog from './catalog';
import isAdmin from './isAdmin';

export default combineReducers({
	catalog, isAdmin
});