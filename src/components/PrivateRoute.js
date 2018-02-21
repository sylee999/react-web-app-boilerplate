import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {login} from "../redux/modules/session";

class PrivateRoute extends React.Component {
    componentWillMount() {
        const { actions, settings, dispatch } = this.props;
        actions.login(settings.account);
        // if (this.props && this.props.actions && this.props.actions.login && this.props.settings.account) {
        //     this.props.actions.login(this.props.settings.account);
        // }
    }

    render() {
        const { component: Component, session, settings, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                settings.account.token && !session.isFail ? (
                // session && ((session.user && session.user.login) || settings.token) ? (
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
