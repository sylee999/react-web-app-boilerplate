import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
    Dialog, Button, TextField, DialogTitle, DialogContent,
    DialogActions, DialogContentText, MenuItem, ListItem, ListItemIcon, Avatar, ListItemText
} from "material-ui";
import {AccountCircle} from '@material-ui/icons';
import {login, logout} from "../Session/actions";
import {saveAccount} from "./actions";

class AccountSetting extends React.Component {
    constructor(props) {
        super();
        this.state = {
            accountDialogOpen: false,
            account: {
                server: props.settings.account.server || "github",
                url: props.settings.account.url || "api.github.com",
                token: props.settings.account.token
            }
        };
    }

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
                )}
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
                                value={settings.account.server}
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
                                value={settings.account.url}
                                disabled={settings.account.server === "github"}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Github Personal Access Token"
                                placeholder="Personal Access Token"
                                onChange={this.handleAccountTokenChange}
                                value={settings.account.token}
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

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    session: state.session
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login, logout, saveAccount}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountSetting));
