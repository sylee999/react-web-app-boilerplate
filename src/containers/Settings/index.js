import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import {
    Avatar,
    Dialog,
    Divider,
    Button,
    TextField,
    Switch,
    DialogTitle,
    DialogContent,
    DialogActions, DialogContentText, MenuItem, FormControlLabel
} from "material-ui";
import {ColorLens, AccountCircle} from '@material-ui/icons';
import {saveAccount, saveDarkMode} from "./actions";
import {login, logout} from "../Session/actions";
import {setAppMenu} from "../App/actions";

class Settings extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountDialogOpen: false,
            account: {
                server: props.settings.account.server || "github",
                url: props.settings.account.url || "api.github.com",
                token: props.settings.account.token
            }
        };
    }

    componentWillMount() {
        this.props.actions.setAppMenu("Settings");
    }

    handleDarkModeToggle = (e, isInputChecked) => {
        this.props.actions.saveDarkMode(isInputChecked);
    };

    handleAccountServerChange = (event, index, value) => {
        const serverAndUrl = {server: value};
        if ("github" === value) {
            serverAndUrl.url = "api.github.com";
        }
        this.setState((prevState) => ({account: { ...prevState.account, ...serverAndUrl}}));
    };

    handleAccountUrlChange = (event, value) => {
        this.setState((prevState) => ({account: { ...prevState.account, url: value}}));
    };

    handleAccountTokenChange = (event, value) => {
        this.setState((prevState) => ({account: { ...prevState.account, token: value}}));
    };

    handleAccountDialogOpen = e => {
        this.setState({accountDialogOpen: true});
    };

    handleAccountDialogClose = e => {
        this.setState({accountDialogOpen: false});
    };

    handleAccountDialogSubmit = e => {
        const { actions } = this.props;
        actions.saveAccount(this.state.account);
        actions.login(this.state.account);

        this.handleAccountDialogClose(e);
    };

    handleAccountDialogLogout = e => {
        const { actions } = this.props;
        actions.saveAccount({});
        actions.logout();
        this.setState({
            account: {
                server: "github",
                url: "api.github.com",
                token: ""
            }
        });

        this.handleAccountDialogClose(e);
    };

    render() {
        const { session, settings } = this.props;
        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Accounts</ListSubheader>}
                >
                    { session && session.user && session.user.login ? (
                        <ListItem button onClick={this.handleAccountDialogOpen}>
                            <ListItemIcon>
                                <Avatar src={session.user.avatar_url}/>
                            </ListItemIcon>
                            <ListItemText primary={session.user.name} />
                        </ListItem>
                        ) : (
                        <ListItem button onClick={this.handleAccountDialogOpen}>
                            <ListItemIcon>
                                <AccountCircle/>
                            </ListItemIcon>
                            <ListItemText primary="Add account" />
                        </ListItem>
                        )
                    }
                </List>
                <Divider/>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Appearances</ListSubheader>}
                >
                    <ListItem>
                        <ListItemIcon>
                            <ColorLens/>
                        </ListItemIcon>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.darkMode}
                                    onChange={this.handleDarkModeToggle}
                                />
                            }
                            label="Dark mode"
                        />
                    </ListItem>
                </List>
                <Dialog
                    open={this.state.accountDialogOpen}
                    onClose={this.handleAccountDialogClose}
                >
                    <DialogTitle>Set account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <form noValidate autoComplete="off">
                            <TextField
                                select
                                label="Github Server"
                                value={this.state.account.server}
                                onChange={this.handleAccountServerChange}
                                fullWidth
                                margin="normal"
                            >
                                <MenuItem value="github">api.github.com</MenuItem>
                                <MenuItem value="enterprise">Github Enterprise</MenuItem>
                            </TextField>
                            <TextField
                                label="Github Enterprise URL"
                                placeholder="http://your.domain/v3/"
                                onChange={this.handleAccountUrlChange}
                                value={this.state.account.url}
                                disabled={this.state.account.server === "github"}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Github Personal Access Token"
                                placeholder="Personal Access Token"
                                onChange={this.handleAccountTokenChange}
                                value={this.state.account.token}
                                fullWidth
                                margin="normal"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {
                            session && session.user && session.user.login ? (
                                <Button color="secondary" onClick={this.handleAccountDialogLogout}>Logout</Button>
                            ) : (
                                <Button color="primary" keyboardFocused onClick={this.handleAccountDialogSubmit}>Login</Button>
                            )
                        }
                        <Button onClick={this.handleAccountDialogClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object,
    session: PropTypes.object,
    actions: PropTypes.shape({
        saveDarkMode: PropTypes.func,
        saveAccount: PropTypes.func,
        login: PropTypes.func,
        logout: PropTypes.func,
        setAppMenu: PropTypes.func
    })
};

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    session: state.session
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveDarkMode, saveAccount, login, logout, setAppMenu}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
