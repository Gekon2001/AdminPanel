const isAdmin = ( state = true, action ) => (
	( action.type === 'LOG IN' ) ? action.auth : state 
);

export default isAdmin