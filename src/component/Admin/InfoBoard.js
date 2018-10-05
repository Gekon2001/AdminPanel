import React, { Component } from "react";
import Button from '@material-ui/core/Button';

export default class InfoBoard extends Component {
  	render() {
  		const { quantity, sum, average, onClick, auth} = this.props;
	    return (
		   <div className="info-board">
				<div className="container">
					<div className="wrapper">
						<div className="info-board__item">
							Общее кол-во товаров:<br/> <span>{quantity}</span>
						</div>
						<div className="info-board__item">
							Cумма цен всех товаров:<br/> <span>{sum.toFixed(2)}</span>
						</div>
						<div className="info-board__item">
							Cредняя цена:<br/> <span>{average.toFixed(2)}</span>
						</div>
					</div>
					<Button
						onClick={onClick}
						disabled={!auth}
						variant="contained" 
						color="secondary" 
						className="info-board__button">
        				Удалить все товары
      				</Button>
				</div>			
	  		</div>
	    );
  	}
}