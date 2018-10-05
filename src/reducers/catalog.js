const catalog = ( state=[], action ) => {
	switch( action.type ) { 
		case 'ADD ITEM': return ([...state, action.payload]);
		case 'ADD ITEMS': return ([...state, ...action.payload]);
		case 'DELETE ITEM': return (
			state.filter( item => (item.id !== action.id))
		);
		case 'DELETE ALL ITEMS': return []; 
		default: return state;
	}
};

export default catalog