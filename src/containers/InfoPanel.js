
import { connect } from 'react-redux';
import { deleteAllItems } from '../actions/actions';

import InfoBoard from '../component/Admin/InfoBoard';

const mapStateToProps = (state) => {
	let quantity = state.catalog.length; 
	let sum = (quantity && state.catalog.reduce((sum, current) => sum + +current.price, 0)) || 0;
	
	return {
		quantity, 
		sum, 
		average: quantity && (Math.round(sum / quantity * 100) / 100),
		auth: state.isAdmin	
	}
};

const mapDispatchToProps = dispatch => ({
  	onClick: () => dispatch( deleteAllItems())
});

export default connect( mapStateToProps, mapDispatchToProps )(InfoBoard)