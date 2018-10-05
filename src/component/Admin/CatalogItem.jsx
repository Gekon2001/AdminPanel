import React  from 'react';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

 const CatalogItem = ({onClick, name, price, description, img, isAdmin}) => {
    return (<div className='catalog-item'>
    	<img src={img} alt={name} className='catalog-item__img'></img>
    	<div className="catalog-item__name">{name}</div>
    	<div className="catalog-item__price">{price}</div>
    	<div className="catalog-item__description">{description}</div>
    	<Button 
    		onClick={onClick}
            disabled={!isAdmin} 
    		mini
    		className='catalog-item__del'
    		variant="fab"
    		color='secondary'
    		>
      		<ClearIcon/>
    	</Button>
  	</div>
)};

export default CatalogItem