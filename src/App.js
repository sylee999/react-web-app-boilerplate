import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";

import * as actions from './actions';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Avatar, Dialog, FlatButton, List, ListItem, Snackbar} from "material-ui";

import Events from "./Events"
import Setting from "./Setting"
import { Provider } from 'react-redux'
import {indigo500, indigo700} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        pickerHeaderColor: indigo500,
    }
});

class App extends React.Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.requestLogin();
    }

    render() {
        const { store, app, session, actions } = this.props;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
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
                            backgroundColor: muiTheme.palette.primary1Color,
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
                                    <div style={{color: muiTheme.palette.alternateTextColor}}>{session.user.name}</div>
                                }
                                secondaryText={
                                    <span style={{color: muiTheme.palette.accent2Color}}>{session.user.login}</span>
                                }
                                disabled
                            />
                        </List>
                        <List>
                            <MenuItem onClick={() => actions.openAppDrawer(false)}
                                      containerElement={<Link to='/event'/>} primaryText="Events"/>
                            <MenuItem onClick={() => actions.openAppDrawer(false)}
                                      containerElement={<Link to='/setting'/>} primaryText="Setting"/>
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
                            <Route exact path="/" render={props => (<Events {...props}/>)}/>
                            <Route path="/event" render={props => (<Events {...props}/>)}/>
                            <Route path="/setting" component={Setting}/>
                        </div>
                    </Provider>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    app: state.app,
    setting: state.setting,
    session: state.session,
    events: state.events
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
