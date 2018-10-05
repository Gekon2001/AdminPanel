import uuidv4 from 'uuid/v4';


export const addItem = item => ({
		type: 'ADD ITEM',
		payload: { ...item, id: uuidv4()}
	});

export const addItems = items => ({
		type: 'ADD ITEMS',
		payload: items.map( item => (
			{...item, id: uuidv4()}
		))
	});

export const deleteItem = id => ({
	type: 'DELETE ITEM',
	id
	});

export const deleteAllItems = () => ({
		type: 'DELETE ALL ITEMS'
	});

export const logIn = (isLogin) => ({
		type: 'LOG IN',
		auth: isLogin
	})



