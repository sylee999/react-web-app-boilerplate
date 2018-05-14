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

    handleAccountServerChange = (event) => {
        const serverAndUrl = {server: event.target.value};
        if ("github" === event.target.value) {
            serverAndUrl.url = "api.github.com";
        }
        this.setState((prevState) => ({account: { ...prevState.account, ...serverAndUrl}}));
    };

    handleAccountUrlChange = (event) => {
        const url = event.target.value;
        this.setState((prevState) => ({account: { ...prevState.account, url: url}}));
    };

    handleAccountTokenChange = (event) => {
        const token = event.target.value;
        this.setState((prevState) => ({account: { ...prevState.account, token: token}}));
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
        const { session } = this.props;
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
                    fullWidth
                >
                    <DialogTitle>Set account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
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
                    </DialogContent>
                    <DialogActions>
                        {
                            session && session.user && session.user.login ? (
                                <Button color="secondary" onClick={this.handleAccountDialogLogout}>Logout</Button>
                            ) : (
                                <Button color="primary" onClick={this.handleAccountDialogSubmit}>Login</Button>
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
