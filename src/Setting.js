import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';
import {
    Card, CardActions, CardHeader, CardText,
    Dialog, Divider, FlatButton, List, ListItem, MenuItem, Paper, RaisedButton, SelectField, Subheader,
    TextField, Toggle
} from "material-ui";
import AccountCircle from "material-ui/svg-icons/action/account-circle";

class Setting extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountDialogOpen: false
        };
    }

    componentWillMount() {
        const { actions } = this.props;
        actions.setAppMenu("Setting");
        actions.updateToken(localStorage.token);
        actions.updateDarkMode(localStorage.darkMode)
    }

    handleLoginOut = e => {
        const { actions, session, setting } = this.props;
        if (session.user.login) {
            actions.requestLogout();
        } else {
            actions.requestLogin(setting.token);
        }
    };

    handleDarkModeToggle = (e, isInputChecked) => {
        const { actions } = this.props;
        actions.updateDarkMode(isInputChecked);
    };

    handleAccountDialogOpen = e => {
        this.setState({accountDialogOpen: true});
    };

    handleAccountDialogClose = e => {
        this.setState({accountDialogOpen: false});
    };

    handleAccountDialogSubmit = e => {
        const { actions, setting } = this.props;
        actions.requestLogin(setting.token);

        this.handleAccountDialogClose(e);
    };

    render() {
        const { actions, setting, session } = this.props;
        return (
            <div>
                <List>
                    <Subheader>Accounts</Subheader>
                    <ListItem primaryText="Add account" leftIcon={<AccountCircle/>}
                              onClick={this.handleAccountDialogOpen}/>
                    <ListItem disabled>
                        <TextField
                            hintText="github personal access token"
                            floatingLabelText="Personal access token"
                            value={setting.token}
                            onChange={(e, token) => {
                                actions.updateToken(token);
                            }}
                        />
                        <span style={{margin: "10px"}}></span>
                        <RaisedButton
                            label={session.user.login ? "Logout" : "Login"}
                            primary
                            onMouseDown={this.handleLoginOut}
                        />
                    </ListItem>
                    <Divider/>
                    <Subheader>Appearances</Subheader>
                    <ListItem primaryText="Dark mode" rightToggle={
                        <Toggle onToggle={this.handleDarkModeToggle} toggled={setting.darkMode}/>
                    }/>
                </List>
                <Dialog
                    title="Add account"
                    actions={[
                        <FlatButton label="Cancel" onClick={this.handleAccountDialogClose}></FlatButton>,
                        <FlatButton label="Submit" primary keyboardFocused
                                    onClick={this.handleAccountDialogSubmit}></FlatButton>,
                        <FlatButton label="Logout" secondary onClick={this.handleLoginOut}></FlatButton>
                    ]}
                    modal={false}
                    open={this.state.accountDialogOpen}
                    onRequestClose={this.handleAccountDialogClose}
                >
                    <SelectField
                        floatingLabelText="Github Server"
                        value="github"
                        fullWidth
                        onChange={this.handleChange}
                    >
                        <MenuItem value="github" primaryText="github.com"/>
                        <MenuItem value="enterprise" primaryText="Github Enterprise"/>
                    </SelectField>
                    <br/>
                    <TextField
                        floatingLabelText="Github Enterprise URL"
                        hintText="http://domain/v3/"
                        floatingLabelFixed
                        fullWidth
                        value={this.state.githubServer}
                    />
                    <br/>
                    <TextField
                        hintText="Github Personal Access Token"
                        floatingLabelText="Personal Access Token"
                        floatingLabelFixed
                        fullWidth
                        value={this.state.githubServer}
                    /><br/>
                </Dialog>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    setting: state.setting,
    session: state.session
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting));
