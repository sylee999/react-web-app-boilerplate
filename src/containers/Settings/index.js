import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
    Avatar, Dialog, Divider, FlatButton, List, ListItem, MenuItem, SelectField, Subheader,
    TextField, Toggle
} from "material-ui";
import AccountCircle from "material-ui/svg-icons/action/account-circle";
import {saveAccount, saveDarkMode} from "../../redux/modules/settings";
import {requestLogout} from "../../redux/modules/session";
import {setAppMenu} from "../../redux/modules/app";

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
        const { actions } = this.props;
        actions.setAppMenu("Settings");
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
        actions.requestLogin(this.state.account);

        this.handleAccountDialogClose(e);
    };

    handleAccountDialogLogout = e => {
        const { actions } = this.props;
        actions.saveAccount({});
        actions.requestLogout();
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
                <List>
                    <Subheader>Accounts</Subheader>
                    { session && session.user && session.user.login ? (
                        <ListItem primaryText={session.user.name} leftIcon={<Avatar src={session.user.avatar_url}/>}
                                  onClick={this.handleAccountDialogOpen}/>
                        ) : (
                        <ListItem primaryText="Add account" leftIcon={<AccountCircle/>}
                                  onClick={this.handleAccountDialogOpen}/>
                        )
                    }
                    <Divider/>
                    <Subheader>Appearances</Subheader>
                    <ListItem primaryText="Dark mode" rightToggle={
                        <Toggle onToggle={this.handleDarkModeToggle} toggled={settings.darkMode}/>
                    }/>
                </List>
                <Dialog
                    title="Add account"
                    actions={[
                        <FlatButton label="Cancel" onClick={this.handleAccountDialogClose}></FlatButton>,
                        <FlatButton label="Submit" primary keyboardFocused
                                    onClick={this.handleAccountDialogSubmit}></FlatButton>,
                        <FlatButton label="Logout" secondary onClick={this.handleAccountDialogLogout}></FlatButton>
                    ]}
                    modal={false}
                    open={this.state.accountDialogOpen}
                    onRequestClose={this.handleAccountDialogClose}
                >
                    <SelectField
                        floatingLabelText="Github Server"
                        value={this.state.account.server}
                        onChange={this.handleAccountServerChange}
                        fullWidth
                    >
                        <MenuItem value="github" primaryText="api.github.com"/>
                        <MenuItem value="enterprise" primaryText="Github Enterprise"/>
                    </SelectField>
                    <br/>
                    <TextField
                        floatingLabelText="Github Enterprise URL"
                        hintText="http://your.domain/v3/"
                        onChange={this.handleAccountUrlChange}
                        floatingLabelFixed
                        fullWidth
                        value={this.state.account.url}
                        disabled={this.state.account.server === "github"}
                    />
                    <br/>
                    <TextField
                        hintText="Github Personal Access Token"
                        floatingLabelText="Personal Access Token"
                        onChange={this.handleAccountTokenChange}
                        floatingLabelFixed
                        fullWidth
                        value={this.state.account.token}
                    /><br/>
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
    actions: bindActionCreators({saveDarkMode, saveAccount, requestLogout, setAppMenu}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
