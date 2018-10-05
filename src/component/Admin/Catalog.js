import React from 'react';

import CatalogItem from './CatalogItem';

const Catalog = ({catalog, onClick, isAdmin}) => {
    const items = catalog.map( 
                item => ( 
                    <CatalogItem 
                        isAdmin={isAdmin}
                        onClick={()=>(onClick(item.id))}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        img={item.img}
                        id={item.id}
                        key={item.id}
                    /> 
                )
            )
    const noItems = <div style={{marginTop: '150px'  }}>Каталог пуст, добавте продукты для их отображения</div>;
    const jsx = catalog.length ? items : noItems;
   	    return (
            <div className='catalog'>
              	<div className='container'>
              		{jsx}
              	</div>
              </div>
        )
}

export default Catalog