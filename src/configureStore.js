import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import {loadState, saveState} from './localStorage';
import rootReducer from './reducers';

const configureStore = () => {

	const persistedState = loadState()

	const store = createStore(rootReducer, persistedState);

	store.subscribe(throttle(() => {
		saveState({
			catalog: store.getState().catalog
		});
	}, 1000));

	return ( store )
}

export default configureStore