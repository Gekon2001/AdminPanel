import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { ReactComponent as Logo } from "../../img/Logo.svg"
import { logIn } from '../../actions/actions'

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
    this.props.dispatch(logIn(event.target.checked));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let visible = auth ? 'visible': 'hidden';

    return (
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            style={{background: '#BBDEFB', width: '110vw'}}
            control={
              <Switch checked={auth} 
                      onChange={this.handleChange} 
                      aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <div>
              <IconButton 
                className={classes.menuButton} 
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit" >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              > 
                <NavLink 
                  to='/catalog'
                  style={{
                    textDecoration: 'none'
                  }}
                  activeStyle={{
                    textDecoration: 'none'

                  }}>
                  <MenuItem selected={false} onClick={this.handleClose}>Каталог</MenuItem>
                </NavLink>
                <NavLink 
                  to='/'
                  style={{
                    textDecoration: 'none',
                  }}
                   activeStyle={{
                    textDecoration: 'none',
                  }}>
                  <MenuItem selected={false} onClick={this.handleClose}>Добавить товар</MenuItem>  
                </NavLink>
              </Menu>
            </div>


            <Typography variant="title" color="inherit" className={classes.grow}>
              <div style={{width: '50px', margin: '10px auto'}}>
                <Logo style={{width: '50px', height: '50px' }}/>
              </div>
            </Typography>
            
              <div style={{visibility: visible}}>
                <AccountCircle />
              </div>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Header));