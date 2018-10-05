import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { connect } from 'react-redux'
import { addItem } from '../actions/actions'
import { addItems } from '../actions/actions'

const styles = theme => ({
  	textField: {
    	width: '100%',
  	},
  	button: {
    	marginTop: '25px',
    	width: '45%',
    	margin: '0 2.4%'
  	},
  	rightIcon: {
    	marginLeft: '50px',
  	},
  	iconSmall: {
    	fontSize: 20,
  	},
});

function FileAsText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			let importedItems = JSON.parse(e.target.result);
			resolve(importedItems);
		};
		reader.onerror = (e) => {
			reject(new Error("Ошибка при загрузке"))
		}
		reader.readAsText(file);
	});
}

function fileAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			let img = new Image();
			img.src = e.target.result;
			img.onload = () => {
	        	if ((img.naturalWidth >= 150) && (img.naturalHeight >= 150)) {
					resolve({isLoadOk: true, 
							 img: e.target.result
					})
				} else {
    				resolve({
    					isLoadOk: false, 
						imgErr: "Фотография должна быть не менее 150x150px"
    				})
  				}
			};
		}
		reader.onerror = (e) => {
			reject(new Error("Ошибка при загрузке"))
		}
		reader.readAsDataURL(file);
	})	
}

class Form extends React.Component {
  	state = {
	    name: '',
	    price: '',
	    description: '',
	    img: '',
	    imgErr: ''
  	};

  	handleChange = name => event => {
    	this.setState({
      		[name]: event.target.value,
   		});
  	};

  	inputFileClick = (id) => {
  		document.getElementById(id).click();
  	};

  	handleFiles = (e) => {
	  	let file = e.target.files[0];
	  	if (!file) { return };
	  	if (file.type.split("/")[0] !== "image") {
	    	this.setState({imgErr: "Вы выбрали не изображение"})
  		} else if (file.size > 2*1028*1028) {
    		this.setState({imgErr: "Файл слишком большой"})
  			} else {
  				fileAsDataURL(file).then(
					result => { 
						const state = result.isLoadOk ?  { 
								img: result.img, 
								imgErr: ""
			    			} : {
			    				img:"",
			    				imgErr: result.imgError
			    			};
			    		this.setState(state);
			    	},
			    	error =>  { console.error(error.message)}
			    )
   			}
  	}

	handleFilesJson = (e) => {
	  	let file = e.target.files[0];
	  	if (!file) { return };
	  	if (file.type.split("/")[1] !== "json") {console.error('Вы выбрали не верный файл'); return
  		} else {
			FileAsText(file).then(
				result => { this.props.dispatch(addItems(result))}, 
				error => { console.error(error.message)}
			)
		}
  	}
	handleSubmit = (e) => {
		e.preventDefault()
  		this.props.dispatch( addItem({
  			name: this.state.name,
  			price: this.state.price,
	    	description: this.state.description,
	    	img: this.state.img
	    }));
  		this.setState({
  			name: '',
  			price: '',
	    	description: '',
	    	img: '',
	    	imgErr: ''
	    })
    }

  	render() {
    	const { classes } = this.props;
	    return (
	      	<form className={classes.container} onSubmit={this.handleSubmit}>
	        	<TextField
		          	id="addFormInputName"
		          	required
		          	value={this.state.name}
		          	label="Введите наименование товара"
		          	placeholder="Обязательно для заполнения"
		          	className={classes.textField}
		          	onChange={this.handleChange('name')}
		          	margin="normal"
	        	/>
	        	<TextField
	        		required
	          		id="addFormInputPrice"
	          		type="number"
	          		value={this.state.price}
	          		label="Введите цену"
	          		placeholder="Обязательно для заполнения"
	          		className={classes.textField}
	          		onChange={this.handleChange('price')}
	          		margin="normal"
	        	/>
	        	<TextField
	          		id="addFormInputDescription"
	          		value={this.state.description}
	          		label="Введите описание товара"
	          		placeholder="Необязательное поле"
	          		className={classes.textField}
	          		onChange={this.handleChange('description')}
	          		margin="normal"
	        	/>
	        	<div className="img-loader clearfix">
	          		<div 
	            		className={"img-loader__label " + (this.state.imgErr && "not-valid")}
	            		onClick={this.inputFileClick.bind(null, "fileElem")}>
	            		<p>Добавить изображение</p>
	            		<p>Минимальный размер 150x150 jpeg jpg png 2 MB</p>
	          		</div>
	          		<input 
			            type="file" 
			            id="fileElem" 
			            accept="image/*"
			            onChange={this.handleFiles}/>
	            	{this.state.imgErr && <p style={{marginTop:"25px", width: '70%', float: "left", paddingLeft: "10px"}} className="form__error">{this.state.imgErr}</p>}

	          		{this.state.img && !this.state.imgErr && <img 
			            className="img-loader__img"
			            src={this.state.img}
			            alt="Thumbnails"/>}       
	       		</div>
	       		<Button 
	       			type="submit" 
	       			variant="contained" 
	       			color="primary" 
	       			className={classes.button}>
        			Добавить продукт <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
      			</Button>
      			<Button
      				onClick={this.inputFileClick.bind(null, "fileElemJson")}
      				variant="contained" 
      				color="primary" 
      				className={classes.button}>
        			Загрузить продукты <CloudDownloadIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
      			</Button>
      			<input 
      					style={{display: 'none'}}
			            type="file" 
			            id="fileElemJson" 
			            onChange={this.handleFilesJson}/>
	      		</form>
    	);
  	}
}

Form.propTypes = {
  	classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Form));

