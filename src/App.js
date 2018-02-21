import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {
    Avatar, Dialog, FlatButton, LinearProgress, List, ListItem, Paper, Snackbar
} from "material-ui";

import Events from "./containers/Events"
import Settings from "./containers/Settings"
import { Provider } from 'react-redux'
import {indigo500, indigo300} from "material-ui/styles/colors";
import * as _ from "lodash";
import PrivateRoute from "./components/PrivateRoute";
import {loadSettings} from "./redux/modules/settings";
import {login} from "./redux/modules/session";
import {notifyMessage, openAppDrawer} from "./redux/modules/app";


class App extends React.Component {
    getTheme(darkMode) {
        const theme = darkMode ? darkBaseTheme : lightBaseTheme;
        this.muiTheme = getMuiTheme(_.merge(theme,
            {
                palette: {
                    primary1Color: indigo300,
                    primary2Color: indigo500,
                    pickerHeaderColor: indigo300,
                }
            }));
    }

    componentWillMount() {
        const { settings, actions } = this.props;
        actions.loadSettings();
        this.getTheme(settings.darkMode);
        // actions.login(settings.account);
    }

    // componentDidMount() {
    //     this.props.actions.login(this.props.settings.account);
    // }

    componentWillReceiveProps(nextProps) {
        this.getTheme(nextProps.settings.darkMode);
    }

    render() {
        const { store, app, session, actions } = this.props;
        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <Paper style={{height: "100vh"}}>
                    <AppBar
                        title={app.menu || "Home"}
                        onLeftIconButtonTouchTap={
                            () => actions.openAppDrawer(!app.drawer)
                        }
                    />
                    <Drawer
                        docked={false}
                        open={app.drawer}
                        onRequestChange={(open) => actions.openAppDrawer(open)}
                    >
                        <List style={{
                            backgroundColor: this.muiTheme.palette.primary1Color,
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
                                    <div style={{color: this.muiTheme.palette.alternateTextColor}}>{session.user.name}</div>
                                }
                                secondaryText={
                                    <span style={{color: this.muiTheme.palette.accent2Color}}>{session.user.login}</span>
                                }
                                disabled
                            />
                        </List>
                        <List>
                            <MenuItem onClick={() => actions.openAppDrawer(false)}
                                      containerElement={<Link to='/event'/>} primaryText="Events"/>
                            <MenuItem onClick={() => actions.openAppDrawer(false)}
                                      containerElement={<Link to='/settings'/>} primaryText="Settings"/>
                        </List>
                    </Drawer>
                    <Dialog
                        title="Error!!"
                        actions={<FlatButton label="Close" primary={true} onClick={() => {actions.notifyMessage({status: "DONE", message:""})}}/>}
                        modal={false}
                        open={(app.notification.status === "ERROR")}
                        onRequestClose={() => {actions.notifyMessage({status: "DONE", message:""})}}
                    >
                        {app.notification.message}
                    </Dialog>
                    <Snackbar
                        open={app.notification.status === "SUCCESS"}
                        autoHideDuration={2000}
                        message={app.notification.message}
                        onRequestClose={() => {actions.notifyMessage({status: "DONE", message:""})}}
                    />
                    <Provider store={store}>
                        <div>
                            {app.notification.START &&
                                <LinearProgress mode="indeterminate"/>
                            }
                            {/*<PrivateRoute exact path="/" session={session} component={Events}/>*/}
                            {/*<PrivateRoute path="/event" session={session} component={Events}/>*/}
                            <Route exact path="/" session={session} component={Events}/>
                            <Route path="/event" session={session} component={Events}/>
                            <Route path="/settings" component={Settings}/>
                        </div>
                    </Provider>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    app: state.app,
    settings: state.settings,
    session: state.session,
    events: state.events,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({loadSettings, login, openAppDrawer, notifyMessage }, dispatch),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
