import React, { Component } from "react"
import Form from '../../containers/Form'
import Forbidden from './Forbidden'

export default class AddForm extends Component {
  	render() {
	    return (
	  		<div className="add-form">
				<div className="container">
					{this.props.isAdmin ? <Form /> : <Forbidden />}
				</div>			
	  		</div>
	    );
  	}
}
