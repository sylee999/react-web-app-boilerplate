import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';
import {LinearProgress, List, ListItem, RaisedButton, Subheader, TextField} from "material-ui";

class Setting extends React.PureComponent {
    componentWillMount() {
        const { actions } = this.props;
        actions.changeAppMenu("Setting")
    }

    handleLoginOut = e => {
        const { actions, setting } = this.props;
        if (setting.session) {
            actions.requestLogout()
        } else {
            actions.requestLogin(setting.token)
        }
    };

    render() {
        const { actions, setting } = this.props;
        return (
            <div className="body">
                {setting.isFetching &&
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
                            label={setting.session ? "Logout" : "Login"}
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
    setting: state.setting
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting));
