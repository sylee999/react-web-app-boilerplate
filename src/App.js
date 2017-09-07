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
import {Avatar, List, ListItem} from "material-ui";

import Event from "./Event"
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
const App = ({ store, app, actions }) => (
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
                    padding: 0,
                    backgroundColor: muiTheme.palette.primary1Color,
                }}>
                    <ListItem
                        leftAvatar={<Avatar src="images/guest.png"/>}
                        disabled
                    />
                    <ListItem
                        primaryText={
                            <div style={{color: muiTheme.palette.alternateTextColor}}>Primary Text</div>
                        }
                        secondaryText={
                            <span style={{color: muiTheme.palette.accent2Color}}>secondary text</span>
                        }
                        disabled
                    />
                </List>
                <List>
                    <MenuItem onClick={() => actions.openAppDrawer(false)} containerElement={<Link to='/event'/>} primaryText="Event"/>
                    <MenuItem onClick={() => actions.openAppDrawer(false)} containerElement={<Link to='/setting'/>} primaryText="Setting"/>
                </List>
            </Drawer>
            <Provider store={store}>
                <div>
                    <Route exact path="/" component={Event}/>
                    <Route path="/event" component={Event}/>
                    <Route path="/setting" component={Setting}/>
                </div>
            </Provider>
        </div>
    </MuiThemeProvider>
);

const mapStateToProps = (state, ownProps) => ({
    app: state.app
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
