import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, IconButton, Toolbar, Typography} from "material-ui";
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const Header = ({title, onLeftIconButtonTouchTap}) => {
    return (
        <AppBar  position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu" style={styles.menuButton} onClick={onLeftIconButtonTouchTap}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" style={styles.flex}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired
};

export default Header;
