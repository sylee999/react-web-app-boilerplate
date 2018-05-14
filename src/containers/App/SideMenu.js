import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    withStyles,
} from "@material-ui/core";
import { InfoOutline, Settings } from '@material-ui/icons';

const styles = theme => ({
    account: {
        backgroundColor: theme.palette.primary.main,
        textColor: theme.palette.primary.light,
        width: 200,
    },
    accountName: {

    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
});

const SideMenu = ({isOpen, session, classes, openAppDrawer}) => {
    return (
        <Drawer
            docked={false}
            open={isOpen}
            onClose={() => openAppDrawer(false)}
        >
            <List className={classes.account}>
                <ListItem
                    style={{ height: 80 }}
                    disabled
                >
                    <Avatar src={session.user.avatar_url} className={classes.avatar}/>
                </ListItem>
                <ListItem button disabled onClick={this.handleAccountDialogOpen}>
                    <ListItemText primary={
                        <Typography variant="headline">{session.user.name}</Typography>
                    }
                    secondary={
                        <Typography variant="subheading">{session.user.login}</Typography>
                    }
                    disabled
                  />
                </ListItem>
            </List>
            <List>
                <ListItem component={Link} to="/event" button onClick={() => openAppDrawer(false)}>
                    <ListItemIcon>
                        <InfoOutline/>
                    </ListItemIcon>
                    <ListItemText primary="Events"/>
                </ListItem>
                <ListItem component={Link} to="/settings" button onClick={() => openAppDrawer(false)}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
            </List>
        </Drawer>
    );
};

SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
    openAppDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(SideMenu);
