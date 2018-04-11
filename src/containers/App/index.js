import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as _ from "lodash";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { LinearProgress, Paper } from "material-ui";
import {indigo500, indigo300} from "material-ui/styles/colors";

import Events from "../Events"
import Settings from "../Settings"
import Notification from "../Notification"
import PrivateRoute from "../Session/PrivateRoute";
import {loadSettings} from "../Settings/actions";
import {openAppDrawer} from "./actions";
import SideMenu from "./SideMenu";
import Header from "./Header";

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
    }

    componentWillReceiveProps(nextProps) {
        this.getTheme(nextProps.settings.darkMode);
    }

    render() {
        const { store, app, session, actions, pendingTasks } = this.props;
        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <Paper style={{height: "100vh"}}>
                    <Header
                        title={app.menu || "Home"}
                        onLeftIconButtonTouchTap={
                            () => actions.openAppDrawer(!app.drawer)
                        }
                    />
                    <SideMenu isOpen={app.drawer} session={session} theme={this.muiTheme} openAppDrawer={actions.openAppDrawer}/>
                    <Provider store={store}>
                        <div>
                            <Notification />
                            {pendingTasks > 0 &&
                            <LinearProgress mode="indeterminate"/>
                            }
                            <PrivateRoute exact path="/" session={session} component={Events}/>
                            <PrivateRoute path="/event" session={session} component={Events}/>
                            <Route path="/settings" component={Settings}/>
                        </div>
                    </Provider>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    app: PropTypes.object,
    settings: PropTypes.object,
    session: PropTypes.object,
    pendingTasks: PropTypes.number,
    actions: PropTypes.shape({
        loadSettings: PropTypes.func,
        openAppDrawer: PropTypes.func
    })
};

const mapStateToProps = (state, ownProps) => ({
    app: state.app,
    settings: state.settings,
    session: state.session,
    pendingTasks: state.pendingTasks
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({loadSettings, openAppDrawer }, dispatch),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
