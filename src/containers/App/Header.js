import React from 'react';
import PropTypes from 'prop-types';
import {AppBar} from "material-ui";

const Header = ({title, onLeftIconButtonTouchTap}) => {
    return (
        <AppBar
            title={title}
            onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
        />
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired
};

export default Header;
