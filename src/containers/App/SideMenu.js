import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Drawer, List, ListItem, MenuItem} from "material-ui";
import {Link} from "react-router-dom";

const SideMenu = ({isOpen, session, theme, openAppDrawer}) => {
    return (
        <Drawer
            docked={false}
            open={isOpen}
            onRequestChange={(open) => openAppDrawer(open)}
        >
            <List style={{
                backgroundColor: theme.palette.primary1Color,
            }}>
                <ListItem
                    style={{
                        height: 40
                    }}
                    leftAvatar={<Avatar size={60} src={session.user.avatar_url}/>}
                    disabled
                />
                <ListItem
                    primaryText={
                        <div style={{
                            // color: theme.palette.alternateTextColor
                        }}>{session.user.name}</div>
                    }
                    secondaryText={
                        <span style={{
                            // color: theme.palette.accent2Color
                        }}>{session.user.login}</span>
                    }
                    disabled
                />
            </List>
            <List>
                <MenuItem onClick={() => openAppDrawer(false)}
                          containerElement={<Link to='/event'/>} primaryText="Events"/>
                <MenuItem onClick={() => openAppDrawer(false)}
                          containerElement={<Link to='/settings'/>} primaryText="Settings"/>
            </List>
        </Drawer>
    );
};

SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    openAppDrawer: PropTypes.func.isRequired
};

export default SideMenu;
