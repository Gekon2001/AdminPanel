
import { connect } from 'react-redux';
import { deleteAllItems } from '../actions/actions';

import InfoBoard from '../component/Admin/InfoBoard';

const mapStateToProps = (state) => {
	let quantity = state.catalog.length;
	let sum = (state.catalog.length && [].reduce.call(state.catalog, 
		(sum, current)=> { 
			return sum + +current.price }, 0)) || 0;
	return {
	quantity: quantity, 
	sum: sum, 
	average: quantity && (Math.round(sum / quantity * 100) / 100),
	auth: state.isAdmin	
}};

const mapDispatchToProps = dispatch => ({
  	onClick: () => dispatch( deleteAllItems() )
});

export default connect( mapStateToProps, mapDispatchToProps )(InfoBoard)