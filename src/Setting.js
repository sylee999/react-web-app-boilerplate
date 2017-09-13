import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';
import {LinearProgress, List, ListItem, RaisedButton, Subheader, TextField} from "material-ui";

class Setting extends React.PureComponent {
    componentWillMount() {
        const { actions } = this.props;
        actions.setAppMenu("Setting");
        actions.updateToken(localStorage.token);
    }

    handleLoginOut = e => {
        const { actions, session, setting } = this.props;
        if (session.user.login) {
            actions.requestLogout()
        } else {
            actions.requestLogin(setting.token)
        }
    };

    render() {
        const { actions, setting, session } = this.props;
        return (
            <div>
                {session.isFetching &&
                    <LinearProgress mode="indeterminate"/>
                }
                <List>
                    <Subheader>Login</Subheader>
                    <ListItem disabled>
                        <TextField
                            hintText="github personal access token"
                            floatingLabelText="Personal access token"
                            value={setting.token}
                            onChange={(e, token) => {
                                actions.updateToken(token);
                            }}
                        />
                        <span style={{margin:"10px"}}></span>
                        <RaisedButton
                            label={session.user.login ? "Logout" : "Login"}
                            primary
                            onMouseDown={this.handleLoginOut}
                        />
                    </ListItem>
                </List>
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
