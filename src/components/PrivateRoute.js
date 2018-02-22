import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {login} from "../redux/modules/session";

class PrivateRoute extends React.Component {
    componentWillMount() {
        const { actions, settings } = this.props;
        actions.login(settings.account);
    }

    render() {
        const { component: Component, session, settings, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                settings.account.token && !session.isFail ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: "/settings",
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    session: state.session,
    settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login }, dispatch),
    dispatch
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute))
