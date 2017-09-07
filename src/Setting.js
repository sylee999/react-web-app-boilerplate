import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';
import {List, ListItem, RaisedButton, Snackbar, Subheader, TextField} from "material-ui";

class Setting extends React.PureComponent {
    componentWillMount() {
        const { actions } = this.props;
        actions.changeAppMenu("Setting")
    }

    render() {
        const { actions, setting } = this.props;
        return (
            <div className="body">
                <List>
                    <Subheader>Login</Subheader>
                    <ListItem disabled>
                        <TextField
                            hintText="github personal access token"
                            floatingLabelText="Personal access token"
                            value={setting.token}
                            onChange={actions.updateToken}
                        />
                        <RaisedButton
                            label="Login"
                            primary
                            onMouseDown={e => {
                                actions.requestLogin(setting.token)
                            }}
                            style={{marginLeft:"20px"}}
                        />
                    </ListItem>
                </List>
                {/*<Snackbar*/}
                    {/*open={setting.request.done}*/}
                    {/*message={setting.request.message || ""}*/}
                {/*/>*/}
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
