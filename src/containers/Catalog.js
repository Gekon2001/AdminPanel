
import { connect } from 'react-redux';
import { deleteItem } from '../actions/actions';

import Catalog from '../component/Admin/Catalog';

const mapStateToProps = (state) => {
	const catalog = state.catalog;
	let isAdmin = state.isAdmin
	return ({catalog, isAdmin})
};

const mapDispatchToProps = dispatch => ({
  	onClick: (id) => dispatch(deleteItem(id))
});

export default connect( mapStateToProps, mapDispatchToProps )(Catalog)

