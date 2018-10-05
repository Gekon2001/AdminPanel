import { connect } from 'react-redux';

import AddForm from '../component/Admin/AddForm';

const mapStateToProps = (state) => {
	let isAdmin = state.isAdmin
	return ({ isAdmin })
};


export default connect( mapStateToProps )(AddForm)