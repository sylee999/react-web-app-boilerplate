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
    isOpen: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    openAppDrawer: PropTypes.func.isRequired
};

export default Header;
